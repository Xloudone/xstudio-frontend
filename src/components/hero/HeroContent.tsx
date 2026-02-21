import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import styles from './Hero.module.css';

import Image from 'next/image';

export function HeroContent() {
    const [os, setOs] = useState<'windows' | 'mac' | 'other'>('other');

    useEffect(() => {
        const platform = window.navigator.platform.toLowerCase();
        if (platform.includes('win')) {
            setOs('windows');
        } else if (platform.includes('mac')) {
            setOs('mac');
        }
    }, []);

    const renderIcon = () => {
        if (os === 'windows') {
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M0 3.449L9.75 2.1V11.7H0V3.449zm0 9.15h9.75V21.9L0 20.55v-7.951zM11.25 1.85L24 0v11.7h-12.75V1.85zm12.75 10.75V24l-12.75-1.85V12.6H24z" />
                </svg>
            );
        }
        if (os === 'mac') {
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', marginBottom: '2px' }}>
                    <path d="M17.057 12.783c.032 2.588 2.254 3.462 2.287 3.477-.023.072-.357 1.231-1.175 2.445-.707 1.05-1.441 2.096-2.604 2.117-1.144.02-1.513-.69-2.822-.69-1.309 0-1.718.669-2.801.711-1.124.043-1.954-1.114-2.668-2.158-1.458-2.134-2.57-6.023-1.07-8.653.743-1.306 2.063-2.133 3.497-2.154 1.09-.016 2.12.76 2.788.76.666 0 1.912-.953 3.208-.818.544.023 2.071.222 3.052 1.678-.079.05-1.831 1.083-1.815 3.238l.023.038zm-3.411-8.56c.594-.73 1-1.745.89-2.761-.859.035-1.899.581-2.515 1.311-.553.649-1.037 1.688-.908 2.682.959.074 1.939-.499 2.533-1.232z" />
                </svg>
            );
        }
        return null;
    };

    return (
        <div className={styles.content}>
            <motion.div
                className={styles.logoBadge}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
                <Image
                    src="/XOLogoBlackicon.png"
                    alt="Logo"
                    width={20}
                    height={20}
                    className={styles.badgeLogo}
                />
                <span className={styles.badgeText}>studio</span>
            </motion.div>
            <motion.h1
                className={styles.heading}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                Build Without Boundaries
            </motion.h1>

            <motion.p
                className={styles.subtext}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
                The AI-native workspace where creators, builders, and teams ship products faster.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <Button className={styles.downloadButton}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {renderIcon()}
                        Download
                    </span>
                </Button>
            </motion.div>
        </div>
    );
}
