'use client';

import styles from './Pricing.module.css';
import clsx from 'clsx';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useReleases } from '@/hooks/useReleases';

const plans = [
    {
        name: "Free",
        id: "free",
        subtitle: "Get started for free",
        price: "$0",
        period: "/month",
        features: [
            "XStudio Agent: 20 requests/day",
            "1 Autonomous agent",
            "1GB cloud storage",
            "Real-time GitHub sync",
            "Community support (Discord/forum)",
            "Web deployment only"
        ],
        buttonText: "Download",
        variant: "outline"
    },
    {
        name: "Builder",
        id: "builder",
        subtitle: "For solo builders",
        price: "$49",
        period: "/month",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUILDER || process.env.STRIPE_LIVE_PRICE_BUILDER,
        features: [
            "XStudio Agent (unlimited usage)",
            "Up to 3 Autonomous agents",
            "Premium AI: 50 requests/day",
            "Claude Sonnet: 50/day",
            "Gemini Pro: 50/day",
            "10GB cloud storage",
            "Real-time GitHub sync",
            "1 guest collaborator",
            "Community support (Discord/forum)",
            "Web, Mobile, & API Deployment",
            "Basic security scans"
        ],
        buttonText: "Download",
        variant: "outline"
    },
    {
        name: "Startup",
        id: "startup",
        subtitle: "For growing teams",
        price: "$117",
        period: "/month",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTUP || process.env.STRIPE_LIVE_PRICE_STARTUP,
        features: [
            "3+ user accounts ($39/user/month)",
            "Everything in Builder",
            "5 Autonomous agents per user",
            "Premium AI: 150 requests/day per user",
            "Claude Sonnet: 150/day",
            "Gemini Pro: 150/day",
            "25GB storage per user",
            "Priority support (24-48hr response)",
            "Enhanced security scans"
        ],
        buttonText: "Download",
        variant: "popular",
        isPopular: true
    },
    {
        name: "Enterprise",
        id: "enterprise",
        subtitle: "For organizations building at scale",
        price: "",
        features: [
            "10+ user accounts ($35/user/month base)",
            "Everything in Startup",
            "Premium AI: 500 requests/day per user",
            "Claude Sonnet/Opus: 500/day",
            "Gemini Pro: 500/day",
            "Priority access to new models",
            "Unlimited storage",
            "Advanced security features",
            "SOC 2 compliance ready",
            "Dedicated support",
            "4-hour response SLA",
            "Custom AI model training",
            "White-label options (negotiable)",
            "Custom integrations"
        ],
        buttonText: "Get Notified",
        variant: "outline",
        isComingSoon: true
    }
];

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isElectron, setIsElectron] = useState(false);
    const { latestDownloadUrl } = useReleases();

    useEffect(() => {
        // Check if running in Electron or from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const uid = urlParams.get('userId');
        const source = urlParams.get('source');

        if (uid) setUserId(uid);
        if (source === 'electron' || navigator.userAgent.includes('Electron')) {
            setIsElectron(true);
        }
    }, []);

    const handlePlanSelect = async (plan: typeof plans[0]) => {
        if (plan.isComingSoon) return;

        // If it's the free plan or user is not logged in, trigger download
        if (plan.id === 'free' || !userId) {
            if (latestDownloadUrl) {
                window.location.href = latestDownloadUrl;
            } else {
                // Fallback to releases page if direct download link isn't ready
                window.location.href = 'https://github.com/Xloudone/Xstudio-Releases/releases';
            }
            return;
        }

        if (!plan.priceId) return;

        setLoading(plan.id);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: plan.priceId,
                    userId: userId,
                    source: isElectron ? 'electron' : 'web'
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Failed to create checkout session');
            }
        } catch (error: any) {
            console.error('Checkout error:', error);
            alert("Checkout failed: " + error.message);
        } finally {
            setLoading(null);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.background}>
                <div className={styles.gradient1} />
                <div className={styles.gradient2} />
            </div>

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Pricing</h1>
                    <p className={styles.subtitle}>From solo builder to enterprise team—transparent pricing at every stage.</p>
                </div>

                <div className={styles.grid}>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={clsx(
                                styles.card,
                                plan.isPopular && styles.cardPopular,
                                plan.isComingSoon && styles.cardComingSoon
                            )}
                        >
                            {plan.isPopular && <div className={styles.popularBadge}>Most Popular</div>}
                            {plan.isComingSoon && <div className={styles.comingSoonTopBadge}>Coming Soon</div>}

                            <h2 className={styles.planName}>{plan.name}</h2>
                            <p className={styles.planSubtitle}>{plan.subtitle}</p>

                            <div className={styles.priceRow}>
                                {plan.isComingSoon ? (
                                    <span className={styles.priceCustomLabel}>Custom</span>
                                ) : (
                                    <>
                                        <span className={styles.price}>{plan.price}</span>
                                        {plan.period && <span className={styles.period}>{plan.period}</span>}
                                    </>
                                )}
                            </div>

                            <ul className={styles.featureList}>
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className={styles.featureItem}>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {plan.isComingSoon ? (
                                <Link
                                    href="https://discord.gg/xloudone"
                                    className={clsx(styles.button, styles.buttonDark)}
                                >
                                    {plan.buttonText}
                                </Link>
                            ) : (
                                <button
                                    onClick={() => handlePlanSelect(plan)}
                                    disabled={loading !== null}
                                    className={clsx(
                                        styles.button,
                                        plan.variant === 'popular' ? styles.buttonOutline : styles.buttonDark,
                                        loading === plan.id && styles.buttonLoading
                                    )}
                                >
                                    {loading === plan.id ? 'Loading...' : plan.buttonText}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
