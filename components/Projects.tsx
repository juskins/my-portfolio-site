"use client";
import React, { useState, useEffect } from "react";
import Reveal from "./Reveal";

interface Project {
  id: string;
  title: string;
  category: "saas" | "ecommerce" | "fintech" | "other";
  tags: string[];
  description: string;
  image: string;
  metricIcon: string;
  metricText: string;
  // Case Study Details
  challenge: string;
  solution: string;
  outcome: string;
  role: string;
  duration: string;
  liveUrl?: string;
  githubUrl?: string;
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "saas" | "ecommerce" | "fintech" | "other">("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    if (activeProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeProject]);

  const projectsData: Project[] = [
    {
      id: "expireminder",
      title: "Expireminder App",
      category: "ecommerce",
      tags: ["Next.js", "Tailwind CSS", "ecommerce"],
      description: "An inventory-type of web app for monitoring products shelf life or expiration by providing timely SMS alerts and email notifications for users",
      image: "/assets/expireminder.png",
      metricIcon: "speed",
      metricText: "Increased Real-time tracking by 200%",
      role: "Lead Frontend Architect",
      duration: "3 Months",
      challenge: "Users complained about not been able to monitor the expiry of their products due to the delay in the update of the database. This caused users to lose track of their product expiration dates.",
      solution: "I re-architected the database schema and implemented a real-time update system using polling to push updates to the client immediately. This eliminated the delay in data synchronization and allowed users to monitor their product expiration dates in real-time.",
      outcome: "Achieved 200% improvement in real-time tracking & notifications. Users can now monitor their product shelf life and receive timely SMS alerts and email notifications for expirations.",
      liveUrl: "https://expireminder.netlify.app/",
      githubUrl: "https://github.com/juskins/xpiReminder",
    },
    {
      id: "talkbeta",
      title: "TalkBeta App",
      category: "saas",
      tags: ["Next.js", "Performance", "hackathon winner"],
      description: "A speech improvement app that helps you practice and improve your speaking skills.",
      image: "/assets/talkbeta.png",
      metricIcon: "verified",
      metricText: "Achieved 99 Lighthouse Performance Score",
      role: "Frontend Engineer",
      duration: "1 month",
      challenge: "Users complained about not been able to practice and improve their speaking skills due to the lack of a user-friendly interface for speech practice and improvement, with a focus on performance and accessibility.",
      solution: "I re-designed the user interface to be more user-friendly and intuitive.",
      outcome: "Achieved 99 Lighthouse Performance Score. Conversion rate increased by 22% in the first quarter post-launch.",
      liveUrl: "https://talkbeta.netlify.app/",
      githubUrl: "https://github.com/InventorsDev/Team-Epsilon-Enforcers-Frontend",
    },
    {
      id: "ip_address_tracker",
      title: "IP Address Tracker",
      category: "other",
      tags: ["Mobile-First", "A11y", "geolocation", "api"],
      description: "An app that allows users to search for and locate IP addresses or domain names across the world",
      image: "/assets/ip_address_tracker.png",
      metricIcon: "map",
      metricText: "Servicing 100k+ monthly active users",
      role: "Frontend Engineer",
      duration: "1 week",
      challenge: "I was tasked with building a responsive and user-friendly IP address tracker that could display the IP address of the user and also display the location of the IP address.",
      solution: "I built a responsive and user-friendly IP address tracker that could display the IP address of the user and also display the location of the IP address.",
      outcome: "Built and launched a production-ready IP address tracker.",
      liveUrl: "https://juskins-ip-address-tracker.netlify.app/",
      githubUrl: "https://github.com/juskins/ip-address-tracker-demo",
    },
  ];

  const filteredProjects = projectsData.filter(
    (proj) => filter === "all" || proj.category === filter
  );

  return (
    <section id="projects" className="py-section-gap-md lg:py-section-gap-lg px-gutter max-w-container-max mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <Reveal delay={100} className="max-w-2xl text-left">
          <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-4">
            My Works
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80">
            A glimpse into some of the complex engineering and UI problems I've solved.
          </p>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal delay={200}>
          <div className="flex gap-2 bg-surface-container-low dark:bg-surface-container p-1.5 rounded-full border border-outline-variant/20">
            {(["all", "saas", "ecommerce", "other"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full font-semibold text-xs capitalize transition-all duration-300 ${filter === cat
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary dark:text-on-surface-variant/80"
                  }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <Reveal
            key={project.id}
            delay={idx * 150}
            className="group bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline-variant/10 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer text-left"
          >
            {/* Card Image Container */}
            <div
              className="h-64 bg-surface-container-low overflow-hidden relative"
              onClick={() => setActiveProject(project)}
            >
              <img
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={project.image}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white/90 text-primary px-4 py-2 rounded-full font-bold text-xs shadow-md">
                  View Case Study
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-8 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-fixed text-on-primary-fixed dark:bg-surface-container-high dark:text-primary-fixed-dim font-label-md text-[12px] rounded-full font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  className="font-headline-md text-headline-md text-on-surface dark:text-white mb-2 group-hover:text-primary transition-colors"
                  onClick={() => setActiveProject(project)}
                >
                  {project.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Key Metric Panel */}
              <div className="space-y-4 mt-auto">
                <div className="bg-surface-container dark:bg-surface-container-low p-4 rounded-2xl flex items-start gap-3 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-xl">
                    {project.metricIcon}
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant/90 leading-snug">
                    {project.metricText}
                  </span>
                </div>

                <button
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center gap-2 text-primary dark:text-primary-fixed font-label-md text-label-md hover:gap-3 transition-all font-bold"
                >
                  View Case Study
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Case Study Detailed Overlay Drawer Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-end p-0 md:p-4 transition-opacity duration-300"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-white dark:bg-[#121824] w-full max-w-2xl h-full md:h-[95vh] md:rounded-3xl shadow-2xl p-6 md:p-10 overflow-y-auto relative border-l border-outline-variant/10 text-left transform translate-x-0 transition-transform duration-500 ease-out flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4 mb-6">
                <div>
                  <span className="text-primary dark:text-primary-fixed font-bold uppercase tracking-wider text-[11px]">
                    Case Study Deep-Dive
                  </span>
                  <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-variant/50 hover:bg-surface-variant text-on-surface transition-colors"
                  aria-label="Close Case Study"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden h-56 mb-8 border border-outline-variant/10 select-none">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 bg-surface-container-low dark:bg-surface-container-lowest/50 p-4 rounded-2xl border border-outline-variant/10 mb-8">
                <div>
                  <div className="text-[10px] text-on-surface-variant/70 font-bold uppercase">Role</div>
                  <div className="text-xs font-bold text-on-surface dark:text-white mt-0.5">{activeProject.role}</div>
                </div>
                <div>
                  <div className="text-[10px] text-on-surface-variant/70 font-bold uppercase">Duration</div>
                  <div className="text-xs font-bold text-on-surface dark:text-white mt-0.5">{activeProject.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] text-on-surface-variant/70 font-bold uppercase">Category</div>
                  <div className="text-xs font-bold text-on-surface dark:text-white mt-0.5 capitalize">{activeProject.category}</div>
                </div>
              </div>

              {/* Details sections */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-on-surface dark:text-white text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">report_problem</span>
                    The Challenge
                  </h4>
                  <p className="text-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-2 leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-on-surface dark:text-white text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#10b981] text-xl">insights</span>
                    The Solution
                  </h4>
                  <p className="text-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-2 leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>

                <div className="border-t border-outline-variant/10 pt-6">
                  <h4 className="font-bold text-on-surface dark:text-white text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">done_all</span>
                    Key Outcome &amp; Impact
                  </h4>
                  <p className="text-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-2 leading-relaxed">
                    {activeProject.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-8 border-t border-outline-variant/10 mt-8">
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-3 rounded-full hover:bg-primary-container text-center transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                Live Demo
              </a>
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-surface text-on-surface font-label-md text-label-md py-3 border border-outline-variant rounded-full hover:bg-surface-variant text-center transition-colors dark:bg-surface-container dark:text-on-surface dark:border-outline flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Source Code
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
