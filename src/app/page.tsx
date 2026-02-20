"use client";

import { useEffect } from 'react';
import { Hero } from "@/components/hero/Hero";
import { FeatureSection } from "@/components/home/FeatureSection";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { ChangelogSection } from "@/components/home/ChangelogSection";
import { ContactSection } from "@/components/home/ContactSection";

const sections = [
  { id: 'hero' },
  { id: 'features' },
  { id: 'showcase' },
  { id: 'changelog' },
  { id: 'contact' }
];

export default function Home() {
  useEffect(() => {
    // Force scroll to top on refresh/mount
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Update hash without triggering scroll or page jump
            // Using replaceState to avoid cluttering history
            if (id === 'hero') {
              window.history.replaceState(null, '', window.location.pathname);
            } else {
              window.history.replaceState(null, '', `#${id}`);
            }
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    // Handle initial hash on mount
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          window.scrollTo({
            top: el.offsetTop - 100,
            behavior: 'smooth'
          });
        }, 100);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <div id="hero"><Hero /></div>
      <div id="features"><FeatureSection /></div>
      <div id="showcase"><ShowcaseSection /></div>
      <div id="changelog"><ChangelogSection /></div>
      <div id="contact"><ContactSection /></div>
    </main>
  );
}
