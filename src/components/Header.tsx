"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import styles from './Header.module.css';
import { Button } from './ui/Button';

const navItems = [
    { id: 'product', name: 'Product', href: '/product', hasDropdown: false },
    { id: 'use-cases', name: 'Use Cases', href: '#', hasDropdown: true },
    { id: 'pricing', name: 'Pricing', href: '/pricing', hasDropdown: false },
    { id: 'resources', name: 'Resources', href: '#', hasDropdown: true },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);

    const [os, setOs] = useState<'windows' | 'mac' | 'other'>('other');

    useEffect(() => {
        // Prevent scrolling when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; }
    }, [mobileMenuOpen]);

    useEffect(() => {
        const platform = window.navigator.platform.toLowerCase();
        if (platform.includes('win')) {
            setOs('windows');
        } else if (platform.includes('mac')) {
            setOs('mac');
        }

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine scrolled state (for blurred background)
            setScrolled(currentScrollY > 20);

            // Hide/show logic based on scroll direction (disable hiding when menu open)
            if (currentScrollY > lastScrollY && currentScrollY > 100 && !mobileMenuOpen) {
                // Scrolling down & past threshold -> hide
                setHidden(true);
                setActiveMenu(null); // auto-close menu if open
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up -> show
                setHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Prevent scrolling when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; }
    }, [mobileMenuOpen]);

    const renderIcon = (size = 14) => {
        if (os === 'windows') {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path d="M0 3.449L9.75 2.1V11.7H0V3.449zm0 9.15h9.75V21.9L0 20.55v-7.951zM11.25 1.85L24 0v11.7h-12.75V1.85zm12.75 10.75V24l-12.75-1.85V12.6H24z" />
                </svg>
            );
        }
        if (os === 'mac') {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px', marginBottom: '1px' }}>
                    <path d="M17.057 12.783c.032 2.588 2.254 3.462 2.287 3.477-.023.072-.357 1.231-1.175 2.445-.707 1.05-1.441 2.096-2.604 2.117-1.144.02-1.513-.69-2.822-.69-1.309 0-1.718.669-2.801.711-1.124.043-1.954-1.114-2.668-2.158-1.458-2.134-2.57-6.023-1.07-8.653.743-1.306 2.063-2.133 3.497-2.154 1.09-.016 2.12.76 2.788.76.666 0 1.912-.953 3.208-.818.544.023 2.071.222 3.052 1.678-.079.05-1.831 1.083-1.815 3.238l.023.038zm-3.411-8.56c.594-.73 1-1.745.89-2.761-.859.035-1.899.581-2.515 1.311-.553.649-1.037 1.688-.908 2.682.959.074 1.939-.499 2.533-1.232z" />
                </svg>
            );
        }
        return null;
    };

    return (
        <>
            <header
                className={clsx(
                    styles.header,
                    scrolled && styles.scrolled,
                    hidden && styles.hidden,
                    activeMenu && styles.menuActive
                )}
                onMouseLeave={() => setActiveMenu(null)}
            >
                <div className={styles.container}>
                    <div className={styles.leftSection}>
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
                                width={24}
                                height={24}
                                priority
                                className={styles.logoImage}
                            />
                            <span className={styles.logoText}>studio</span>
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

                    <div className={styles.rightActions}>
                        <Link href="/product">
                            <Button variant="primary" className={styles.downloadBtn}>
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    {renderIcon()}
                                    Download
                                </span>
                            </Button>
                        </Link>
                    </div>

                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
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
                                            <ul className={styles.resourceLinks}>
                                                <li><Link href="/startups" onClick={() => setActiveMenu(null)}>Startups</Link></li>
                                                <li><Link href="/students" onClick={() => setActiveMenu(null)}>Students</Link></li>
                                                <li><Link href="/enterprises" onClick={() => setActiveMenu(null)}>Enterprises</Link></li>
                                            </ul>
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
                                            <h3>Resources</h3>
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

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className={styles.mobileOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className={styles.mobileHeader}>
                                <Image
                                    src="/XOLogoBlackicon.png"
                                    alt="xstudio Logo"
                                    width={24}
                                    height={24}
                                    priority
                                    className={styles.logoImage}
                                />
                                <span className={styles.logoText}>studio</span>
                                <button
                                    className={styles.mobileCloseBtn}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setMobileActiveMenu(null);
                                    }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className={styles.mobileNav}>
                                {mobileActiveMenu === null ? (
                                    <>
                                        <Link href="/product" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Product</Link>
                                        <button
                                            className={styles.mobileNavLinkBtn}
                                            onClick={() => setMobileActiveMenu('use-cases')}
                                        >
                                            Use Cases <ArrowRight size={24} />
                                        </button>
                                        <Link href="/pricing" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                                        <button
                                            className={styles.mobileNavLinkBtn}
                                            onClick={() => setMobileActiveMenu('resources')}
                                        >
                                            Resources <ArrowRight size={24} />
                                        </button>
                                    </>
                                ) : mobileActiveMenu === 'use-cases' ? (
                                    <>
                                        <button className={styles.mobileBackBtn} onClick={() => setMobileActiveMenu(null)}>
                                            <ArrowLeft size={20} /> Back
                                        </button>
                                        <h3 className={styles.mobileSubHeaderTitle}>Use Cases</h3>
                                        <Link href="/startups" className={styles.mobileSubLink} onClick={() => { setMobileMenuOpen(false); setMobileActiveMenu(null); }}>Startups</Link>
                                        <Link href="/students" className={styles.mobileSubLink} onClick={() => { setMobileMenuOpen(false); setMobileActiveMenu(null); }}>Students</Link>
                                        <Link href="/enterprises" className={styles.mobileSubLink} onClick={() => { setMobileMenuOpen(false); setMobileActiveMenu(null); }}>Enterprises</Link>
                                    </>
                                ) : mobileActiveMenu === 'resources' ? (
                                    <>
                                        <button className={styles.mobileBackBtn} onClick={() => setMobileActiveMenu(null)}>
                                            <ArrowLeft size={20} /> Back
                                        </button>
                                        <h3 className={styles.mobileSubHeaderTitle}>Resources</h3>
                                        <Link href="/changelog" className={styles.mobileSubLink} onClick={() => { setMobileMenuOpen(false); setMobileActiveMenu(null); }}>Changelog</Link>
                                        <Link href="/docs" className={styles.mobileSubLink} onClick={() => { setMobileMenuOpen(false); setMobileActiveMenu(null); }}>Documentation</Link>
                                        <Link href="/support" className={styles.mobileSubLink} onClick={() => { setMobileMenuOpen(false); setMobileActiveMenu(null); }}>Support</Link>
                                    </>
                                ) : null}

                                <div className={styles.mobileCtaWrapper}>
                                    <Link href="/product" onClick={() => { setMobileMenuOpen(false); setMobileActiveMenu(null); }} style={{ width: '100%' }}>
                                        <Button variant="primary" className={styles.mobileDownloadBtn}>
                                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                                {renderIcon()}
                                                Download for Windows
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}

