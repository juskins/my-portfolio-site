"use client";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Detect scroll position for visual adjustments
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Check system preference & localStorage for Dark Mode status
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDark(true);
    } else {
      setDark(false);
    }

    // IntersectionObserver to highlight current active section in nav links
    const sections = ["home", "about", "tech", "projects", "services", "contact"];
    const observers = sections.map((sec) => {
      const el = document.getElementById(sec);
      if (!el) return null;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveSection(sec);
            }
          });
        },
        { threshold: [0.1, 0.3, 0.5], rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      return { obs, el };
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => {
        if (o) o.obs.unobserve(o.el);
      });
    };
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDark(true);
    }
  };

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Expertise", href: "#tech", id: "tech" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled
          ? "h-16 bg-surface/90 dark:bg-surface/80 backdrop-blur-md shadow-md border-outline-variant/10"
          : "h-20 bg-transparent border-transparent"
          }`}
      >
        <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-full w-full">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                code
              </span>
            </div>
            <span className="font-bold text-headline-md tracking-tight text-on-surface dark:text-on-surface select-none">
              B.O
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body-md text-body-md pb-1 border-b-2 transition-all duration-300 font-semibold ${activeSection === link.id
                  ? "text-primary dark:text-primary-fixed border-primary dark:border-primary-fixed-dim"
                  : "text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary-fixed border-transparent hover:border-primary/30"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant/50 transition-colors"
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined">
                {dark ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <a
              href="/BABATUNDE%20OMOJUWA%20-%20CV.pdf"
              download="BABATUNDE_OMOJUWA_CV.pdf"
              className="flex items-center gap-2 text-on-surface font-label-md text-label-md px-4 py-2 border border-outline-variant rounded-full hover:bg-surface-variant transition-colors dark:text-on-surface dark:border-outline"
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              Resume
            </a>
            <a
              href="#contact"
              className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full hover:bg-primary-container hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-primary/20"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant/50 transition-colors"
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined">
                {dark ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-on-surface w-10 h-10 flex items-center justify-center hover:bg-surface-variant/50 rounded-full transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileOpen(false)}
      >
        {/* Drawer content */}
        <div
          className={`fixed top-0 right-0 h-full w-[260px] bg-surface dark:bg-surface-container shadow-2xl p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-out z-50 ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4 mt-4">
            <span className="font-bold text-lg text-on-surface">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-on-surface hover:bg-surface-variant/50 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-2 px-3 rounded-lg font-medium transition-all ${activeSection === link.id
                  ? "bg-primary/10 text-primary dark:text-primary-fixed font-bold"
                  : "text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto border-t border-outline-variant/15 pt-6 flex flex-col gap-3">
            <a
              href="/BABATUNDE%20OMOJUWA%20-%20CV.pdf"
              download="BABATUNDE_OMOJUWA_CV.pdf"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 text-on-surface font-label-md text-label-md px-4 py-3 border border-outline-variant rounded-full hover:bg-surface-variant transition-colors dark:text-on-surface dark:border-outline"
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              Resume
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-full hover:bg-primary-container text-center transition-colors"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
