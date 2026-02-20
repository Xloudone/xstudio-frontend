"use client";

import { motion } from "framer-motion";
import styles from "./ShowcaseSection.module.css";

export function ShowcaseSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Vertical Image Placeholder */}
                <motion.div
                    className={styles.leftContainer}
                    initial={{ opacity: 0, scale: 0.95, y: 100 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Right Content */}
                <div className={styles.rightContent}>
                    <motion.div
                        className={styles.textContent}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className={styles.heading}>Download</h2>
                        <p className={styles.subtext}>Download</p>
                    </motion.div>

                    <motion.div
                        className={styles.rightImageContainer}
                        initial={{ opacity: 0, scale: 0.95, y: 60 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </div>
        </section>
    );
}
