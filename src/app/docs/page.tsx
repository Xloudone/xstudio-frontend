"use client";

import styles from './Docs.module.css';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface DocSection {
    id: string;
    title: string;
    content: string;
}

interface DocPage {
    id: string;
    title: string;
    category: string;
    description: string;
    sections: DocSection[];
}

const navCategories = [
    {
        name: "Getting Started",
        isOpen: true,
        items: [
            { name: "Welcome", id: "welcome" },
            { name: "Quick Start", id: "quick-start" },
            { name: "Installation", id: "installation" },
            { name: "First Project", id: "first-project" }
        ]
    },
    {
        name: "Platform",
        isOpen: true,
        items: [
            { name: "Editor", id: "editor" },
            { name: "Agents", id: "agents" },
            { name: "Models", id: "models" },
            { name: "Deployment", id: "deployment" },
            { name: "Collaboration", id: "collaboration" }
        ]
    },
    {
        name: "Features",
        isOpen: false,
        items: [
            { name: "AI Assistance", id: "ai-assistance" },
            { name: "Real-Time Sync", id: "real-time-sync" },
            { name: "Security & Quality", id: "security-quality" },
            { name: "Task Management", id: "task-management" },
            { name: "Storage & Projects", id: "storage-projects" }
        ]
    },
    {
        name: "Development",
        isOpen: false,
        items: [
            { name: "Web Development", id: "web-dev" },
            { name: "Mobile Development", id: "mobile-dev" },
            { name: "Backend & APIs", id: "backend-apis" },
            { name: "Full-Stack Projects", id: "full-stack" }
        ]
    },
    {
        name: "Integrations",
        isOpen: false,
        items: [
            { name: "GitHub", id: "github" },
            { name: "Vercel", id: "vercel" },
            { name: "Expo/EAS", id: "expo-eas" },
            { name: "Railway", id: "railway" },
            { name: "Other Tools", id: "other-tools" }
        ]
    },
    {
        name: "Account & Billing",
        isOpen: false,
        items: [
            { name: "Plans & Pricing", id: "pricing" },
            { name: "Team Management", id: "team" },
            { name: "Billing & Invoices", id: "billing" },
            { name: "Usage & Limits", id: "usage" }
        ]
    },
    {
        name: "Resources",
        isOpen: false,
        items: [
            { name: "API Reference", id: "api-ref" },
            { name: "Tutorials", id: "tutorials" },
            { name: "Best Practices", id: "best-practices" },
            { name: "FAQs", id: "faqs" }
        ]
    }
];

const docContent: Record<string, DocPage> = {
    "welcome": {
        id: "welcome",
        title: "Welcome to XStudio",
        category: "Getting Started",
        description: "XStudio is an AI-native development platform that brings your entire workflow into one intelligent workspace. Built for developers, founders, and teams who want to build faster without sacrificing quality.",
        sections: [
            { id: "what-is", title: "What is XStudio?", content: "Instead of juggling VS Code, Slack, Linear, GitHub, Vercel, and multiple AI tools, you get one unified workspace with AI agents that understand your product." },
            { id: "who-is", title: "Who is XStudio for?", content: "Designed for Solo Builders, Startups, and Enterprises looking to scale development without tool sprawl." },
            { id: "concepts", title: "Core Concepts", content: "Workspaces (projects), AI Agents (specialized assistants), and Real-Time Sync (instant collaboration)." },
            { id: "models", title: "Base vs Premium Models", content: "Base models (unlimited) for everyday tasks and Premium models (daily limits) for complex work." },
            { id: "next", title: "Next Steps", content: "Check out the Quick Start guide or create your first project." }
        ]
    },
    "quick-start": {
        id: "quick-start",
        title: "Quick Start",
        category: "Getting Started",
        description: "Get up and running in under 5 minutes with our automated setup wizard.",
        sections: [
            { id: "account", title: "Create Your Account", content: "Sign up at xstudio.dev, complete your profile, and connect your favorite tools." },
            { id: "workspace", title: "Create Your First Workspace", content: "Start from scratch with a template or import an existing project from GitHub." },
            { id: "interaction", title: "Your First AI Interaction", content: "Try commands like 'Create a user profile card' or 'Fix the bug in UserService.js'." },
            { id: "shortcuts", title: "Keyboard Shortcuts", content: "Master shortcuts like Cmd+K for the AI palette and Cmd+P for search." }
        ]
    },
    "installation": {
        id: "installation",
        title: "Installation",
        category: "Getting Started",
        description: "Set up XStudio for your preferred environment.",
        sections: [
            { id: "browser", title: "Browser-Based (Recommended)", content: "No installation needed. Works on any device instantly." },
            { id: "desktop", title: "Desktop App (Optional)", content: "Download for Mac, Windows, or Linux for offline mode and native performance." },
            { id: "tools", title: "Connect Your Tools", content: "Integrate with GitHub, Vercel, and Expo for a seamless workflow." },
            { id: "requirements", title: "System Requirements", content: "Modern browser or Windows 10+, macOS 11+, or Ubuntu 20.04+." }
        ]
    },
    "first-project": {
        id: "first-project",
        title: "First Project",
        category: "Getting Started",
        description: "Build a complete app in 15 minutes.",
        sections: [
            { id: "todo", title: "Build a Todo App", content: "Learn components, AI agents, and deployment by building a modern Todo application." },
            { id: "happened", title: "What just happened?", content: "The AI understood your requirements, wrote clean code, and deployed in seconds." },
            { id: "ideas", title: "Next Project Ideas", content: "Try building a Landing Page, a Dashboard, or a Mobile Weather App." }
        ]
    },
    "editor": {
        id: "editor",
        title: "Editor",
        category: "Platform",
        description: "The XStudio Editor provides a world-class visual development environment.",
        sections: [
            { id: "interface", title: "Interface Overview", content: "Explore the panels and tools in the editor." },
            { id: "shortcuts", title: "Keyboard Shortcuts", content: "Boost productivity with shortcuts." }
        ]
    },
    "agents": {
        id: "agents",
        title: "Agents",
        category: "Platform",
        description: "Autonomous AI agents for specialized tasks.",
        sections: [
            { id: "capabilities", title: "Agent Capabilities", content: "What agents can do for your project." },
            { id: "training", title: "Agent Training", content: "Fine-tune agents for your specific design system." }
        ]
    },
    "models": {
        id: "models",
        title: "Models",
        category: "Platform",
        description: "Frontier AI models at your fingertips.",
        sections: [
            { id: "selection", title: "Model Selection", content: "Choosing the right model for the job." },
            { id: "tokens", title: "Token Management", content: "Understanding context windows and limits." }
        ]
    },
    "deployment": {
        id: "deployment",
        title: "Deployment",
        category: "Platform",
        description: "Global deployments in seconds.",
        sections: [
            { id: "pipeline", title: "CI/CD Pipelines", content: "Configure automated workflows." },
            { id: "preview", title: "Preview Deploys", content: "Share live previews with your stakeholders." }
        ]
    },
    "collaboration": {
        id: "collaboration",
        title: "Collaboration",
        category: "Platform",
        description: "Multiplayer editing for teams.",
        sections: [
            { id: "multiplayer", title: "Live Multiplayer", content: "Edit code together in real-time." },
            { id: "comments", title: "Code Comments", content: "Discuss logic directly in the editor." }
        ]
    },
    "ai-assistance": {
        id: "ai-assistance",
        title: "AI Assistance",
        category: "Features",
        description: "Leverage AI for code generation and refactoring.",
        sections: [
            { id: "gen", title: "Code Generation", content: "Generating code from prompts." },
            { id: "explain", title: "AI Explainer", content: "Understand complex logic instantly." }
        ]
    },
    "real-time-sync": {
        id: "real-time-sync",
        title: "Real-Time Sync",
        category: "Features",
        description: "Synchronize code effortlessly.",
        sections: [
            { id: "git", title: "GitHub Sync", content: "Bi-directional sync with Git." },
            { id: "local", title: "Local Sync", content: "Keep local files in sync with the cloud." }
        ]
    },
    "security-quality": {
        id: "security-quality",
        title: "Security & Quality",
        category: "Features",
        description: "Ship secure, high-quality code.",
        sections: [
            { id: "scans", title: "Security Scans", content: "Automated vulnerability detection." },
            { id: "lint", title: "Linting", content: "Maintain consistent code style." }
        ]
    },
    "task-management": {
        id: "task-management",
        title: "Task Management",
        category: "Features",
        description: "Organize your developer workflow.",
        sections: [
            { id: "kanban", title: "Kanban Boards", content: "Track tasks visually." },
            { id: "milestones", title: "Milestones", content: "Set key project goals." }
        ]
    },
    "storage-projects": {
        id: "storage-projects",
        title: "Storage & Projects",
        category: "Features",
        description: "Manage assets and multi-project setups.",
        sections: [
            { id: "assets", title: "Asset Management", content: "Upload and optimize media." },
            { id: "orgs", title: "Organizations", content: "Group projects by team." }
        ]
    },
    "web-dev": {
        id: "web-dev",
        title: "Web Development",
        category: "Development",
        description: "Build responsive web applications.",
        sections: [
            { id: "frameworks", title: "Supported Frameworks", content: "Next.js, Vite, and more." },
            { id: "components", title: "Component Library", content: "A library of pre-built UI pieces." }
        ]
    },
    "mobile-dev": {
        id: "mobile-dev",
        title: "Mobile Development",
        category: "Development",
        description: "Native apps with React Native.",
        sections: [
            { id: "expo", title: "Expo Integration", content: "Fast mobile development." },
            { id: "native", title: "Native Modules", content: "Accessing device hardware." }
        ]
    },
    "backend-apis": {
        id: "backend-apis",
        title: "Backend & APIs",
        category: "Development",
        description: "Robust server-side logic.",
        sections: [
            { id: "endpoints", title: "API Endpoints", content: "REST and GraphQL support." },
            { id: "databases", title: "Database Connectors", content: "SQL and NoSQL integration." }
        ]
    },
    "full-stack": {
        id: "full-stack",
        title: "Full-Stack Projects",
        category: "Development",
        description: "End-to-end development.",
        sections: [
            { id: "sync", title: "Data Syncing", content: "Keep frontend and backend in sync." },
            { id: "auth", title: "Authentication", content: "Pre-built auth flows." }
        ]
    },
    "github": {
        id: "github",
        title: "GitHub",
        category: "Integrations",
        description: "Source control and more.",
        sections: [
            { id: "repo", title: "Repo Linking", content: "Connect your repositories." },
            { id: "actions", title: "GitHub Actions", content: "Workflow automation." }
        ]
    },
    "vercel": {
        id: "vercel",
        title: "Vercel",
        category: "Integrations",
        description: "Hosting and deployments.",
        sections: [
            { id: "edge", title: "Edge Network", content: "Performance at the edge." },
            { id: "domains", title: "Custom Domains", content: "Connect your branding." }
        ]
    },
    "expo-eas": {
        id: "expo-eas",
        title: "Expo/EAS",
        category: "Integrations",
        description: "Mobile app services.",
        sections: [
            { id: "ota", title: "OTA Updates", content: "Push updates instantly." },
            { id: "builds", title: "Cloud Builds", content: "Build apps in the cloud." }
        ]
    },
    "railway": {
        id: "railway",
        title: "Railway",
        category: "Integrations",
        description: "Infra management.",
        sections: [
            { id: "db", title: "Database Hosting", content: "Scalable databases." },
            { id: "envs", title: "Environments", content: "Prod and Staging setups." }
        ]
    },
    "other-tools": {
        id: "other-tools",
        title: "Other Tools",
        category: "Integrations",
        description: "Connect your toolkit.",
        sections: [
            { id: "slack", title: "Slack", content: "Project notifications." },
            { id: "linear", title: "Linear", content: "Task syncing." }
        ]
    },
    "pricing": {
        id: "pricing",
        title: "Plans & Pricing",
        category: "Account & Billing",
        description: "Choose the right plan for you.",
        sections: [
            { id: "tiers", title: "Plan Tiers", content: "Builder vs Startup vs Enterprise." },
            { id: "addons", title: "Add-ons", content: "Extra storage and AI compute." }
        ]
    },
    "team": {
        id: "team",
        title: "Team Management",
        category: "Account & Billing",
        description: "Manage your team.",
        sections: [
            { id: "roles", title: "Roles & Permissions", content: "Who can do what." },
            { id: "seats", title: "Seat Management", content: "Invite and remove members." }
        ]
    },
    "billing": {
        id: "billing",
        title: "Billing & Invoices",
        category: "Account & Billing",
        description: "Manage your payments.",
        sections: [
            { id: "methods", title: "Payment Methods", content: "Credit cards and more." },
            { id: "history", title: "Invoice History", content: "Download your past bills." }
        ]
    },
    "usage": {
        id: "usage",
        title: "Usage & Limits",
        category: "Account & Billing",
        description: "Monitor your account.",
        sections: [
            { id: "quotas", title: "Resource Quotas", content: "AI and storage limits." },
            { id: "alerts", title: "Usage Alerts", content: "Get notified before limits." }
        ]
    },
    "api-ref": {
        id: "api-ref",
        title: "API Reference",
        category: "Resources",
        description: "Technical specs for devs.",
        sections: [
            { id: "rest", title: "REST API", content: "Endpoint documentation." },
            { id: "sdk", title: "Client SDKs", content: "Libraries for your apps." }
        ]
    },
    "tutorials": {
        id: "tutorials",
        title: "Tutorials",
        category: "Resources",
        description: "Learn XStudio fast.",
        sections: [
            { id: "videos", title: "Video Tutorials", content: "Watch and learn." },
            { id: "guides", title: "Walkthroughs", content: "Step-by-step guides." }
        ]
    },
    "best-practices": {
        id: "best-practices",
        title: "Best Practices",
        category: "Resources",
        description: "Build like a pro.",
        sections: [
            { id: "perf", title: "Performance", content: "Optimize your apps." },
            { id: "ux", title: "User Experience", content: "Design for humans." }
        ]
    },
    "faqs": {
        id: "faqs",
        title: "FAQs",
        category: "Resources",
        description: "Quick answers.",
        sections: [
            { id: "general", title: "General Questions", content: "Top platform questions." },
            { id: "tech", title: "Technical Support", content: "Common dev issues." }
        ]
    }
};

export default function DocsPage() {
    const [activePageId, setActivePageId] = useState("welcome");
    const [activeSection, setActiveSection] = useState("");
    const [categories, setCategories] = useState(navCategories);

    const currentPage = docContent[activePageId] || docContent["welcome"];

    const toggleCategory = (idx: number) => {
        setCategories(prev => prev.map((cat, i) =>
            i === idx ? { ...cat, isOpen: !cat.isOpen } : cat
        ));
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0% -70% 0%' }
        );

        currentPage.sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [activePageId, currentPage.sections]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 120,
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    const handlePageChange = (id: string) => {
        setActivePageId(id);
        setActiveSection("");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Sidebar */}
                <aside className={styles.sidebarLeft}>
                    {categories.map((cat, idx) => (
                        <div key={idx} className={styles.category}>
                            <div
                                className={clsx(styles.categoryHeader, !cat.isOpen && styles.categoryHeaderRotated)}
                                onClick={() => toggleCategory(idx)}
                            >
                                {cat.name}
                                <ChevronDown size={14} />
                            </div>
                            <ul className={clsx(styles.categoryList, !cat.isOpen && styles.categoryListCollapsed)}>
                                {cat.items.map((item, iIdx) => (
                                    <li key={iIdx}>
                                        <button
                                            onClick={() => handlePageChange(item.id)}
                                            className={clsx(styles.navItem, activePageId === item.id && styles.navItemActive)}
                                            style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </aside>

                {/* Main Content */}
                <main className={styles.contentArea}>
                    <div className={styles.breadcrumbs}>
                        <span>{currentPage.category}</span>
                        <span className={styles.breadcrumbSeparator}>›</span>
                        <span>{currentPage.title}</span>
                    </div>

                    <h1 className={styles.title}>{currentPage.title}</h1>
                    <p className={styles.paragraph} style={{ fontSize: '1.25rem', marginBottom: '3rem' }}>{currentPage.description}</p>

                    {currentPage.sections.map((section) => (
                        <div key={section.id} id={section.id} className={styles.contentSection}>
                            <h2 className={styles.sectionHeading}>{section.title}</h2>
                            <p className={styles.paragraph}>{section.content}</p>
                            <p className={styles.paragraph}>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.
                            </p>
                        </div>
                    ))}
                </main>

                {/* Right Sidebar */}
                <aside className={styles.sidebarRight}>
                    <h3 className={styles.tocTitle}>On this page</h3>
                    <ul className={styles.tocList}>
                        {currentPage.sections.map((section) => (
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
