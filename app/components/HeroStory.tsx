"use client";

import React, { useState } from "react";
import {
  ArrowDownRight,
  Sparkles,
  Briefcase,
  GraduationCap,
  Cpu,
  Copy,
  Check,
  ChevronRight,
  Heart,
  FolderGit2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { soundFX } from "./soundFx";

export default function HeroStory() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    soundFX.playSparkle();
    navigator.clipboard.writeText("jahnavimurthy1111@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="introduction"
      className="relative min-h-[95vh] flex flex-col justify-between pt-28 pb-6 overflow-hidden border-b border-pink-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-4 lg:gap-12 items-start">
          {/* Left Column: Jahnavi's Identity & Core Introduction */}
          <div className="sm:col-span-8 lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-pink-400/30 text-xs font-mono text-pink-200 shadow-[0_0_15px_rgba(244,114,182,0.2)]">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              <span className="font-semibold tracking-wider">
                AVAILABLE &bull; 2026 SOFTWARE ENGINEERING ROLES
              </span>
            </div>

            {/* Conversational Greeting Card */}
            <div className="p-4 sm:p-5 rounded-3xl scifi-glass-panel border-pink-400/25 relative max-w-xl">
              <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed">
                <span className="text-pink-300 font-bold">&ldquo;Hi, I&apos;m Jahnavi.</span>{" "}
                Welcome to my little corner of the internet. Scroll down and I&apos;ll show you around.&rdquo;
              </p>
            </div>

            {/* Prominent Name Display with Adorable Pastel Typography */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold mb-2 block">
                PORTFOLIO &bull; SOFTWARE ENGINEER
              </span>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05] uppercase">
                Jahnavi <br />
                <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(244,114,182,0.45)]">
                  Murthy
                </span>
              </h1>
            </div>

            {/* Professional Headline */}
            <p className="text-base sm:text-xl font-medium text-slate-200 max-w-2xl leading-relaxed">
              <span className="text-white font-bold">Aspiring Software Engineer</span>{" "}
              <span className="text-pink-400 font-mono">/</span>{" "}
              <span className="text-purple-300 font-semibold">Full-Stack Developer</span>{" "}
              <span className="text-sky-400 font-mono">/</span>{" "}
              <span className="text-sky-200">Cloud &amp; AI Enthusiast</span>
            </p>

            {/* Verified Bio */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
              Combining the analytical rigor of <strong className="text-white font-semibold">Computer Science &amp; Physics</strong> with modern full-stack engineering to build reliable, high-performance web systems and intelligent digital tools.
            </p>

            {/* Primary Action Buttons (Soft rounded pills) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#about"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 hover:brightness-110 shadow-[0_0_20px_rgba(244,114,182,0.4)] hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <span>Explore My Story</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-white bg-black/40 hover:bg-black/60 border border-pink-400/30 hover:border-pink-400/60 backdrop-blur-md shadow-xs transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-pink-300" />
                <span>Featured Projects</span>
              </a>
            </div>

            {/* Verified Social & Contact Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-mono">
              <a
                href="https://www.linkedin.com/in/jahnavi-murthy-013250240/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 hover:border-pink-400/40 text-slate-200 hover:text-white transition-all group"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span className="font-semibold">LINKEDIN ↗</span>
              </a>

              <a
                href="https://github.com/Januuuu1creates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 hover:border-purple-400/40 text-slate-200 hover:text-white transition-all group"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-200 group-hover:text-pink-300 transition-colors" />
                <span className="font-semibold">GITHUB ↗</span>
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 hover:border-pink-400/40 text-slate-200 hover:text-white transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-pink-300" />
                    <span className="font-semibold">COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Portfolio guide details */}
          <div className="sm:col-span-4 lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[230px] p-4 rounded-3xl bg-black/40 backdrop-blur-xl border border-pink-400/30 shadow-[0_12px_35px_rgba(0,0,0,0.45)] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-pink-300 font-bold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/40" />
                  <span>PORTFOLIO GUIDE</span>
                </span>
                <span className="text-[10px] text-purple-200 font-semibold px-2 py-0.5 rounded-full bg-pink-500/20">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                Software Engineer &bull; Dual foundation in Computer Science &amp; Physics.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Engineering Highlights Bar: Clean, Translucent, Across Full Width */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Metric 1: Experience */}
          <div className="p-4 rounded-3xl scifi-glass-panel border-pink-400/25 space-y-1 hover:border-pink-400/50 transition-all">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-pink-400" />
                <span>EXPERIENCE</span>
              </span>
              <span className="text-[10px] text-purple-200/80">July 2025 – Jan 2026</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              Apprentice – Software Development
            </h4>
            <p className="text-xs font-mono text-pink-300/90">
              Gainwell Technologies &bull; Bangalore, India
            </p>
          </div>

          {/* Metric 2: Academic Background */}
          <div className="p-4 rounded-3xl scifi-glass-panel border-pink-400/25 space-y-1 hover:border-purple-400/50 transition-all">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span>EDUCATION</span>
              </span>
              <span className="text-[10px] text-purple-200/80">2022 – 2026</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              Bachelors in Computer Science &amp; Physics
            </h4>
            <p className="text-xs font-mono text-purple-300/90">
              Computational Physics &amp; Algorithms
            </p>
          </div>

          {/* Metric 3: Core Proficiencies */}
          <div className="p-4 rounded-3xl scifi-glass-panel border-pink-400/25 space-y-1 hover:border-pink-400/50 transition-all">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-pink-400" />
                <span>12 KEY PROFICIENCIES</span>
              </span>
              <span className="text-[10px] text-pink-300 font-bold">VERIFIED</span>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {["Java (90%)", "Python (75%)", "C# (75%)", "HTML/CSS (80%)", "Flask", "SQL", "AWS & Terraform"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/40 border border-purple-400/30 text-purple-200"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Metric 4: Verified Repositories */}
          <div className="p-4 rounded-3xl scifi-glass-panel border-pink-400/25 flex flex-col justify-between hover:border-pink-400/50 transition-all">
            <div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-pink-300 font-bold uppercase flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-pink-400" />
                  <span>REPOSITORIES</span>
                </span>
                <span className="text-[10px] text-purple-200 font-bold">4 PROJECTS</span>
              </div>
              <h4 className="text-sm font-bold text-white mt-1">
                4 Verified Systems Engineered
              </h4>
            </div>
            <a
              href="#projects"
              className="mt-2 inline-flex items-center justify-between px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-400/40 text-[11px] font-mono text-pink-200 font-semibold transition-colors"
            >
              <span>Inspect Case Studies</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Ticker */}
      <div className="mt-8 w-full overflow-hidden bg-slate-950/60 backdrop-blur-md border-y border-pink-500/15 py-2.5 select-none shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-300 shrink-0">
            <span className="text-pink-400 font-bold">&bull;</span>
            <span className="text-white font-bold">JAHNAVI MURTHY</span>
            <span className="text-purple-400 font-bold">&bull;</span>
            <span>SOFTWARE DEVELOPMENT APPRENTICE &bull; GAINWELL TECHNOLOGIES</span>
            <span className="text-pink-400 font-bold">&bull;</span>
            <span>CS &amp; PHYSICS (2022–2026)</span>
            <span className="text-purple-400 font-bold">&bull;</span>
            <span>AXIOM AI AGENT</span>
            <span className="text-pink-400 font-bold">&bull;</span>
            <span>AI RESUME PARSER</span>
            <span className="text-purple-400 font-bold">&bull;</span>
            <span>CLOUD INFRASTRUCTURE AUTOMATION (TERRAFORM &amp; AWS)</span>
            <span className="text-pink-400 font-bold">&bull;</span>
            <span>AI COOKING ASSISTANT</span>
          </div>
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-300 shrink-0">
            <span className="text-pink-400 font-bold">&bull;</span>
            <span className="text-white font-bold">JAHNAVI MURTHY</span>
            <span className="text-purple-400 font-bold">&bull;</span>
            <span>SOFTWARE DEVELOPMENT APPRENTICE &bull; GAINWELL TECHNOLOGIES</span>
            <span className="text-pink-400 font-bold">&bull;</span>
            <span>CS &amp; PHYSICS (2022–2026)</span>
            <span className="text-purple-400 font-bold">&bull;</span>
            <span>AXIOM AI AGENT</span>
            <span className="text-pink-400 font-bold">&bull;</span>
            <span>AI RESUME PARSER</span>
            <span className="text-purple-400 font-bold">&bull;</span>
            <span>CLOUD INFRASTRUCTURE AUTOMATION (TERRAFORM &amp; AWS)</span>
            <span className="text-pink-400 font-bold">&bull;</span>
            <span>AI COOKING ASSISTANT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
