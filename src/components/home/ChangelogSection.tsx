"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import styles from "./ChangelogSection.module.css";

const logs = [
    {
        version: "1.2.0",
        description: "This is a example description of the chnage logs.",
        date: "Feb 17, 2026"
    },
    {
        version: "1.1.0",
        description: "This is a example description of the chnage logs.",
        date: "Feb 10, 2026"
    },
    {
        version: "1.0.0",
        description: "Initial release of xstudio with fundamental features.",
        date: "Feb 1, 2026"
    }
];

export function ChangelogSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.titleGroup}>
                    <h2 className={styles.title}>Changelog</h2>
                    <Link href="#" className={styles.viewLogs}>
                        View Logs &gt;
                    </Link>
                </div>

                <div className={styles.cardRow}>
                    {logs.map((log, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className={styles.versionPill}>{log.version}</span>
                            <p className={styles.description}>{log.description}</p>
                            <span className={styles.date}>{log.date}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
