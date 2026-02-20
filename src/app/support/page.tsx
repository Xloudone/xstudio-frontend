import styles from './Support.module.css';
import Link from 'next/link';
import { Linkedin, Youtube, Twitter, ChevronRight } from 'lucide-react';

export default function SupportPage() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.heroRow}>
                    <div className={styles.left}>
                        <h1 className={styles.title}>Support</h1>
                        <Link href="/docs" className={styles.docsButton}>
                            View Docs
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <a href="mailto:support@xloudone.com" className={styles.email}>
                            support@xloudone.com
                        </a>
                    </div>
                </div>

                <div className={styles.grid}>
                    <Link href="#" className={styles.card}>
                        <div className={styles.iconWrapper}>
                            <Linkedin size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.cardTitle}>LinkedIn</h3>
                        <p className={styles.cardDesc}>Stay up date with the latest news</p>
                        <ChevronRight className={styles.cardChevron} size={20} />
                    </Link>

                    <Link href="#" className={styles.card}>
                        <div className={styles.iconWrapper}>
                            <Youtube size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.cardTitle}>YouTube</h3>
                        <p className={styles.cardDesc}>Stay up date with the latest news</p>
                        <ChevronRight className={styles.cardChevron} size={20} />
                    </Link>

                    <Link href="#" className={styles.card}>
                        <div className={styles.iconWrapper}>
                            {/* X / Twitter Icon */}
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>X</h3>
                        <p className={styles.cardDesc}>Stay up date with the latest news</p>
                        <ChevronRight className={styles.cardChevron} size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
