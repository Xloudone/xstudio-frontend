"use client";

import { motion } from 'framer-motion';
import styles from '../Legal.module.css';

export default function TermsPage() {
    return (
        <main className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.title}>Terms and Privacy</h1>
                    <p className={styles.lastUpdated}>Last Updated: February 21, 2026</p>
                </motion.div>

                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing or using XStudio, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
                    </p>

                    <h2>2. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are and will remain the exclusive property of XloudOne and its licensors. Our AI-generated boilerplate code is provided to you under a permissive license for use in your own projects.
                    </p>

                    <h2>3. User Responsibilities</h2>
                    <p>
                        You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                    </p>

                    <h2>4. Limitation of Liability</h2>
                    <p>
                        In no event shall XloudOne be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </p>

                    <h2>5. Termination</h2>
                    <p>
                        We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
