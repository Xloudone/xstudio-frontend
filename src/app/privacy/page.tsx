"use client";

import { motion } from 'framer-motion';
import styles from '../Legal.module.css';

export default function PrivacyPage() {
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
                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as when you create an account, update your profile, or use our AI features. This may include your name, email address, and code snippets processed by our AI models.
                    </p>

                    <h2>2. How We Use Information</h2>
                    <p>
                        We use the information we collect to provide, maintain, and improve our services, including training our local models (when opted-in) and providing personalized coding assistance.
                    </p>

                    <h2>3. Data Security</h2>
                    <p>
                        We implement industry-standard security measures designed to protect your information from unauthorized access, disclosure, or destruction.
                    </p>

                    <h2>4. Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal information at any time through your account settings or by contacting our support team.
                    </p>

                    <h2>5. Changes to This Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
