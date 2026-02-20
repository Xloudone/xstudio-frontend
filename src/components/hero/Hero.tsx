import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import styles from './Hero.module.css';

export function Hero() {
    return (
        <section className={styles.hero}>
            <HeroBackground />
            <HeroContent />
        </section>
    );
}
