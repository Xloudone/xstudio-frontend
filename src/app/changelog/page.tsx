"use client";

import { useEffect, useState } from 'react';
import styles from './Changelog.module.css';

const logs = [
    {
        version: "1.2.0",
        date: "Feb 17, 2026",
        description: "This is a example description of the Change logs."
    },
    {
        version: "1.1.5",
        date: "Feb 10, 2026",
        description: "Further improvements to the engine and core modules."
    },
    {
        version: "1.1.0",
        date: "Feb 03, 2026",
        description: "Added support for multi-tenant workspaces and improved security protocols."
    },
    {
        version: "1.0.2",
        date: "Jan 27, 2026",
        description: "Initial beta release with core foundation and essential UI components."
    }
];

export default function ChangelogPage() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        window.history.replaceState(null, '', `#${id}`);
                    }
                });
            },
            { rootMargin: '-20% 0% -70% 0%' }
        );

        logs.forEach((log) => {
            const id = `v${log.version.replace(/\./g, '-')}`;
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Handle initial load scroll
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const el = document.getElementById(hash);
            if (el) {
                setTimeout(() => {
                    window.scrollTo({
                        top: el.offsetTop - 120,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>Changelog</h1>

                <div className={styles.headerRow}>
                    <span className={styles.headerLabel}>Version</span>
                    <span className={styles.headerLabel}>Description</span>
                </div>

                <div className={styles.logList}>
                    {logs.map((log, index) => {
                        const id = `v${log.version.replace(/\./g, '-')}`;
                        return (
                            <div key={index} id={id} className={styles.logItem}>
                                <div className={styles.versionColumn}>
                                    <div className={styles.versionPill}>{log.version}</div>
                                    <span className={styles.date}>{log.date}</span>
                                </div>
                                <div className={styles.descriptionColumn}>
                                    <p className={styles.description}>{log.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
