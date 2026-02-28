import styles from './Pricing.module.css';
import clsx from 'clsx';
import Link from 'next/link';

const plans = [
    {
        name: "Free",
        subtitle: "Get started for free",
        price: "$0",
        period: "/month",
        features: [
            "1 user account",
            "XStudio Agent: 10 requests/day",
            "Premium AI: 5 requests/day",
            "1GB cloud storage",
            "Basic GitHub sync",
            "Community support (Discord/forum)",
            "Web development only"
        ],
        buttonText: "Select",
        variant: "outline"
    },
    {
        name: "Builder",
        subtitle: "For solo builders",
        price: "$49",
        period: "/month",
        features: [
            "1 user account",
            "Custom XStudio Agent (unlimited) powered by Xognito",
            "Premium AI: 50 requests/day",
            "Claude Sonnet: 50/day",
            "Gemini Pro: 50/day",
            "10GB cloud storage",
            "Real-time GitHub sync",
            "1 guest collaborator",
            "Community support (Discord/forum)",
            "Web + mobile development",
            "Basic security scans"
        ],
        buttonText: "Select",
        variant: "outline"
    },
    {
        name: "Startup",
        subtitle: "For growing teams",
        price: "$117",
        period: "/month",
        features: [
            "3+ user accounts ($39/user/month)",
            "Everything in Builder",
            "Premium AI: 150 requests/day per user",
            "Claude Sonnet: 150/day",
            "Gemini Pro: 150/day",
            "25GB storage per user",
            "Priority support (24-48hr response)",
            "Enhanced security scans"
        ],
        buttonText: "Select",
        variant: "popular",
        isPopular: true
    },
    {
        name: "Enterprise",
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
                            className={clsx(styles.card, plan.isPopular && styles.cardPopular, plan.isComingSoon && styles.cardComingSoon)}
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

                            <Link
                                href="#"
                                className={clsx(
                                    styles.button,
                                    plan.variant === 'popular' ? styles.buttonOutline : styles.buttonDark
                                )}
                            >
                                {plan.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
