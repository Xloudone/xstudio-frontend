"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import styles from "./ContactSection.module.css";

export function ContactSection() {
    return (
        <section className={styles.section}>
            <div className={styles.backgroundContainer}>
                <div className={styles.blurOrbs}>
                    <div className={`${styles.orb} ${styles.orbPurple}`} />
                    <div className={`${styles.orb} ${styles.orbCyan}`} />
                </div>
            </div>

            <motion.h2
                className={styles.heading}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                Get In Touch
            </motion.h2>

            <motion.form
                className={styles.form}
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={(e) => e.preventDefault()}
            >
                <div className={styles.inputWrapper}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        required
                    />
                </div>
                <Button variant="primary" type="submit" className={styles.submitButton}>
                    Send
                </Button>
            </motion.form>
        </section>
    );
}
