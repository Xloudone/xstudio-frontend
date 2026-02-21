"use client";

import { motion } from 'framer-motion';
import styles from '../UseCase.module.css';

export default function StudentsPage() {
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
                        XStudio for Students
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
                            The workspace for the next generation of builders. XStudio simplifies complex workflows and provides AI Pair Programming that learns with you. Whether you're building your first app or a senior project, our workspace provides the perfect environment to bridge the gap between learning and shipping.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
