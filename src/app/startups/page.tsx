"use client";

import { motion } from 'framer-motion';
import styles from '../UseCase.module.css';

export default function StartupsPage() {
    return (
        <main className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        XStudio for Startups
                    </motion.h1>
                </div>

                <div className={styles.contentWrapper}>
                    <motion.div
                        className={styles.mediaPlaceholder}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                    <motion.div
                        className={styles.description}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <p>
                            Launch faster and iterate with confidence. XStudio provides early-stage teams with the AI-native tools needed to turn ideas into production-ready products in record time. From automated boilerplate to intelligent refactoring, we handle the heavy lifting so you can focus on building what matters.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
