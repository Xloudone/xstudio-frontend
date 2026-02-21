"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import styles from './Product.module.css';

export default function ProductPage() {
    const [os, setOs] = useState<'windows' | 'mac' | 'other'>('other');

    useEffect(() => {
        const platform = window.navigator.platform.toLowerCase();
        if (platform.includes('win')) {
            setOs('windows');
        } else if (platform.includes('mac')) {
            setOs('mac');
        }
    }, []);

    const renderIcon = (size = 18) => {
        if (os === 'windows') {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M0 3.449L9.75 2.1V11.7H0V3.449zm0 9.15h9.75V21.9L0 20.55v-7.951zM11.25 1.85L24 0v11.7h-12.75V1.85zm12.75 10.75V24l-12.75-1.85V12.6H24z" />
                </svg>
            );
        }
        if (os === 'mac') {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', marginBottom: '2px' }}>
                    <path d="M17.057 12.783c.032 2.588 2.254 3.462 2.287 3.477-.023.072-.357 1.231-1.175 2.445-.707 1.05-1.441 2.096-2.604 2.117-1.144.02-1.513-.69-2.822-.69-1.309 0-1.718.669-2.801.711-1.124.043-1.954-1.114-2.668-2.158-1.458-2.134-2.57-6.023-1.07-8.653.743-1.306 2.063-2.133 3.497-2.154 1.09-.016 2.12.76 2.788.76.666 0 1.912-.953 3.208-.818.544.023 2.071.222 3.052 1.678-.079.05-1.831 1.083-1.815 3.238l.023.038zm-3.411-8.56c.594-.73 1-1.745.89-2.761-.859.035-1.899.581-2.515 1.311-.553.649-1.037 1.688-.908 2.682.959.074 1.939-.499 2.533-1.232z" />
                </svg>
            );
        }
        return null;
    };

    const osName = os === 'mac' ? 'macOS' : os === 'windows' ? 'Windows' : 'your device';

    return (
        <main className={styles.section}>
            {/* Section 1 */}
            <section className={styles.heroSection}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    XStudio for {osName}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Button className={styles.ctaButton}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            {renderIcon()}
                            Download
                        </span>
                    </Button>
                </motion.div>
            </section>

            {/* Section 2 */}
            <section className={styles.featureSection}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    The Future of Flow
                </motion.h2>

                <div className={styles.gridContainer}>
                    <div className={styles.row + ' ' + styles.row3}>
                        {[
                            "Intelligent context-aware completion that understands your entire codebase.",
                            "Seamless team collaboration with real-time state synchronization.",
                            "Native integration with your favorite dev tools and deployment pipelines."
                        ].map((desc, i) => (
                            <motion.div
                                key={i}
                                className={styles.featureCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                            >
                                <p className={styles.featureDescription}>{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className={styles.row + ' ' + styles.row2}>
                        {[
                            "Automated security auditing and vulnerability patching built into every commit.",
                            "Powerful AI agents that handle repetitive tasks while you stay in the creative zone."
                        ].map((desc, i) => (
                            <motion.div
                                key={i}
                                className={styles.featureCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 + (i * 0.1) }}
                            >
                                <p className={styles.featureDescription}>{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3 */}
            <section className={styles.downloadSection}>
                <motion.h2
                    className={styles.downloadTitle}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Download XStudio on {osName}
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Button className={styles.ctaButton}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            {renderIcon(20)}
                            Download
                        </span>
                    </Button>
                </motion.div>
            </section>
        </main>
    );
}
