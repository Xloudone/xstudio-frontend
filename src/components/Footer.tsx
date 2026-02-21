"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const footerLinks = {
    Product: [
        { name: 'Download', href: '/#hero' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Students', href: '#' },
        { name: 'Enterprises', href: '#' },
    ],
    Resources: [
        { name: 'Changelog', href: '/changelog' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Support', href: '/support' },
    ],
    Company: [
        { name: 'Website', href: 'https://xloudone.com' },
        { name: 'Manifesto', href: '#' },
    ],
};

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.coreContainer}>
                <div className={styles.brandSide}>
                    <div className={styles.logoBox}>
                        <Image
                            src="/XOLogoBlackicon.png"
                            alt="xstudio Logo"
                            width={32}
                            height={32}
                            priority
                            className={styles.logoImage}
                            style={{ filter: 'invert(1)' }} /* Flip to white for black bg */
                        />
                        <span className={styles.brandName}>studio</span>
                    </div>
                </div>

                <div className={styles.linksSide}>
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className={styles.linkColumn}>
                            <h3 className={styles.columnTitle}>{category}</h3>
                            <ul className={styles.linkList}>
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className={styles.copyright}>
                    2026 XloudOne
                </div>
                <div className={styles.legalLinks}>
                    <Link href="/terms" className={styles.legalLink}>Terms</Link>
                    <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
                </div>
            </div>
        </footer>
    );
}
