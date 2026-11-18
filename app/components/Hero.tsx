"use client";

import React, { useState } from "react";
import { ArrowDownRight, Mail, Sparkles, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import DollCompanion from "./DollCompanion";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [showGithubNotice, setShowGithubNotice] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("jahnavimurthy878@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowGithubNotice(true);
    setTimeout(() => setShowGithubNotice(false), 3500);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#FAF8F5] border-b border-amber-200/70"
    >
      {/* Swiss Coordinate Crosshair Markers (Iconic sebg.ch Signature) */}
      <div className="absolute top-24 left-8 text-xs font-mono text-amber-700/60 select-none pointer-events-none hidden sm:block">
        + 12.9716° N, 77.5946° E
      </div>
      <div className="absolute top-24 right-8 text-xs font-mono text-amber-700/60 select-none pointer-events-none hidden sm:block">
        + PORTFOLIO 2026
      </div>

      {/* Warm Golden Glow Background & Floating Bokeh Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-12 left-10 w-96 h-96 bg-yellow-200/30 rounded-full blur-[110px] pointer-events-none -z-10 animate-bokeh" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-bokeh [animation-delay:2s]" />

      {/* Floating Warm Bokeh Light Orbs */}
      <div className="absolute top-28 left-[15%] w-16 h-16 rounded-full bg-amber-300/35 blur-xl pointer-events-none animate-bokeh" />
      <div className="absolute top-44 right-[18%] w-24 h-24 rounded-full bg-yellow-200/40 blur-2xl pointer-events-none animate-bokeh [animation-delay:3s]" />
      <div className="absolute bottom-32 left-[8%] w-20 h-20 rounded-full bg-amber-400/25 blur-xl pointer-events-none animate-bokeh [animation-delay:1.5s]" />

      {/* Swiss Minimalist Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b0a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Typographic Statement & Quick Links (sebg.ch style) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Status Monospace Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-amber-200/80 text-xs font-mono text-amber-900 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span className="font-bold tracking-wider">PORTFOLIO &bull; 2026 EDITION</span>
            </div>

            {/* Giant Display Name (Swiss Grotesque Bold) */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-slate-900 tracking-tighter leading-[1.05] uppercase">
              V Jahnavi <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Murthy
              </span>
            </h1>

            {/* Headline Subtitle */}
            <p className="text-base sm:text-xl font-medium text-slate-700 max-w-2xl leading-relaxed">
              <span className="text-slate-900 font-bold">Aspiring Software Engineer</span>{" "}
              <span className="text-amber-500 font-mono">/</span>{" "}
              <span className="text-amber-700 font-semibold">Full-Stack Developer</span>{" "}
              <span className="text-amber-500 font-mono">/</span>{" "}
              <span className="text-slate-600">Cloud &amp; AI Enthusiast</span>
            </p>

            {/* Editorial Bio Excerpt */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
              Crafting innovative web applications, engineering cloud infrastructure with Terraform,
              and unlocking intelligence through Python &amp; NLP models.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg shadow-amber-500/25 hover:scale-[1.02] border border-amber-300/40 transition-all duration-200"
              >
                <span>View My Work [02]</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-slate-800 bg-white/95 hover:bg-amber-50/80 hover:text-amber-900 border border-amber-200/80 shadow-xs hover:border-amber-300 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-amber-600" />
                <span>Contact Me [03]</span>
              </a>
            </div>

            {/* Social Pill Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <a
                href="https://linkedin.com/in/jahnavi-murthy-013250240/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 border border-amber-200/80 hover:border-amber-300 text-slate-700 hover:text-amber-800 shadow-xs transition-all group"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span className="font-semibold">LINKEDIN ↗</span>
              </a>

              <div className="relative">
                <button
                  onClick={handleGithubClick}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 border border-amber-200/80 hover:border-amber-300 text-slate-700 hover:text-amber-800 shadow-xs transition-all cursor-pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-800" />
                  <span className="font-semibold">GITHUB</span>
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">
                    SOON
                  </span>
                </button>
                {showGithubNotice && (
                  <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-xl text-center z-20 animate-in fade-in">
                    GitHub URL placeholder will be updated shortly!
                  </div>
                )}
              </div>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 border border-amber-200/80 hover:border-amber-300 text-slate-700 hover:text-amber-800 shadow-xs transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-semibold">COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: THE CUTE BUBBLY ROBOT (Walks Up & Down) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <DollCompanion />
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Ticker (sebg.ch signature) */}
      <div className="mt-12 w-full overflow-hidden bg-white/95 backdrop-blur-md border-y border-amber-200/80 py-3.5 select-none shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-600 shrink-0">
            <span className="text-amber-500 font-bold">&bull;</span>
            <span className="text-slate-900 font-bold">ASPIRING SOFTWARE ENGINEER</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>FULL-STACK DEVELOPMENT</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>CLOUD &amp; DEVOPS</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>AI &amp; NLP ENTHUSIAST</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span className="text-amber-700 font-bold">REACT.JS / NEXT.JS</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>PYTHON &amp; FLASK</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span className="text-amber-700 font-bold">AWS &amp; TERRAFORM</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>ASP.NET MVC &amp; C#</span>
          </div>
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-600 shrink-0 ml-8">
            <span className="text-amber-500 font-bold">&bull;</span>
            <span className="text-slate-900 font-bold">ASPIRING SOFTWARE ENGINEER</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>FULL-STACK DEVELOPMENT</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>CLOUD &amp; DEVOPS</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>AI &amp; NLP ENTHUSIAST</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span className="text-amber-700 font-bold">REACT.JS / NEXT.JS</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>PYTHON &amp; FLASK</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span className="text-amber-700 font-bold">AWS &amp; TERRAFORM</span>
            <span className="text-amber-500 font-bold">&bull;</span>
            <span>ASP.NET MVC &amp; C#</span>
          </div>
        </div>
      </div>
    </section>
  );
}
