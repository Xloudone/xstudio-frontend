"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck, Layout, Server, Trash2, User, Code2 } from "lucide-react";
import styles from "./ShowcaseSection.module.css";

// ─── Agent definitions ───────────────────────────────────────────────────────
const AGENTS = [
    {
        id: "frontend",
        name: "Frontend Agent",
        statuses: [
            "Editing components/HeroSection.tsx",
            "Searching styles/theme.ts",
            "Writing NavBar.tsx",
        ],
        icon: <Layout size={20} color="#a78bfa" />,
        bgColor: "rgba(167, 139, 250, 0.12)",
        ringColor: "#a78bfa",
    },
    {
        id: "security",
        name: "Security Agent",
        statuses: [
            "Scanning middleware/auth.ts",
            "Searching .env for leaks",
            "Editing CORS config",
        ],
        icon: <ShieldCheck size={20} color="#f59e0b" />,
        bgColor: "rgba(245, 158, 11, 0.12)",
        ringColor: "#f59e0b",
    },
    {
        id: "backend",
        name: "Backend Agent",
        statuses: [
            "Editing api/routes/users.ts",
            "Searching db/schema.sql",
            "Writing migrations/v2.sql",
        ],
        icon: <Server size={20} color="#3b82f6" />,
        bgColor: "rgba(59, 130, 246, 0.12)",
        ringColor: "#3b82f6",
    },
    {
        id: "cleanup",
        name: "Cleanup Agent",
        statuses: [
            "Scanning utils/helpers.ts",
            "Searching for dead imports",
            "Editing index.ts",
        ],
        icon: <Trash2 size={20} color="#10b981" />,
        bgColor: "rgba(16, 185, 129, 0.12)",
        ringColor: "#10b981",
    },
];

const TASK = {
    title: "Launch V2 Dashboard",
    description: "Rebuild dashboard with new design system and secure all API routes.",
    due: "Due Mar 10",
};

// ─── Collab feed (humans + AI) ───────────────────────────────────────────────
const COLLAB_FEED = [
    { id: 1, sender: "Jordan", handle: "@jordan", time: "9:01 AM", text: "Hey team, kicking off the V2 sprint today.", icon: <User size={15} color="#c4b5fd" />, isAi: false, initials: "JO" },
    { id: 2, sender: "Frontend Agent", handle: null, time: "9:02 AM", text: "Drafting the Hero & nav components now...", icon: <Layout size={15} color="#a78bfa" />, isAi: true, initials: null },
    { id: 3, sender: "Security Agent", handle: null, time: "9:02 AM", text: "Auditing auth middleware for vulnerabilities.", icon: <ShieldCheck size={15} color="#f59e0b" />, isAi: true, initials: null },
    { id: 4, sender: "Marcus", handle: "@marcus", time: "9:05 AM", text: "Backend schema looks good — approved the PR.", icon: <User size={15} color="#93c5fd" />, isAi: false, initials: "MA" },
    { id: 5, sender: "Backend Agent", handle: null, time: "9:05 AM", text: "Setting up REST endpoints & DB migrations.", icon: <Server size={15} color="#3b82f6" />, isAi: true, initials: null },
    { id: 6, sender: "You", handle: "@you", time: "9:08 AM", text: "Looks great. Can cleanup agent run now?", icon: <User size={15} color="#fff" />, isAi: false, initials: "YO" },
    { id: 7, sender: "Cleanup Agent", handle: null, time: "9:08 AM", text: "Removing dead code and fixing lint errors. ✅", icon: <Trash2 size={15} color="#10b981" />, isAi: true, initials: null },
    { id: 8, sender: "Sofia", handle: "@sofia", time: "9:11 AM", text: "Quick review done — left 2 comments on /api.", icon: <User size={15} color="#f9a8d4" />, isAi: false, initials: "SO" },
    { id: 9, sender: "Frontend Agent", handle: null, time: "9:12 AM", text: "PR ready for review — 4 files changed.", icon: <Layout size={15} color="#a78bfa" />, isAi: true, initials: null },
    { id: 10, sender: "You", handle: "@you", time: "9:14 AM", text: "Merging. Deploying to production. 🚀", icon: <User size={15} color="#fff" />, isAi: false, initials: "YO" },
];

// ─── Unique spin speeds per agent ────────────────────────────────────────────
const SPIN_DURATIONS = [2.1, 3.4, 1.7, 2.9];

// ─── Work timer ──────────────────────────────────────────────────────────────
function AgentWorkTimer({ startedAt }: { startedAt: number }) {
    const [elapsed, setElapsed] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startedAt) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [startedAt]);
    const mins = String(Math.floor(elapsed / 60)).padStart(1, "0");
    const secs = String(elapsed % 60).padStart(2, "0");
    return <span className={styles.workTimer}>{mins}:{secs}</span>;
}

// ─── Cycling status text per agent ───────────────────────────────────────────
function AgentStatus({ statuses, agentId }: { statuses: string[]; agentId: string }) {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        // Offset start per agent so they feel independent
        const offset = agentId.length * 300;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setIdx((i) => (i + 1) % statuses.length);
            }, 2800);
            return () => clearInterval(interval);
        }, offset);
        return () => clearTimeout(timer);
    }, [agentId, statuses.length]);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={idx}
                className={styles.agentStatus}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
            >
                {statuses[idx]}
            </motion.span>
        </AnimatePresence>
    );
}

// ─── Agent Panel (left container) ────────────────────────────────────────────
function AgentPanel() {
    const [visibleCount, setVisibleCount] = useState(1);
    const [generation, setGeneration] = useState(0);
    const [startTimes, setStartTimes] = useState<Record<string, number>>({
        [AGENTS[0].id]: Date.now(),
    });

    useEffect(() => {
        if (visibleCount >= AGENTS.length) {
            const reset = setTimeout(() => {
                setGeneration((g) => g + 1);
                setVisibleCount(0);
                setStartTimes({});
            }, 4500);
            return () => clearTimeout(reset);
        }
        if (visibleCount === 0) {
            const next = setTimeout(() => {
                setStartTimes({ [AGENTS[0].id]: Date.now() });
                setVisibleCount(1);
            }, 700);
            return () => clearTimeout(next);
        }
        const timer = setTimeout(() => {
            const nextAgent = AGENTS[visibleCount];
            setStartTimes((prev) => ({ ...prev, [nextAgent.id]: Date.now() }));
            setVisibleCount((c) => c + 1);
        }, 1600);
        return () => clearTimeout(timer);
    }, [visibleCount]);

    return (
        <div className={styles.agentPanel}>
            {/* Task Header */}
            <div className={styles.taskHeader}>
                <div className={styles.taskMeta}>
                    <span className={styles.taskTag}>Task</span>
                    <span className={styles.taskDue}>{TASK.due}</span>
                </div>
                <p className={styles.taskTitle}>{TASK.title}</p>
                <p className={styles.taskDesc}>{TASK.description}</p>
            </div>

            {/* Agent Stack */}
            <div className={styles.agentStack}>
                <AnimatePresence>
                    {AGENTS.slice(0, visibleCount).map((agent, index) => (
                        <motion.div
                            key={`${agent.id}-${generation}`}
                            className={styles.agentCard}
                            style={{ top: index * 72 }}
                            initial={{ x: 80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className={styles.agentAvatar} style={{ background: agent.bgColor }}>
                                {agent.icon}
                                <motion.div
                                    className={styles.agentRing}
                                    style={{ borderTopColor: agent.ringColor }}
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: SPIN_DURATIONS[index],
                                        ease: "linear",
                                    }}
                                />
                            </div>
                            <div className={styles.agentInfo}>
                                <h3 className={styles.agentName}>{agent.name}</h3>
                                <AgentStatus statuses={agent.statuses} agentId={agent.id} />
                            </div>
                            <div className={styles.switchWrapper}>
                                <div className={styles.switch}>
                                    <motion.div
                                        className={styles.switchKnob}
                                        layout
                                        animate={{ x: 18 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                </div>
                                {startTimes[agent.id] && (
                                    <AgentWorkTimer startedAt={startTimes[agent.id]} />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function ShowcaseSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Side */}
                <div className={styles.leftSide}>
                    <motion.h2
                        className={styles.heading}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Your Team, Amplified
                    </motion.h2>
                    <motion.div
                        className={styles.leftContainer}
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <AgentPanel />
                    </motion.div>
                </div>

                {/* Right Side */}
                <div className={styles.rightSide}>
                    <motion.p
                        className={styles.subtext}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Assign tasks to teammates or AI agents that work asynchronously. Code continues while you sleep. Context never gets lost. Your team stays in perfect sync.
                    </motion.p>
                    <motion.div
                        className={styles.rightImageContainer}
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className={styles.feedContainer}>
                            <motion.div
                                className={styles.feedTrack}
                                animate={{ y: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                            >
                                {[...COLLAB_FEED, ...COLLAB_FEED].map((item, i) => (
                                    <div key={`${item.id}-${i}`} className={styles.feedItem}>
                                        <div
                                            className={styles.feedAvatar}
                                            style={{
                                                background: item.isAi
                                                    ? "rgba(255,255,255,0.05)"
                                                    : "rgba(255,255,255,0.1)",
                                            }}
                                        >
                                            {item.isAi ? (
                                                item.icon
                                            ) : (
                                                <span className={styles.feedInitials}>{item.initials}</span>
                                            )}
                                        </div>
                                        <div className={styles.feedContent}>
                                            <div className={styles.feedMeta}>
                                                <p className={styles.feedSender}>{item.sender}</p>
                                                {item.handle && (
                                                    <span className={styles.feedHandle}>{item.handle}</span>
                                                )}
                                                {item.isAi && (
                                                    <span className={styles.feedAiBadge}>AI</span>
                                                )}
                                                <span className={styles.feedTime}>{item.time}</span>
                                            </div>
                                            <p className={styles.feedText}>{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
