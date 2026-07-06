"use client";
import React from "react";
import Reveal from "./Reveal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest dark:bg-[#0d121f] w-full pt-20 pb-12 px-gutter border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16 text-left">
        {/* Left Column: Logo & Socials */}
        <Reveal delay={100} className="flex flex-col items-start gap-6">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                code
              </span>
            </div>
            <span className="font-bold text-headline-md text-on-surface dark:text-white">
              Babatunde Omojuwa
            </span>
          </a>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 max-w-xs leading-relaxed">
            Building high-performance, accessible, and beautiful web experiences with a focus on Frontend Engineering &amp; UI Architecture.
          </p>

          {/* Social Profiles Linked */}
          <div className="flex gap-4 items-center">
            {/* GitHub */}
            <a
              href="http://www.github.com/juskins"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary-fixed-dim hover:scale-110 transition-all duration-300"
              title="GitHub"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="http://www.linkedin.com/in/babatunde-omojuwa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary-fixed-dim hover:scale-110 transition-all duration-300"
              title="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/tunde012"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary-fixed-dim hover:scale-110 transition-all duration-300"
              title="X (Twitter)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://web.facebook.com/babatunde.kola.77"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary-fixed-dim hover:scale-110 transition-all duration-300"
              title="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.684l.564-3H13V6c0-.5.2-.8.8-.8H16V1h-3.8c-3.1 0-4.2 1.6-4.2 3.8V8z" />
              </svg>
            </a>
          </div>
        </Reveal>

        {/* Middle Column: Navigation */}
        <Reveal delay={200} className="flex flex-col md:items-center">
          <div className="text-left">
            <h4 className="font-bold text-on-surface dark:text-white mb-6 uppercase tracking-widest text-[12px]">
              Navigation
            </h4>
            <ul className="space-y-3 text-on-surface-variant dark:text-on-surface-variant/80 font-body-md">
              <li>
                <a className="hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#home">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#projects">
                  Projects
                </a>
              </li>
              <li>
                <a className="hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#services">
                  Services
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Right Column: Contacts info */}
        <Reveal delay={300} className="flex flex-col md:items-end">
          <div className="text-left md:text-right">
            <h4 className="font-bold text-on-surface dark:text-white mb-6 uppercase tracking-widest text-[12px]">
              Contact
            </h4>
            <ul className="space-y-4 text-on-surface-variant dark:text-on-surface-variant/80 font-body-md">
              <li className="flex items-center md:justify-end gap-2 text-sm">
                <span className="material-symbols-outlined text-[18px] text-primary dark:text-primary-fixed-dim">mail</span>
                <a href="mailto:omojuwababatunde1@gmail.com" className="hover:text-primary dark:hover:text-primary-fixed transition-colors">
                  omojuwababatunde1@gmail.com
                </a>
              </li>
              <li className="flex items-center md:justify-end gap-2 text-sm">
                <span className="material-symbols-outlined text-[18px] text-primary dark:text-primary-fixed-dim">location_on</span>
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Bottom info */}
      <div className="max-w-container-max mx-auto w-full pt-8 border-t border-outline-variant/20 dark:border-outline-variant/5 flex flex-col md:flex-row justify-between items-center text-[12px] text-on-surface-variant dark:text-on-surface-variant/60 gap-4">
        <div>© {currentYear} Babatunde Omojuwa. All rights reserved.</div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#home">
            Privacy Policy
          </a>
          <a className="hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#home">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
