"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { useReleases } from '@/hooks/useReleases';
import styles from "./ChangelogSection.module.css";

export function ChangelogSection() {
    const { releases, loading, error } = useReleases();

    // Take the latest 3 releases
    const displayLogs = releases.slice(0, 3).map(release => ({
        version: release.tag_name,
        description: release.body.length > 150 ? release.body.substring(0, 150) + "..." : release.body,
        date: new Date(release.published_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }));

    if (error) {
        return null; // Or handle error UI
    }
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.titleGroup}>
                    <h2 className={styles.title}>Changelog</h2>
                    <Link href="/changelog" className={styles.viewLogs}>
                        View Logs &gt;
                    </Link>
                </div>

                <div className={styles.cardRow}>
                    {loading ? (
                        <div className={styles.loading}>Loading releases...</div>
                    ) : (
                        displayLogs.map((log, index) => (
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
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
