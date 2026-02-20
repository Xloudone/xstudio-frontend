"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import styles from './Header.module.css';

const navItems = [
    { id: 'product', name: 'Product', href: '/product', hasDropdown: false },
    { id: 'use-cases', name: 'Use Cases', href: '#', hasDropdown: true },
    { id: 'pricing', name: 'Pricing', href: '/pricing', hasDropdown: false },
    { id: 'resources', name: 'Resources', href: '#', hasDropdown: true },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={clsx(styles.header, scrolled && styles.scrolled, activeMenu && styles.menuActive)}
                onMouseLeave={() => setActiveMenu(null)}
            >
                <div className={styles.container}>
                    <Link
                        href="/"
                        className={styles.logo}
                        onClick={() => {
                            setActiveMenu(null);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <Image
                            src="/XOLogoBlackicon.png"
                            alt="xstudio Logo"
                            width={32}
                            height={32}
                            priority
                            className={styles.logoImage}
                        />
                    </Link>
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            {navItems.map((item) => (
                                <li
                                    key={item.id}
                                    className={styles.navItem}
                                    onMouseEnter={() => setActiveMenu(item.hasDropdown ? item.id : null)}
                                >
                                    <Link href={item.href} className={styles.navLink}>
                                        {item.name}
                                        {item.hasDropdown && (
                                            <motion.div
                                                animate={{ rotate: activeMenu === item.id ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className={styles.chevronWrapper}
                                            >
                                                <ChevronDown className={styles.chevron} size={16} />
                                            </motion.div>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <AnimatePresence>
                    {activeMenu && (
                        <motion.div
                            className={styles.megaMenu}
                            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className={styles.menuContent}>
                                {activeMenu === 'use-cases' && (
                                    <div className={styles.useCasesContent}>
                                        <div className={styles.menuHeader}>
                                            <h3>Use Cases</h3>
                                            <Link
                                                href="#"
                                                className={styles.readMore}
                                                onClick={() => setActiveMenu(null)}
                                            >
                                                Read More <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                        <div className={styles.imageGrid}>
                                            <div className={styles.imagePlaceholder} />
                                            <div className={styles.imagePlaceholder} />
                                        </div>
                                    </div>
                                )}
                                {activeMenu === 'resources' && (
                                    <div className={styles.useCasesContent}>
                                        <div className={styles.menuHeader}>
                                            <h3>Download</h3>
                                            <ul className={styles.resourceLinks}>
                                                <li><Link href="/changelog" onClick={() => setActiveMenu(null)}>Changelog</Link></li>
                                                <li><Link href="/docs" onClick={() => setActiveMenu(null)}>Documentation</Link></li>
                                                <li><Link href="/support" onClick={() => setActiveMenu(null)}>Support</Link></li>
                                            </ul>
                                        </div>
                                        <div className={styles.imageGrid}>
                                            <div className={styles.imagePlaceholder} />
                                            <div className={styles.imagePlaceholder} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}

