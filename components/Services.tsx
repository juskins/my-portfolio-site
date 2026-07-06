"use client";
import React from "react";
import Reveal from "./Reveal";

interface Service {
  title: string;
  icon: string;
  description: string;
}

export default function Services() {
  const servicesList: Service[] = [
    {
      title: "UI Implementation",
      icon: "web",
      description: "Translating complex Figma designs into clean, modular, and fully responsive React and Next.js components.",
    },
    {
      title: "Perf Optimization",
      icon: "bolt",
      description: "Auditing application code, fixing rendering bottlenecks, and ensuring instant load times on mobile devices.",
    },
    {
      title: "A11y Audits",
      icon: "accessibility",
      description: "Auditing structures and implementing key keyboard controls, aria labels, and semantic mappings for WCAG guidelines.",
    },
    {
      title: "SEO & Web Vitals",
      icon: "search",
      description: "Structuring HTML semantic elements for indexing, schema mappings, and passing Core Web Vitals checks.",
    },
  ];

  return (
    <section id="services" className="py-section-gap-md lg:py-section-gap-lg px-gutter max-w-container-max mx-auto text-center">
      <Reveal delay={100}>
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-4">
            How I Can Help You
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80">
            Comprehensive frontend engineering services customized to power your product's performance and design.
          </p>
        </div>
      </Reveal>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesList.map((service, idx) => (
          <Reveal
            key={service.title}
            delay={idx * 150}
            className="group bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline-variant/10 rounded-3xl p-8 text-left hover:-translate-y-2.5 hover:shadow-2xl dark:hover:border-primary/40 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Animated Icon Wrapper */}
              <div className="w-12 h-12 bg-primary-fixed dark:bg-surface-container-high rounded-2xl flex items-center justify-center text-primary dark:text-primary-fixed-dim mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
                <span className="material-symbols-outlined text-2xl">{service.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-3 text-lg group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">
                {service.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-outline-variant/5">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-primary-fixed hover:gap-2.5 transition-all"
              >
                Inquire Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
