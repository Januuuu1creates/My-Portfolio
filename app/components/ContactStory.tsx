"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { soundFX } from "./soundFx";

export default function ContactStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    if (!section || !portrait) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      portrait.style.filter = "blur(0px)";
      portrait.style.opacity = "0.5";
      return;
    }

    let frameId = 0;
    const updatePortrait = () => {
      frameId = 0;
      const bounds = section.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight - bounds.top) /
            (window.innerHeight + bounds.height)
        )
      );
      const distanceFromCenter = Math.abs(progress - 0.5);
      const blur = distanceFromCenter * 22;
      const opacity = 0.2 + (1 - distanceFromCenter * 2) * 0.45;

      portrait.style.filter = `blur(${blur.toFixed(1)}px)`;
      portrait.style.opacity = opacity.toFixed(2);
    };
    const scheduleUpdate = () => {
      if (frameId === 0) frameId = window.requestAnimationFrame(updatePortrait);
    };

    updatePortrait();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFX.playChime();
    setIsSubmitting(true);
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Jahnavi,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );

    window.location.href = `mailto:jahnavimurthy1111@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const copyEmail = () => {
    soundFX.playSparkle();
    navigator.clipboard.writeText("jahnavimurthy1111@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-20 relative scroll-mt-16 overflow-hidden border-b border-pink-500/15"
    >
      <div
        ref={portraitRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ opacity: 0.2, filter: "blur(11px)" }}
      >
        <Image
          src="/site-background.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#12091d]/65 via-[#12091d]/75 to-[#12091d]/90"
      />

      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-[2] animate-lilac-glow" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none z-[2] animate-rose-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-pink-500/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/25 text-xs font-mono text-pink-300 uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>CHAPTER 07 &bull; THE FAREWELL</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight">
              Let&apos;s Connect
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-slate-300 mt-4 md:mt-0 max-w-sm leading-relaxed">
            Whether you have a software engineering opportunity, full-stack role, or collaborative project in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-9 rounded-3xl scifi-glass-panel border-pink-400/25 shadow-2xl relative overflow-hidden">
              <span className="text-[10px] font-mono uppercase tracking-wider text-pink-300 font-bold">
                DIRECT CHANNELS
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                Drop Me A Line
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8 font-sans">
                I am actively seeking software engineering roles, full-stack development opportunities, and challenging software engineering projects.
              </p>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-xs flex items-center justify-between gap-3 hover:border-pink-400/40 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-300 flex items-center justify-center shrink-0 border border-pink-400/30 shadow-[0_0_10px_rgba(244,114,182,0.25)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono uppercase text-pink-300 font-bold block">
                        Email Address
                      </span>
                      <a
                        href="mailto:jahnavimurthy1111@gmail.com"
                        className="block text-xs sm:text-sm font-mono text-white font-semibold hover:text-pink-300 truncate transition-colors"
                      >
                        jahnavimurthy1111@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    type="button"
                    className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-400/30 text-pink-300 hover:text-white hover:bg-pink-500/20 transition-colors cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/jahnavi-murthy-013250240/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-xs hover:border-pink-400/50 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#0A66C2] flex items-center justify-center shrink-0 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#0A66C2] font-bold block">
                        LinkedIn Profile
                      </span>
                      <p className="text-xs sm:text-sm font-mono text-slate-200 font-medium group-hover:text-pink-300 transition-colors">
                        linkedin.com/in/jahnavi-murthy-013250240
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-pink-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* GitHub Verified Link */}
                <a
                  href="https://github.com/Januuuu1creates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-xs hover:border-purple-400/50 hover:bg-white/[0.05] transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center shrink-0 group-hover:border-purple-400/50 group-hover:text-pink-300 transition-colors">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-purple-300 font-bold block">
                        GitHub Profile
                      </span>
                      <p className="text-xs sm:text-sm font-mono text-slate-200 font-medium group-hover:text-pink-300 transition-colors">
                        github.com/Januuuu1creates
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-pink-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Note Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-9 rounded-3xl scifi-glass-panel border-pink-400/25 shadow-2xl relative overflow-hidden">
              <span className="text-[10px] font-mono uppercase tracking-wider text-pink-300 font-bold">
                TRANSMIT MESSAGE
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-8">
                Send A Direct Note
              </h3>

              {/* Success Feedback */}
              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-400/50 text-emerald-200 flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                      Message Draft Opened
                    </h4>
                    <p className="text-xs font-mono text-emerald-300 mt-0.5">
                      Your email application has opened with your drafted message to jahnavimurthy1111@gmail.com!
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold"
                  >
                    Your Name <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 text-white placeholder-slate-500 text-sm font-sans transition-all outline-hidden"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold"
                  >
                    Your Email Address <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 text-white placeholder-slate-500 text-sm font-sans transition-all outline-hidden"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold"
                  >
                    Message <span className="text-pink-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your team, role, or project opportunity..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 text-white placeholder-slate-500 text-sm font-sans transition-all outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full font-mono text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 hover:brightness-110 shadow-lg shadow-pink-500/20 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Note to Jahnavi ↗</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
