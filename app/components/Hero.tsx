"use client";

import React, { useState } from "react";
import { ArrowDownRight, Mail, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import DollCompanion from "./DollCompanion";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("jahnavimurthy1111@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden border-b border-white/10"
    >
      {/* Swiss Coordinate Crosshair Markers (sebg.ch Signature) */}
      <div className="absolute top-24 left-8 text-xs font-mono text-amber-300/60 select-none pointer-events-none hidden sm:block">
        + 12.9716° N, 77.5946° E &bull; BENGALURU
      </div>
      <div className="absolute top-24 right-8 text-xs font-mono text-amber-300/60 select-none pointer-events-none hidden sm:block">
        + PORTFOLIO 2026 EDITION
      </div>

      {/* Floating Warm Bokeh Ambient Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-16 left-12 w-80 h-80 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none -z-10 animate-bokeh" />
      <div className="absolute bottom-12 right-12 w-80 h-80 bg-amber-400/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-bokeh [animation-delay:2s]" />

      {/* Swiss Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Typographic Statement & Quick Links (sebg.ch style) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Status Monospace Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-400/40 text-xs font-mono text-amber-200 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold tracking-wider">AVAILABLE &bull; 2026 ROLES</span>
            </div>

            {/* Giant Display Name (Swiss Grotesque Bold) */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[1.05] uppercase drop-shadow-lg">
              V Jahnavi <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                Murthy
              </span>
            </h1>

            {/* Headline Subtitle */}
            <p className="text-base sm:text-xl font-medium text-slate-200 max-w-2xl leading-relaxed">
              <span className="text-white font-bold">Aspiring Software Engineer</span>{" "}
              <span className="text-amber-400 font-mono">/</span>{" "}
              <span className="text-amber-300 font-semibold">Full-Stack Developer</span>{" "}
              <span className="text-amber-400 font-mono">/</span>{" "}
              <span className="text-slate-300">Cloud &amp; AI Enthusiast</span>
            </p>

            {/* Editorial Bio Excerpt */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
              Crafting innovative web applications, engineering cloud infrastructure with Terraform,
              and unlocking intelligence through Python &amp; NLP models.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:brightness-110 shadow-lg shadow-amber-500/30 hover:scale-[1.02] transition-all duration-200"
              >
                <span>View My Work [03]</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-white bg-slate-900/80 hover:bg-white/10 hover:border-amber-400/50 border border-white/15 backdrop-blur-md shadow-xs transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Contact Me [05]</span>
              </a>
            </div>

            {/* Verified Social & Contact Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <a
                href="https://www.linkedin.com/in/jahnavi-murthy-013250240/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 hover:border-amber-400/50 text-slate-200 hover:text-white shadow-xs transition-all group"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span className="font-semibold">LINKEDIN ↗</span>
              </a>

              <a
                href="https://github.com/Januuuu1creates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 hover:border-amber-400/50 text-slate-200 hover:text-white shadow-xs transition-all group"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-200 group-hover:text-amber-400 transition-colors" />
                <span className="font-semibold">GITHUB ↗</span>
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 hover:border-amber-400/50 text-slate-200 hover:text-white shadow-xs transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold">COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: THE REALISTIC 3D ROBOT COMPANION */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <DollCompanion />
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Ticker (sebg.ch signature) */}
      <div className="mt-12 w-full overflow-hidden bg-slate-950/70 backdrop-blur-md border-y border-white/10 py-3.5 select-none shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-300 shrink-0">
            <span className="text-amber-400 font-bold">&bull;</span>
            <span className="text-white font-bold">ASPIRING SOFTWARE ENGINEER</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>GAINWELL TECHNOLOGIES APPRENTICE</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>FULL-STACK DEVELOPMENT</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>CLOUD &amp; DEVOPS</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>AI &amp; NLP ENTHUSIAST</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span className="text-amber-300 font-bold">REACT.JS / NEXT.JS</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>PYTHON &amp; FLASK</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span className="text-amber-300 font-bold">AWS &amp; TERRAFORM</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>ASP.NET MVC &amp; C#</span>
          </div>
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-300 shrink-0 ml-8">
            <span className="text-amber-400 font-bold">&bull;</span>
            <span className="text-white font-bold">ASPIRING SOFTWARE ENGINEER</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>GAINWELL TECHNOLOGIES APPRENTICE</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>FULL-STACK DEVELOPMENT</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>CLOUD &amp; DEVOPS</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>AI &amp; NLP ENTHUSIAST</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span className="text-amber-300 font-bold">REACT.JS / NEXT.JS</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>PYTHON &amp; FLASK</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span className="text-amber-300 font-bold">AWS &amp; TERRAFORM</span>
            <span className="text-amber-400 font-bold">&bull;</span>
            <span>ASP.NET MVC &amp; C#</span>
          </div>
        </div>
      </div>
    </section>
  );
}
