"use client";
import React, { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "ui-implementation",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          service: "ui-implementation",
          message: "",
        });
      } else {
        setStatus("idle");
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("idle");
      alert("Failed to send message. Please check your network connection.");
    }
  };

  return (
    <section id="contact" className="py-section-gap-md lg:py-section-gap-lg px-gutter max-w-container-max mx-auto relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[80px] -z-10 -translate-y-1/2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: CTA details */}
        <div className="space-y-6 text-left">
          <Reveal delay={100}>
            <span className="text-primary dark:text-primary-fixed font-bold uppercase tracking-wider text-xs">
              Let's Collaborate
            </span>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="font-display-mobile text-display-mobile lg:font-display lg:text-display text-on-surface dark:text-white leading-tight">
              Ready to build something <span className="relative inline-block text-primary dark:text-primary-fixed-dim after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-2 after:bg-primary/10 after:-z-10">amazing?</span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80 max-w-lg leading-relaxed">
              I am currently accepting new projects, contract assignments, and consulting contracts. Reach out and let's turn your vision into an interactive reality.
            </p>
          </Reveal>

          {/* Contact Details Card */}
          <Reveal delay={400} className="space-y-4">
            <div className="flex items-center gap-4 text-on-surface-variant dark:text-on-surface-variant/80">
              <div className="w-10 h-10 rounded-full bg-primary/5 dark:bg-surface-container flex items-center justify-center text-primary dark:text-primary-fixed-dim border border-outline-variant/10">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant/60 font-bold uppercase">Email Me</div>
                <a href="mailto:omojuwababatunde1@gmail.com" className="text-sm font-bold text-on-surface dark:text-white hover:text-primary transition-colors">
                  omojuwababatunde1@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-on-surface-variant dark:text-on-surface-variant/80">
              <div className="w-10 h-10 rounded-full bg-primary/5 dark:bg-surface-container flex items-center justify-center text-primary dark:text-primary-fixed-dim border border-outline-variant/10">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant/60 font-bold uppercase">WhatsApp Me</div>
                <a href="https://wa.me/2347081051810" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-on-surface dark:text-white hover:text-primary transition-colors">
                  +234 708 105 1810
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-on-surface-variant dark:text-on-surface-variant/80">
              <div className="w-10 h-10 rounded-full bg-primary/5 dark:bg-surface-container flex items-center justify-center text-primary dark:text-primary-fixed-dim border border-outline-variant/10">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant/60 font-bold uppercase">Location</div>
                <div className="text-sm font-bold text-on-surface dark:text-white">
                  Lagos, Nigeria 💠 Available for Remote, Hybrid, or Onsite roles
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Form Container */}
        <Reveal delay={300} direction="left">
          <div className="bg-white dark:bg-[#0d121f] rounded-[32px] p-6 md:p-8 shadow-2xl border border-outline-variant/20 dark:border-outline-variant/5">
            {status === "success" ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center text-[#10b981] mx-auto mb-4 border border-[#10b981]/25">
                  <span className="material-symbols-outlined text-4xl">done</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">
                  Message Sent!
                </h3>
                <p className="text-sm text-on-surface-variant dark:text-on-surface-variant/80 max-w-xs mx-auto">
                  Thank you for reaching out. I've received your request and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-primary dark:text-primary-fixed font-bold text-xs underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-on-surface-variant dark:text-on-surface-variant/80 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl bg-surface-container-low dark:bg-surface-container border focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed/20 transition-all text-sm text-on-surface dark:text-white ${errors.name
                      ? "border-[#ba1a1a] focus:border-[#ba1a1a]"
                      : "border-outline-variant/30 focus:border-primary dark:border-outline-variant/10 dark:focus:border-primary-fixed-dim"
                      }`}
                    placeholder="Babatunde Kola"
                  />
                  {errors.name && (
                    <p className="text-xs text-[#ba1a1a] dark:text-[#ffdad6] font-semibold">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-on-surface-variant dark:text-on-surface-variant/80 uppercase">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl bg-surface-container-low dark:bg-surface-container border focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed/20 transition-all text-sm text-on-surface dark:text-white ${errors.email
                      ? "border-[#ba1a1a] focus:border-[#ba1a1a]"
                      : "border-outline-variant/30 focus:border-primary dark:border-outline-variant/10 dark:focus:border-primary-fixed-dim"
                      }`}
                    placeholder="babatunde@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#ba1a1a] dark:text-[#ffdad6] font-semibold">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Service Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="service" className="text-xs font-bold text-on-surface-variant dark:text-on-surface-variant/80 uppercase">
                    I need help with
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 dark:border-outline-variant/10 focus:outline-none focus:border-primary dark:focus:border-primary-fixed-dim focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed/20 transition-all text-sm text-on-surface dark:text-white appearance-none cursor-pointer"
                    >
                      <option value="ui-implementation">UI Implementation (Figma to React)</option>
                      <option value="perf-optimization">Performance Optimization</option>
                      <option value="a11y-audit">Accessibility (A11y) Audits</option>
                      <option value="seo-webvitals">SEO &amp; Core Web Vitals</option>
                      <option value="consulting">Fullstack / General Consulting</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-on-surface-variant dark:text-on-surface-variant/80 uppercase">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl bg-surface-container-low dark:bg-surface-container border focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed/20 transition-all text-sm text-on-surface dark:text-white resize-none ${errors.message
                      ? "border-[#ba1a1a] focus:border-[#ba1a1a]"
                      : "border-outline-variant/30 focus:border-primary dark:border-outline-variant/10 dark:focus:border-primary-fixed-dim"
                      }`}
                    placeholder="Tell me about what you are building..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-[#ba1a1a] dark:text-[#ffdad6] font-semibold">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-on-primary font-label-md text-label-md py-3.5 rounded-full hover:bg-primary-container disabled:opacity-50 transition-all duration-300 shadow-md shadow-primary/20 font-bold hover:scale-102 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
