"use client";
import React, { useState, useEffect } from "react";
import Reveal from "./Reveal";
import Image from "next/image";
import profile from "../public/assets/profile.jpg"

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    if (modalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // disable scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  return (
    <section id="about" className="py-section-gap-md lg:py-section-gap-lg px-gutter max-w-container-max mx-auto bg-surface-container-lowest dark:bg-surface-container-lowest/50 rounded-[40px] my-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Headshot with micro-animations */}
        <Reveal direction="right" delay={200} className="relative flex justify-center">
          <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 rounded-[40px] transform -rotate-3 scale-105 select-none pointer-events-none"></div>
          <div className="absolute inset-0 bg-primary-fixed/20 dark:bg-primary-fixed-dim/5 rounded-[40px] transform rotate-3 scale-102 select-none pointer-events-none"></div>

          <div className="relative group overflow-hidden rounded-[32px] max-w-[400px] shadow-2xl">
            <Image
              src={profile}
              alt="A professional headshot of Babatunde Omojuwa, Frontend Engineer & UI Architect"
              className="w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              width={300}
              height={200}
              priority
            />
            {/* Soft overlay on hover */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </Reveal>

        {/* Right Column: Copy & Details */}
        <div className="space-y-6 text-left">
          <Reveal delay={150}>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile lg:font-headline-lg lg:text-headline-lg text-on-surface dark:text-white leading-tight">
              Engineering Experiences,<br />
              <span className="text-primary dark:text-primary-fixed-dim">Not Just Interfaces</span>
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <div className="space-y-4 font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80">
              <p>
                Based in Lagos, working globally. I believe the best products are born from the intersection of functional complexity and visual simplicity.
              </p>
              <p>
                With 3+ years of experience in the frontend landscape, I've had the privilege of working with startups and established enterprises to transform ambiguous ideas into high-performing digital realities.
              </p>
              <p>
                My approach is grounded in <strong className="text-primary dark:text-primary-fixed">semantic HTML, CSS architecture, and type-safe JavaScript</strong>. I don't just build components; I build systems that scale and empower users of all abilities.
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 text-primary dark:text-primary-fixed font-label-md text-label-md hover:gap-3 transition-all pt-4 font-bold border-b border-transparent hover:border-primary pb-0.5"
            >
              Read Full Story
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </Reveal>
        </div>
      </div>

      {/* Biography Modal Overlay */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white  dark:bg-[#121824] custom-scrollbar scroll-none rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-10 shadow-2xl relative border border-outline-variant/15 dark:border-outline-variant/5 text-left transform scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full flex items-center justify-center bg-surface-variant/50 hover:bg-surface-variant text-on-surface transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-primary dark:text-primary-fixed font-bold uppercase tracking-wider text-[11px]">
                  My Journey
                </span>
                <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">
                  Babatunde Omojuwa
                </h3>
                <p className="text-on-surface-variant/75 dark:text-on-surface-variant/50 text-sm mt-0.5">
                  Frontend Engineer since 2023
                </p>
              </div>

              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 border-t border-outline-variant/10 pt-6">
                <p>
                  I started my development career with a strong focus on graphic design and wordpress development. Over time, that visual intuition translated naturally into web code, driving me to specialize in frontend architecture.
                </p>
                <p>
                  Throughout my career, I've focused on writing highly optimized code that complies with the latest WCAG accessibility standards. I believe accessibility isn't a feature; it's a foundation. Every line of markup and CSS is designed to scale across screen sizes, assistive technologies, and latency limits.
                </p>
                <p>
                  I work closely with product managers and product designers, acting as the translation layer between design visual mock-ups and engineering realities. I thrive in environments that value high performance, type-safe structures, clean state management, and detailed animations.
                </p>
                <p>I was part of the winning team that developed an innovative speech correction application at The Inventors Community Bootcamp in 2025.</p>
                <p>
                  Outside of code, I actively mentor junior engineers, and explore the latest advances in tech.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-surface-container-low dark:bg-surface-container-lowest/50 p-6 rounded-2xl border border-outline-variant/10">
                <div>
                  <h4 className="font-bold text-on-surface dark:text-white text-sm">Core Values</h4>
                  <ul className="text-xs text-on-surface-variant mt-2 space-y-1.5 list-disc list-inside">
                    <li>Semantic markup & WCAG alignment</li>
                    <li>Performance-first build architectures</li>
                    <li>Clear, documented component code</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface dark:text-white text-sm">Contact Info</h4>
                  <ul className="text-xs text-on-surface-variant mt-2 space-y-1.5">
                    <li>📍 Lagos, Nigeria / Remote</li>
                    <li>📧 omojuwababatunde1@gmail.com</li>
                    <li>💼 Open to Fulltime & Consulting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
