"use client";

import { useEffect, useState } from 'react';
import { useReleases } from '@/hooks/useReleases';
import styles from './Changelog.module.css';

const MAX_CHARACTERS = 300;

function TruncatedDescription({ text }: { text: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldTruncate = text.length > MAX_CHARACTERS;

    const displayText = isExpanded ? text : text.slice(0, MAX_CHARACTERS) + (shouldTruncate ? '...' : '');

    return (
        <div>
            <div className={styles.description}>{displayText}</div>
            {shouldTruncate && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={styles.readMoreButton}
                >
                    {isExpanded ? 'Show Less' : 'See More'}
                </button>
            )}
        </div>
    );
}

export default function ChangelogPage() {
    const { releases, loading, error } = useReleases();

    useEffect(() => {
        if (loading || releases.length === 0) return;

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

        releases.forEach((release) => {
            const id = `v${release.tag_name.replace(/\./g, '-')}`;
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
    }, [loading, releases]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>Changelog</h1>

                <div className={styles.headerRow}>
                    <span className={styles.headerLabel}>Version</span>
                    <span className={styles.headerLabel}>Description</span>
                </div>

                <div className={styles.logList}>
                    {loading ? (
                        <div className={styles.loading}>Loading releases...</div>
                    ) : error ? (
                        <div className={styles.error}>Error loading releases: {error}</div>
                    ) : (
                        releases.map((release, index) => {
                            const id = `v${release.tag_name.replace(/\./g, '-')}`;
                            return (
                                <div key={index} id={id} className={styles.logItem}>
                                    <div className={styles.versionColumn}>
                                        <div className={styles.versionPill}>{release.tag_name}</div>
                                        <span className={styles.date}>
                                            {new Date(release.published_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className={styles.descriptionColumn}>
                                        <TruncatedDescription text={release.body} />
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
