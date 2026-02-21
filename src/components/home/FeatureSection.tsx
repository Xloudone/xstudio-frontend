"use client";

import { motion } from "framer-motion";
import styles from "./FeatureSection.module.css";

export function FeatureSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className={styles.titleGroup}>
                        <span className={styles.label}>Build. Ship. Repeat.</span>
                        <h2 className={styles.heading}>Command Center</h2>
                    </div>
                    <p className={styles.description}>
                        From first commit to production deployment, experience how XStudio eliminates context switching and keeps your entire team in flow.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.imageContainer}
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-25%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                />
            </div>
        </section>
    );
}
