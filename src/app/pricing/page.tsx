import styles from './Pricing.module.css';
import clsx from 'clsx';
import Link from 'next/link';

const plans = [
    {
        name: "Founder",
        subtitle: "For solo builders",
        price: "$45",
        features: ["hgghh", "gdfgdfg", "gfdgdfg", "gdfgfd", "dfgdf", "gdfgdf", "dfgd", "gfgh"],
        buttonText: "Try Now",
        variant: "outline"
    },
    {
        name: "Startup",
        subtitle: "For growing teams",
        price: "$99",
        features: ["hgghh", "gdfgdfg", "gfdgdfg", "gdfgfd", "dfgdf", "gdfgdf", "dfgd", "gfgh"],
        buttonText: "Select",
        variant: "popular",
        isPopular: true
    },
    {
        name: "Enterprise",
        subtitle: "For organizations building at scale",
        price: "Custom",
        features: ["hgghh", "gdfgdfg", "gfdgdfg", "gdfgfd", "dfgdf", "gdfgdf", "dfgd", "gfgh"],
        buttonText: "Contact Us",
        variant: "outline"
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
                            className={clsx(styles.card, plan.isPopular && styles.cardPopular)}
                        >
                            {plan.isPopular && <div className={styles.popularBadge}>Popular</div>}

                            <h2 className={styles.planName}>{plan.name}</h2>
                            <p className={styles.planSubtitle}>{plan.subtitle}</p>

                            <div className={styles.priceRow}>
                                <span className={clsx(styles.price, plan.price === 'Custom' && styles.priceCustom)}>
                                    {plan.price}
                                </span>
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
