import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import styles from './Hero.module.css';

export function HeroContent() {
    return (
        <div className={styles.content}>
            <motion.h1
                className={styles.heading}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                Download
            </motion.h1>

            <motion.p
                className={styles.subtext}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
                Download
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <Button className={styles.downloadButton}>Download</Button>
            </motion.div>
        </div>
    );
}
