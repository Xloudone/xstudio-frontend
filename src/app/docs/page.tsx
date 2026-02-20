"use client";

import styles from './Docs.module.css';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const navCategories = [
    {
        name: "Home",
        isOpen: true,
        items: [
            { name: "Get Started", href: "/docs" }
        ]
    },
    {
        name: "Editor",
        isOpen: true,
        items: [
            { name: "Components", href: "#" },
            { name: "Settings", href: "#" }
        ]
    }
];

const contentSections = [
    {
        id: "introduction",
        title: "Introduction",
        content: "Welcome to xstudio documentation. This guide will help you understand the core concepts and get your first project running in minutes."
    },
    {
        id: "installation",
        title: "Installation",
        content: "To install xstudio, run the following command in your terminal. Ensure you have the latest version of Node.js installed on your system."
    },
    {
        id: "core-concepts",
        title: "Core Concepts",
        content: "xstudio is built around the idea of modular, reusable components. Our engine handles the heavy lifting, allowing you to focus on the creative aspects of your project."
    },
    {
        id: "next-steps",
        title: "Next Steps",
        content: "Now that you've got the basics down, explore our components documentation to start building your interactive experiences."
    }
];

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState(contentSections[0].id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setActiveSection(id);
                        // Update hash without triggering scroll or page jump
                        window.history.replaceState(null, '', `#${id}`);
                    }
                });
            },
            { rootMargin: '-20% 0% -70% 0%' }
        );

        contentSections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        // Handle initial hash on mount
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            setTimeout(() => scrollToSection(hash), 100);
        }

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 120,
                behavior: 'smooth'
            });
            window.history.pushState(null, '', `#${id}`);
            setActiveSection(id);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Sidebar */}
                <aside className={styles.sidebarLeft}>
                    {navCategories.map((cat, idx) => (
                        <div key={idx} className={styles.category}>
                            <div className={styles.categoryHeader}>
                                {cat.name}
                                <ChevronDown size={14} />
                            </div>
                            <ul className={styles.categoryList}>
                                {cat.items.map((item, iIdx) => (
                                    <li key={iIdx}>
                                        <Link
                                            href={item.href}
                                            className={clsx(styles.navItem, item.name === "Get Started" && styles.navItemActive)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </aside>

                {/* Main Content */}
                <main className={styles.contentArea}>
                    <div className={styles.breadcrumbs}>
                        <span>Home</span>
                        <span className={styles.breadcrumbSeparator}>›</span>
                        <span>Get started</span>
                    </div>

                    <h1 className={styles.title}>Get Started</h1>

                    {contentSections.map((section) => (
                        <div key={section.id} id={section.id} className={styles.contentSection}>
                            <h2 className={styles.sectionHeading}>{section.title}</h2>
                            <p className={styles.paragraph}>{section.content}</p>
                            <p className={styles.paragraph}>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                                dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                            </p>
                        </div>
                    ))}
                </main>

                {/* Right Sidebar */}
                <aside className={styles.sidebarRight}>
                    <h3 className={styles.tocTitle}>On this page</h3>
                    <ul className={styles.tocList}>
                        {contentSections.map((section) => (
                            <li key={section.id}>
                                <a
                                    className={clsx(
                                        styles.tocItem,
                                        activeSection === section.id && styles.tocItemActive
                                    )}
                                    onClick={() => scrollToSection(section.id)}
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </section>
    );
}
