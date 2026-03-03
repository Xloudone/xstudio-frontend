const Stripe = require('stripe');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Basic .env parser
function loadEnv() {
    const envPath = path.join(__dirname, '../.env');
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            const key = match[1];
            let value = match[2] || '';
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            process.env[key] = value.replace(/\\n/g, '\n');
        }
    });
}

loadEnv();

if (!process.env.STRIPE_LIVE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('ERROR: Missing STRIPE_LIVE_SECRET_KEY or STRIPE_WEBHOOK_SECRET in .env');
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_LIVE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function testWebhook() {
    console.log('--- Testing Webhook Implementation ---');
    console.log(`Using Webhook Secret: ${webhookSecret.substring(0, 10)}...`);

    const payload = JSON.stringify({
        id: 'evt_test_webhook_' + Date.now(),
        type: 'checkout.session.completed',
        data: {
            object: {
                client_reference_id: 'test_user_666',
                customer: 'cus_test_666',
                subscription: 'sub_test_666',
                line_items: {
                    data: [
                        { price: { id: process.env.STRIPE_LIVE_PRICE_BUILDER || 'price_test_123' } }
                    ]
                },
                metadata: {
                    userId: 'test_user_666',
                    plan: 'builder'
                }
            }
        }
    });

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payload,
        secret: webhookSecret,
    });

    const options = {
        hostname: '127.0.0.1',
        port: 3000,
        path: '/api/webhook/stripe',
        method: 'POST',
        headers: {
            'stripe-signature': header,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log(`\nSTATUS: ${res.statusCode} ${res.statusMessage}`);
            console.log(`BODY: ${data}`);
            if (res.statusCode === 200) {
                console.log('\n✅ Local Test Successful!');
                console.log('Check your Firestore "users" collection for "test_user_666"');
            } else {
                console.log('\n❌ Local Test Failed.');
            }
        });
    });

    req.on('error', (e) => {
        console.error(`\n❌ REQUEST ERROR: ${e.message}`);
        console.log('Is the dev server running on http://localhost:3000?');
    });

    req.write(payload);
    req.end();
}

testWebhook();
