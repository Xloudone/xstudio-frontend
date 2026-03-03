import styles from './Success.module.css';
import heroStyles from '@/components/hero/Hero.module.css';
import { HeroBackground } from '@/components/hero/HeroBackground';

export default function SuccessPage() {
    return (
        <section className={heroStyles.hero}>
            <HeroBackground />
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Payment Successful!</h1>
                    <p className={styles.message}>
                        Your plan has been upgraded. You can now close this tab and return to the <strong>Xstudio</strong> app.
                    </p>
                    <div className={styles.info}>
                        The app will automatically detect your new plan in a few seconds.
                    </div>
                </div>
            </div>
        </section>
    );
}
