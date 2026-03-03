import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import admin from 'firebase-admin';

export const dynamic = 'force-dynamic';

function initFirebase() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    }
    return admin.firestore();
}

// Helper: find userId from Firestore by stripeCustomerId
async function getUserIdByCustomer(db: FirebaseFirestore.Firestore, customerId: string): Promise<string | null> {
    const snapshot = await db.collection('users').where('stripeCustomerId', '==', customerId).limit(1).get();
    return snapshot.empty ? null : snapshot.docs[0].id;
}

export async function POST(req: Request) {
    const stripe = new Stripe((process.env.STRIPE_LIVE_SECRET_KEY || process.env.STRIPE_SECRET_KEY)!, {
        apiVersion: '2026-02-25.clover',
    });

    const webhookSecret = (process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_LIVE_WEBHOOK_SECRET)!;
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`[Webhook] Signature verification failed: ${err.message}`);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    try {
        const db = initFirebase();

        // ─── checkout.session.completed ───────────────────────────────────────
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.client_reference_id || session.metadata?.userId;

            if (!userId) {
                console.warn('[Webhook] checkout.session.completed — no userId found');
            } else {

                // Fetch payment method details for card storage
                let paymentMethodData: Record<string, any> = {};
                try {
                    if (session.payment_intent) {
                        const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);
                        if (pi.payment_method) {
                            const pm = await stripe.paymentMethods.retrieve(pi.payment_method as string);
                            if (pm.card) {
                                paymentMethodData = {
                                    paymentMethod: {
                                        id: pm.id,
                                        brand: pm.card.brand,
                                        last4: pm.card.last4,
                                        expMonth: pm.card.exp_month,
                                        expYear: pm.card.exp_year,
                                        funding: pm.card.funding,
                                    }
                                };
                            }
                        }
                    }
                } catch (pmErr: any) {
                    console.warn(`[Webhook] Could not fetch payment method: ${pmErr.message}`);
                }

                // ── SUBSCRIPTION: plan upgrade ──────────────────────────────
                if (session.mode === 'subscription') {
                    let plan = session.metadata?.plan || 'builder';
                    if (!session.metadata?.plan) {
                        const priceId = session.line_items?.data[0]?.price?.id;
                        if (priceId === process.env.STRIPE_LIVE_PRICE_STARTUP) plan = 'startup';
                        else if (priceId === process.env.STRIPE_LIVE_PRICE_BUILDER) plan = 'builder';
                    }

                    console.log(`[Webhook] subscription checkout → user=${userId} plan=${plan}`);

                    await db.collection('users').doc(userId).set({
                        plan,
                        stripeCustomerId: session.customer as string,
                        stripeSubscriptionId: session.subscription as string,
                        onboardingCompleted: true,
                        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                        ...paymentMethodData,
                    }, { merge: true });

                    await db.collection('billing_transactions').add({
                        userId,
                        stripeCustomerId: session.customer as string,
                        stripeSubscriptionId: session.subscription as string,
                        stripeInvoiceId: session.invoice || null,
                        stripeSessionId: session.id,
                        plan,
                        type: 'subscription',
                        description: `Subscription Plan: ${plan}`,
                        amount: session.amount_total,
                        currency: session.currency,
                        status: 'succeeded',
                        ...paymentMethodData,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    });

                    console.log(`[Webhook] users + billing_transactions updated for subscription user=${userId}`);
                }

                // ── PAYMENT: one-time usage pack ────────────────────────────
                if (session.mode === 'payment') {
                    const addOnMessages = parseInt(session.metadata?.addOnMessages || '0', 10);
                    const pack = session.metadata?.pack || 'usage_pack';

                    console.log(`[Webhook] usage pack checkout → user=${userId} pack=${pack} messages=${addOnMessages}`);

                    if (addOnMessages > 0) {
                        // Increment credits — never overwrite existing balance
                        await db.collection('users').doc(userId).update({
                            'usage.addOnMessages': admin.firestore.FieldValue.increment(addOnMessages),
                            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                            ...paymentMethodData,
                        });
                    }

                    await db.collection('billing_transactions').add({
                        userId,
                        stripeCustomerId: session.customer as string,
                        stripeSessionId: session.id,
                        pack,
                        addOnMessages,
                        type: 'usage_pack',
                        description: `Usage Pack: ${pack}`,
                        amount: session.amount_total,
                        currency: session.currency,
                        status: 'succeeded',
                        ...paymentMethodData,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    });

                    console.log(`[Webhook] usage.addOnMessages incremented +${addOnMessages} for user=${userId}`);
                }
            }
        }

        // ─── invoice.payment_succeeded (recurring charges) ────────────────────
        // Fires every billing cycle — creates a new transaction record
        if (event.type === 'invoice.payment_succeeded') {
            const invoice = event.data.object as Stripe.Invoice;

            // Skip the first invoice — it's already handled by checkout.session.completed
            if (invoice.billing_reason === 'subscription_create') {
                console.log('[Webhook] invoice.payment_succeeded (initial) — skipping, handled by checkout event');
            } else {
                const customerId = invoice.customer as string;
                const userId = (invoice as any).subscription_details?.metadata?.userId
                    || await getUserIdByCustomer(db, customerId);

                if (userId) {
                    console.log(`[Webhook] invoice.payment_succeeded (renewal) → user=${userId}`);

                    // Fetch card info from charge
                    let cardData: Record<string, any> = {};
                    try {
                        if ((invoice as any).charge) {
                            const charge = await stripe.charges.retrieve((invoice as any).charge as string);
                            const pm = charge.payment_method_details;
                            if (pm?.card) {
                                cardData = {
                                    paymentMethod: {
                                        brand: pm.card.brand,
                                        last4: pm.card.last4,
                                        expMonth: pm.card.exp_month,
                                        expYear: pm.card.exp_year,
                                        funding: pm.card.funding,
                                    }
                                };
                                // Keep card info up-to-date on user doc
                                await db.collection('users').doc(userId).set({
                                    ...cardData,
                                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                                }, { merge: true });
                            }
                        }
                    } catch (chargeErr: any) {
                        console.warn(`[Webhook] Could not fetch charge: ${chargeErr.message}`);
                    }

                    // Get plan from subscription metadata
                    let plan = 'builder';
                    if (invoice.lines?.data?.length) {
                        const priceId = (invoice.lines.data[0] as any)?.price?.id;
                        if (priceId === process.env.STRIPE_LIVE_PRICE_STARTUP) plan = 'startup';
                        else if (priceId === process.env.STRIPE_LIVE_PRICE_BUILDER) plan = 'builder';
                    }

                    await db.collection('billing_transactions').add({
                        userId,
                        stripeCustomerId: customerId,
                        stripeSubscriptionId: (invoice as any).subscription as string,
                        stripeInvoiceId: invoice.id,
                        plan,
                        type: 'subscription_renewal',
                        amount: invoice.amount_paid,    // in cents
                        currency: invoice.currency,
                        status: 'paid',
                        ...cardData,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    });

                    console.log(`[Webhook] billing_transactions renewal written for user=${userId}`);
                }
            }
        }

        // ─── customer.subscription.updated ────────────────────────────────────
        if (event.type === 'customer.subscription.updated') {
            const subscription = event.data.object as Stripe.Subscription;
            const userId = subscription.metadata?.userId
                || await getUserIdByCustomer(db, subscription.customer as string);
            const plan = subscription.metadata?.plan || 'builder';

            if (userId) {
                console.log(`[Webhook] subscription.updated → user=${userId} plan=${plan}`);
                await db.collection('users').doc(userId).set({
                    plan,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                }, { merge: true });
            }
        }

        // ─── customer.subscription.deleted ────────────────────────────────────
        if (event.type === 'customer.subscription.deleted') {
            const subscription = event.data.object as Stripe.Subscription;
            const userId = subscription.metadata?.userId
                || await getUserIdByCustomer(db, subscription.customer as string);

            if (userId) {
                console.log(`[Webhook] subscription.deleted → user=${userId} reverting to free`);
                await db.collection('users').doc(userId).set({
                    plan: 'free',
                    stripeSubscriptionId: null,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                }, { merge: true });
            }
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error(`[Webhook] Error: ${err.message}`);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}
