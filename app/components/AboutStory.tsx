"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  Atom,
  Binary,
  Layers,
  Compass,
  CheckCircle2,
  Heart,
  BookOpen,
} from "lucide-react";

export default function AboutStory() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: "First-Principles Thinking",
      icon: <Atom className="w-5 h-5 text-pink-400" />,
      tagline: "Grounded in Physics",
      description:
        "My background in Physics instilled a habit of peeling away assumptions to analyze foundational mechanics. When approaching a software challenge, I break it down to core algorithmic truths before architecting the solution.",
    },
    {
      title: "Engineering Craftsmanship",
      icon: <Binary className="w-5 h-5 text-purple-400" />,
      tagline: "Clean, Maintainable Code",
      description:
        "Writing software is an ongoing practice of clarity and care. From type-safe frontend structures in React and TypeScript to robust backends in Python, C#, and Java, I prioritize readable, well-tested, and scalable code.",
    },
    {
      title: "Cloud & Automation",
      icon: <Layers className="w-5 h-5 text-rose-400" />,
      tagline: "Infrastructure as Code",
      description:
        "I believe that deployment and cloud architecture should be automated, reproducible, and zero-drift. Leveraging AWS and Terraform, I build infrastructure that scales predictably and reliably.",
    },
    {
      title: "Continuous Curiosity",
      icon: <Compass className="w-5 h-5 text-sky-400" />,
      tagline: "Lifelong Student",
      description:
        "Technology evolves rapidly, and that is what makes it so exciting. Whether diving deep into Natural Language Processing (NLP), experimenting with modern frameworks, or reviewing system designs, learning is my daily habit.",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-20 relative border-b border-pink-500/15 scroll-mt-16 overflow-hidden"
    >
      {/* Soft Dreamy Ambient Glows */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-rose-glow" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-lilac-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-14 border-b border-pink-500/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/25 text-xs font-mono text-pink-300 uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>CHAPTER 02 &bull; ABOUT ME</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The Person Behind The Code
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-slate-300 mt-4 md:mt-0 max-w-sm leading-relaxed">
            Getting to know Jahnavi: the motivations, analytical mindset, and core values that drive my engineering journey.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-7 sm:p-9 rounded-3xl scifi-glass-panel border-pink-400/25 shadow-xl relative overflow-hidden">
              {/* Education Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-xs font-mono text-purple-200 font-bold">
                  <GraduationCap className="w-5 h-5 text-pink-400" />
                  <span>BACHELORS IN COMPUTER SCIENCE &amp; PHYSICS</span>
                </div>
                <span className="text-[11px] font-mono text-pink-300 font-semibold px-3 py-0.5 rounded-full bg-pink-500/10 border border-pink-400/30 shadow-[0_0_10px_rgba(244,114,182,0.2)]">
                  2022–2026
                </span>
              </div>

              {/* Personal Voice Narrative */}
              <div className="space-y-4 text-slate-200 leading-relaxed font-sans text-base sm:text-lg">
                <p>
                  I&apos;m <span className="text-white font-extrabold underline decoration-pink-400/60 decoration-2 underline-offset-4">Jahnavi Murthy</span>, a Computer Science graduate with a unique dual foundation in <strong className="text-pink-300">Computer Science and Physics</strong>.
                </p>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  My fascination with technology began with asking how things work underneath the hood. Physics taught me mathematical rigor, analytical patience, and how to dissect complex phenomena into first principles. Computer Science handed me the tools to build real, scalable systems that turn those principles into tangible, human-centered software.
                </p>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  I enjoy developing across the full stack — from architecting database schemas and designing REST APIs to styling intuitive interfaces with modern frameworks. When I&apos;m not writing code, I am exploring cloud automation with Terraform, experimenting with AI/NLP algorithms, or deepening my understanding of software design patterns.
                </p>
              </div>

              {/* Fast Facts List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10 mt-6 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-pink-400/30 transition-colors">
                  <span className="text-slate-400 block text-[10px] uppercase">Based In</span>
                  <span className="text-white font-bold text-sm">Bengaluru, India</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-pink-400/30 transition-colors">
                  <span className="text-slate-400 block text-[10px] uppercase">Engineering Focus</span>
                  <span className="text-pink-300 font-bold text-sm">Full-Stack &amp; Cloud</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-400/30 transition-colors">
                  <span className="text-slate-400 block text-[10px] uppercase">Industry Experience</span>
                  <span className="text-purple-300 font-bold text-sm">Gainwell Technologies</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-pink-400/30 transition-colors">
                  <span className="text-slate-400 block text-[10px] uppercase">Philosophy</span>
                  <span className="text-rose-300 font-bold text-sm">Curiosity &amp; Rigor</span>
                </div>
              </div>
            </div>

            {/* Recruiter Ready Status Pill */}
            <div className="p-5 rounded-3xl scifi-glass-panel border-pink-400/30 flex items-center justify-between shadow-[0_0_20px_rgba(244,114,182,0.15)]">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-pink-300 font-bold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/30" />
                  <span>CAREER STATUS &bull; READY TO CONTRIBUTE</span>
                </p>
                <p className="text-xs sm:text-sm font-mono text-slate-200 font-semibold mt-0.5">
                  Open &amp; Ready for Software Engineering Roles &amp; Opportunities
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 text-slate-950 flex items-center justify-center text-xs font-mono font-black shadow-[0_0_15px_rgba(244,114,182,0.5)] shrink-0">
                ✓
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Core Pillars ("What Drives Me") */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-pink-300 font-bold">
                CORE PILLARS &bull; WHAT DRIVES MY WORK
              </h3>
              <span className="text-[11px] font-mono text-purple-300/80">Tap to inspect</span>
            </div>

            <div className="space-y-3.5">
              {pillars.map((pillar, index) => {
                const isActive = activePillar === index;
                return (
                  <div
                    key={pillar.title}
                    onClick={() => setActivePillar(index)}
                    className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "scifi-glass-panel border-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.25)] -translate-y-0.5"
                        : "bg-white/[0.02] border-white/10 hover:border-pink-400/40 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-2xl ${isActive ? "bg-pink-500/20 text-pink-300" : "bg-white/5"}`}>
                          {pillar.icon}
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {pillar.title}
                          </h4>
                          <span className="text-[11px] font-mono text-pink-300 uppercase tracking-wider font-semibold">
                            {pillar.tagline}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-pink-300/80 font-bold">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3 pl-1">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
