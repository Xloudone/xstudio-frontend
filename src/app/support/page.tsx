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
                    <Link href="https://www.linkedin.com/company/xloudone" className={styles.card} target="_blank" rel="noopener noreferrer">
                        <div className={styles.iconWrapper}>
                            <Linkedin size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.cardTitle}>LinkedIn</h3>
                        <p className={styles.cardDesc}>Follow us for product updates & company news</p>
                        <ChevronRight className={styles.cardChevron} size={20} />
                    </Link>

                    <Link href="https://www.youtube.com/@xloudstudio" className={styles.card} target="_blank" rel="noopener noreferrer">
                        <div className={styles.iconWrapper}>
                            <Youtube size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.cardTitle}>YouTube</h3>
                        <p className={styles.cardDesc}>Tutorials, demos & product walkthroughs</p>
                        <ChevronRight className={styles.cardChevron} size={20} />
                    </Link>

                    <Link href="https://x.com/xloudone" className={styles.card} target="_blank" rel="noopener noreferrer">
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
                        <p className={styles.cardDesc}>Real-time updates, drops & announcements</p>
                        <ChevronRight className={styles.cardChevron} size={20} />
                    </Link>

                    <Link href="https://discord.gg/NMnTDhjjDR" className={styles.card} target="_blank" rel="noopener noreferrer">
                        <div className={styles.iconWrapper}>
                            {/* Discord Icon */}
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.026 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Discord</h3>
                        <p className={styles.cardDesc}>Join the community for help & updates</p>
                        <ChevronRight className={styles.cardChevron} size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
