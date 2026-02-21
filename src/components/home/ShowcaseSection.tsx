"use client";

import { motion } from "framer-motion";
import styles from "./ShowcaseSection.module.css";

export function ShowcaseSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Side */}
                <div className={styles.leftSide}>
                    <motion.h2
                        className={styles.heading}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Your Team, Amplified
                    </motion.h2>
                    <motion.div
                        className={styles.leftContainer}
                        initial={{ opacity: 0, scale: 0.95, y: 60 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* Right Side */}
                <div className={styles.rightSide}>
                    <motion.p
                        className={styles.subtext}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Assign tasks to teammates or AI agents that work asynchronously. Code continues while you sleep. Context never gets lost. Your team stays in perfect sync.
                    </motion.p>
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
