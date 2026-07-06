"use client";
import React, { useState } from "react";
import Reveal from "./Reveal";

interface TechItem {
  name: string;
  icon: string;
  level: string;
  description: string;
  category: "all" | "core" | "tools" | "architecture";
  percentage: number;
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<"all" | "core" | "tools" | "architecture">("all");

  const techItems: TechItem[] = [
    {
      name: "React / Next.js",
      icon: "code",
      level: "Expert",
      description: "App Router, SSR/SSG compilation, state patterns",
      category: "core",
      percentage: 95,
    },
    {
      name: "TypeScript",
      icon: "javascript",
      level: "Expert",
      description: "Generic typings, advanced utility models, safety",
      category: "core",
      percentage: 92,
    },
    {
      name: "Tailwind CSS",
      icon: "css",
      level: "Expert",
      description: "CSS Architecture, fluid spacing, custom theme tokens",
      category: "core",
      percentage: 98,
    },
    {
      name: "React Native",
      icon: "smartphone",
      level: "Proficient",
      description: "Cross-platform mobile interfaces, native bridges",
      category: "core",
      percentage: 80,
    },
    {
      name: "Performance Audit",
      icon: "speed",
      level: "Expert",
      description: "Lighthouse optimization, code splitting, layout shifts",
      category: "architecture",
      percentage: 94,
    },
    {
      name: "Accessibility (A11y)",
      icon: "accessibility_new",
      level: "Expert",
      description: "WCAG 2.1 compliance, aria-roles, semantic structures",
      category: "architecture",
      percentage: 96,
    },
    {
      name: "GraphQL / Node.js",
      icon: "settings",
      level: "Proficient",
      description: "Apollo integration, REST routing, custom middleware",
      category: "tools",
      percentage: 78,
    },
    {
      name: "Testing (Jest / Storybook)",
      icon: "checklist",
      level: "Proficient",
      description: "Visual regression testing, components unit mapping",
      category: "tools",
      percentage: 85,
    },
    {
      name: "Database (PostgreSQL)",
      icon: "database",
      level: "Proficient",
      description: "Query writing, database schema design, index binding",
      category: "tools",
      percentage: 70,
    },
  ];

  const filteredItems = techItems.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  return (
    <section id="tech" className="py-section-gap-md lg:py-section-gap-lg px-gutter max-w-container-max mx-auto text-center">
      <Reveal delay={100}>
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-4">
            Tech Stack &amp; Expertise
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80">
            The modern tools, languages, and core principles I utilize to deliver robust, high-performance web products.
          </p>
        </div>
      </Reveal>

      {/* Tabs Selector */}
      <Reveal delay={200}>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(["all", "core", "tools", "architecture"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-label-md font-semibold transition-all duration-300 ${activeTab === tab
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-surface-container-low dark:bg-surface-container text-on-surface-variant hover:bg-surface-variant/60 dark:hover:bg-surface-container-high"
                }`}
            >
              {tab === "all"
                ? "All Technologies"
                : tab === "core"
                  ? "Languages & Frameworks"
                  : tab === "tools"
                    ? "APIs & Databases"
                    : "Performance & A11y"}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grid of Tech Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredItems.map((item, idx) => (
          <Reveal
            key={item.name}
            delay={idx * 100}
            className="group bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline-variant/10 rounded-3xl p-6 hover:shadow-xl dark:hover:border-primary/40 hover:border-primary/20 transition-all duration-300 text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-4xl text-primary dark:text-primary-fixed-dim">
                  {item.icon}
                </span>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed dark:bg-surface-container-high dark:text-primary-fixed-dim">
                  {item.level}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-2 text-lg">
                {item.name}
              </h3>
              <p className="text-sm text-on-surface-variant dark:text-on-surface-variant/80 min-h-[40px] leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* Visual Mastery Meter */}
            <div className="space-y-1.5 mt-auto pt-2 border-t border-outline-variant/10">
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant/70">
                <span>Mastery</span>
                <span>{item.percentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary dark:bg-primary-fixed-dim rounded-full transition-all duration-1000 ease-out group-hover:scale-x-102 origin-left"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
