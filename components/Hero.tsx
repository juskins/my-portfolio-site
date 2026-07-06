"use client";
import React, { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal";

// Simple Count-Up Component triggering on viewport enter
function Counter({ target, suffix = "", duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);

      setCount(Math.floor(progressRatio * target));

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return <div ref={ref} className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold">{count}{suffix}</div>;
}

// Typing Loop Text Component
function TypingText() {
  const phrases = ["Frontend Engineer", "Node.Js Developer", "Nextjs Developer", "Fullstack Engineer"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 60 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    setText(phrases[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <span className="text-primary dark:text-primary-fixed border-r-2 border-primary dark:border-primary-fixed pr-1 min-h-[36px] inline-block animate-pulse">
      {text}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="py-section-gap-md lg:py-section-gap-lg px-gutter max-w-container-max mx-auto relative overflow-hidden mt-12 md:mt-20">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary-container/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute -left-20 bottom-10 w-[300px] h-[300px] bg-primary/3 dark:bg-primary-fixed-dim/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Intro Panel */}
        <div className="space-y-6 z-10 text-left">
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed dark:bg-surface-container dark:text-primary-fixed font-label-md text-[13px] font-bold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
              Available for new opportunities
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-display-mobile text-display-mobile lg:font-display lg:text-display text-on-surface dark:text-white leading-tight">
              Babatunde<br />
              <span className="text-primary dark:text-primary-fixed-dim">Omojuwa</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <div className="text-headline-md h-10 font-bold text-on-surface-variant dark:text-on-surface-variant/80">
              <TypingText />
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80 max-w-lg">
              I specialize in building high-performance, secured, accessible,  pixel-perfect and user-friendly web interfaces for start-ups, businesses, and organizations.
            </p>
          </Reveal>

          {/* Social Links Row */}
          <Reveal delay={450}>
            <div className="flex items-center gap-4 py-2">
              {/* GitHub */}
              <a
                href="http://www.github.com/juskins"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-outline-variant/40 hover:border-primary hover:bg-primary/5 flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant/80 dark:border-outline hover:scale-110 active:scale-95 transition-all duration-300"
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
                className="w-10 h-10 rounded-full border border-outline-variant/40 hover:border-primary hover:bg-primary/5 flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant/80 dark:border-outline hover:scale-110 active:scale-95 transition-all duration-300"
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
                className="w-10 h-10 rounded-full border border-outline-variant/40 hover:border-primary hover:bg-primary/5 flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant/80 dark:border-outline hover:scale-110 active:scale-95 transition-all duration-300"
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
                className="w-10 h-10 rounded-full border border-outline-variant/40 hover:border-primary hover:bg-primary/5 flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant/80 dark:border-outline hover:scale-110 active:scale-95 transition-all duration-300"
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.684l.564-3H13V6c0-.5.2-.8.8-.8H16V1h-3.8c-3.1 0-4.2 1.6-4.2 3.8V8z" />
                </svg>
              </a>
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={500}>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded-full hover:bg-primary-container hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/25"
              >
                View Work
              </a>
              <a
                href="/BABATUNDE%20OMOJUWA%20-%20CV.pdf"
                download="BABATUNDE_OMOJUWA_CV.pdf"
                className="bg-surface text-on-surface font-label-md text-label-md px-8 py-3.5 border border-outline-variant rounded-full hover:bg-surface-variant hover:scale-105 active:scale-95 transition-all duration-300 dark:bg-surface-container dark:text-on-surface dark:border-outline"
              >
                Download Resume
              </a>
            </div>
          </Reveal>

          {/* Stat Numbers */}
          <Reveal delay={600}>
            <div className="flex gap-12 pt-8 border-t border-outline-variant/30 dark:border-outline-variant/10 mt-8">
              <div>
                <Counter target={3} suffix="+" />
                <div className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mt-1">
                  YEARS EXP.
                </div>
              </div>
              <div>
                <Counter target={20} suffix="+" />
                <div className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mt-1">
                  PROJECTS
                </div>
              </div>
              <div>
                <Counter target={10} />
                <div className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mt-1">
                  GLOBAL CLIENTS
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Code Mockup Card */}
        <Reveal delay={400} direction="left" className="relative z-10 flex justify-center lg:justify-end">
          {/* Abstract background shadow shape */}
          <div className="absolute w-full h-full max-w-[400px] bg-primary/10 dark:bg-primary/5 rounded-[40px] rotate-6 scale-105 -z-10 blur-sm"></div>

          {/* Code mock card */}
          <div className="bg-white dark:bg-[#0d121f] rounded-[24px] p-6 md:p-8 w-full max-w-[480px] code-shadow border border-outline-variant/20 dark:border-outline-variant/5 hover:-rotate-1 hover:scale-102 transition-all duration-500">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>

            <div className="font-mono text-sm leading-loose text-on-surface-variant dark:text-on-surface-variant/80">
              <div className="flex">
                <span className="text-outline/50 w-8 select-none">01</span>
                <span>
                  <span className="text-primary dark:text-primary-fixed">const</span>{" "}
                  <span className="text-[#0ea5e9]">developer</span> = {"{"}
                </span>
              </div>
              <div className="flex">
                <span className="text-outline/50 w-8 select-none">02</span>
                <span className="pl-4">
                  <span className="text-[#0ea5e9]">name</span>:{" "}
                  <span className="text-[#10b981]">'Babatunde Omojuwa'</span>,
                </span>
              </div>
              <div className="flex">
                <span className="text-outline/50 w-8 select-none">03</span>
                <span className="pl-4">
                  <span className="text-[#0ea5e9]">role</span>:{" "}
                  <span className="text-[#10b981]">'Frontend Engineer'</span>,
                </span>
              </div>
              <div className="flex">
                <span className="text-outline/50 w-8 select-none">04</span>
                <span className="pl-4">
                  <span className="text-[#0ea5e9]">skills</span>: [
                  <span className="text-[#10b981]">'Next.js'</span>,{" "}
                  <span className="text-[#10b981]">'React Native'</span>,{" "}
                  <span className="text-[#10b981]">'TypeScript'</span>,{" "}
                  <span className="text-[#10b981]">'Tailwind'</span>,{" "}
                  <span className="text-[#10b981]">'Node.Js'</span>],
                </span>
              </div>
              <div className="flex">
                <span className="text-outline/50 w-8 select-none">05</span>
                <span className="pl-4">
                  <span className="text-[#0ea5e9]">passion</span>:{" "}
                  <span className="text-[#10b981]">'Building Accessible Web'</span>
                </span>
              </div>
              <div className="flex">
                <span className="text-outline/50 w-8 select-none">06</span>
                <span>{"};"}</span>
              </div>
            </div>

            {/* Custom interactive tooltips on hover of badges */}
            <div className="mt-8 flex justify-between items-center pt-6 border-t border-outline-variant/20 dark:border-outline-variant/5">
              <div className="flex gap-2">
                <div
                  className="w-8 h-8 rounded-full bg-[#61DAFB]/20 text-[#2575a7] dark:text-[#61DAFB] flex items-center justify-center text-[11px] font-extrabold cursor-help hover:scale-110 transition-transform"
                  title="React Native & React v19 Developer"
                >
                  R
                </div>
                <div
                  className="w-8 h-8 rounded-full bg-[#3178C6]/20 text-[#3178C6] dark:text-[#4295e8] flex items-center justify-center text-[11px] font-extrabold cursor-help hover:scale-110 transition-transform"
                  title="TypeScript: Strongly-Typed Architecture"
                >
                  TS
                </div>
                <div
                  className="w-8 h-8 rounded-full bg-[#38B2AC]/20 text-[#227c78] dark:text-[#38B2AC] flex items-center justify-center text-[11px] font-extrabold cursor-help hover:scale-110 transition-transform"
                  title="Tailwind CSS v4 Developer"
                >
                  TW
                </div>
              </div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/70 animate-pulse">
                SYSTEM STATUS: ACTIVE
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
