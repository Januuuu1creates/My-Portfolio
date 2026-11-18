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
  Cpu,
  BookOpen,
} from "lucide-react";

export default function AboutStory() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: "First-Principles Thinking",
      icon: <Atom className="w-5 h-5 text-violet-400" />,
      tagline: "Grounded in Physics",
      description:
        "My background in Physics instilled a habit of peeling away assumptions to analyze foundational mechanics. When approaching a software challenge, I break it down to core algorithmic truths before architecting the solution.",
    },
    {
      title: "Engineering Craftsmanship",
      icon: <Binary className="w-5 h-5 text-sky-400" />,
      tagline: "Clean, Maintainable Code",
      description:
        "Writing software is an ongoing practice of clarity and care. From type-safe frontend structures in React and TypeScript to robust backends in Python, C#, and Java, I prioritize readable, well-tested, and scalable code.",
    },
    {
      title: "Cloud & Automation",
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      tagline: "Infrastructure as Code",
      description:
        "I believe that deployment and cloud architecture should be automated, reproducible, and zero-drift. Leveraging AWS and Terraform, I build infrastructure that scales predictably and reliably.",
    },
    {
      title: "Continuous Curiosity",
      icon: <Compass className="w-5 h-5 text-purple-400" />,
      tagline: "Lifelong Student",
      description:
        "Technology evolves rapidly, and that is what makes it so exciting. Whether diving deep into Natural Language Processing (NLP), experimenting with modern frameworks, or reviewing system designs, learning is my daily habit.",
    },
  ];

  return (
    <section
      id="about"
      className="py-28 relative border-b border-white/10 scroll-mt-16 overflow-hidden"
    >
      {/* Background Ambient Violet & Blue Glows */}
      <div className="absolute top-1/3 -left-24 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-violet-glow" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-blue-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest mb-2 font-bold">
              <span>[02]</span>
              <span>&mdash;</span>
              <span>CHAPTER 02 &bull; ABOUT ME</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              The Person Behind The Code
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-4 md:mt-0 max-w-sm">
            Getting to know Jahnavi: the motivations, analytical mindset, and core values that drive my engineering journey.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Personal Authentic Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Education Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-xs font-mono text-violet-300 font-bold">
                  <GraduationCap className="w-5 h-5 text-violet-400" />
                  <span>BACHELORS IN COMPUTER SCIENCE &amp; PHYSICS</span>
                </div>
                <span className="text-[11px] font-mono text-sky-400 font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30">
                  2022–2026
                </span>
              </div>

              {/* Personal Voice Narrative */}
              <div className="space-y-4 text-slate-200 leading-relaxed font-sans text-base sm:text-lg">
                <p>
                  I&apos;m <span className="text-white font-extrabold underline decoration-violet-500/60 decoration-2 underline-offset-4">Jahnavi Murthy</span>, a Computer Science graduate with a unique dual foundation in <strong className="text-violet-300">Computer Science and Physics</strong>.
                </p>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  My fascination with technology began with asking how things work underneath the hood. Physics taught me mathematical rigor, analytical patience, and how to dissect complex phenomena into first principles. Computer Science handed me the tools to build real, scalable systems that turn those principles into tangible, human-centered software.
                </p>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  I enjoy developing across the full stack — from architecting database schemas and designing REST APIs to styling intuitive interfaces with modern frameworks. When I&apos;m not writing code, I am exploring cloud automation with Terraform, experimenting with AI/NLP algorithms, or deepening my understanding of software design patterns.
                </p>
              </div>

              {/* Authentic Fast Facts List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10 mt-6 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Based In</span>
                  <span className="text-white font-bold text-sm">Bengaluru, India</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Engineering Focus</span>
                  <span className="text-sky-300 font-bold text-sm">Full-Stack &amp; Cloud</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Industry Experience</span>
                  <span className="text-violet-300 font-bold text-sm">Gainwell Technologies</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Philosophy</span>
                  <span className="text-emerald-300 font-bold text-sm">Curiosity &amp; Rigor</span>
                </div>
              </div>
            </div>

            {/* Recruiter Ready Status Pill */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-violet-950/30 to-slate-900/80 backdrop-blur-xl border border-violet-500/30 flex items-center justify-between shadow-md">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-violet-300 font-bold">
                  CAREER STATUS
                </p>
                <p className="text-xs sm:text-sm font-mono text-slate-200 font-semibold">
                  Open &amp; Ready for Software Engineering Roles &amp; Opportunities
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-mono font-black shadow-md shadow-violet-600/40 shrink-0">
                ✓
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Core Pillars ("What Drives Me") */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
                CORE PILLARS &bull; WHAT DRIVES MY WORK
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Click any card to inspect</span>
            </div>

            <div className="space-y-3.5">
              {pillars.map((pillar, index) => {
                const isActive = activePillar === index;
                return (
                  <div
                    key={pillar.title}
                    onClick={() => setActivePillar(index)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-slate-900/90 border-violet-500/60 shadow-[0_10px_30px_rgba(139,92,246,0.2)] -translate-y-0.5"
                        : "bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isActive ? "bg-violet-600/20" : "bg-white/5"}`}>
                          {pillar.icon}
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {pillar.title}
                          </h4>
                          <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider font-semibold">
                            {pillar.tagline}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-violet-400/80 font-bold">
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
