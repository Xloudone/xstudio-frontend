"use client";

import { motion } from 'framer-motion';
import styles from '../UseCase.module.css';

export default function EnterprisesPage() {
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
                        XStudio for Enterprises
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
                            Scale without boundaries. XStudio Enterprises offers advanced security, team-wide AI synchronization, and deep integration with your existing dev stack. We eliminate context switching for thousands of developers, ensuring that your organization ships mission-critical software faster and more securely.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
