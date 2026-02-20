import styles from './Hero.module.css';

export function HeroBackground() {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.blurOrbs}>
                <div className={`${styles.orb} ${styles.orbPurple}`} />
                <div className={`${styles.orb} ${styles.orbCyan}`} />
            </div>
            <div className={styles.studioText}>STUDIO</div>
        </div>
    );
}
