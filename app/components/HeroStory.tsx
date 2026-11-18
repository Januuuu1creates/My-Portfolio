"use client";

import React, { useState } from "react";
import { ArrowDownRight, Mail, Copy, Check, Sparkles, Compass } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import LiveAnimatedDoll from "./LiveAnimatedDoll";

export default function HeroStory() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("jahnavimurthy1111@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="introduction"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden border-b border-white/10"
    >
      {/* Swiss Coordinates & Location (sebg.ch aesthetic) */}
      <div className="absolute top-24 left-8 text-xs font-mono text-violet-300/50 select-none pointer-events-none hidden sm:block">
        + 12.9716° N, 77.5946° E &bull; BENGALURU
      </div>
      <div className="absolute top-24 right-8 text-xs font-mono text-sky-300/50 select-none pointer-events-none hidden sm:block">
        + CHAPTER 01 &bull; INTRODUCTION
      </div>

      {/* Cinematic Ambient Violet & Electric Blue Glow Spheres */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[550px] bg-violet-600/15 rounded-full blur-[150px] pointer-events-none -z-10 animate-violet-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[450px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-blue-glow" />

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Conversational Greeting & Narrative Intro */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Status Monospace Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-violet-500/30 text-xs font-mono text-violet-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold tracking-wider">AVAILABLE &bull; 2026 ROLES</span>
            </div>

            {/* Conversational Greeting Requested by User */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-slate-900/40 border border-violet-500/30 backdrop-blur-md shadow-lg">
              <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed">
                <span className="text-violet-400 font-bold">&ldquo;Hi, I&apos;m Jahnavi.</span>{" "}
                Welcome to my little corner of the internet. Scroll down and I&apos;ll show you around.&rdquo;
              </p>
            </div>

            {/* Prominent Name Display */}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold mb-1">
                MEET THE ENGINEER
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[1.05] uppercase">
                Jahnavi <br />
                <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
                  Murthy
                </span>
              </h1>
            </div>

            {/* Headline Subtitle */}
            <p className="text-base sm:text-xl font-medium text-slate-200 max-w-2xl leading-relaxed">
              <span className="text-white font-bold">Aspiring Software Engineer</span>{" "}
              <span className="text-violet-400 font-mono">/</span>{" "}
              <span className="text-violet-300 font-semibold">Full-Stack Developer</span>{" "}
              <span className="text-violet-400 font-mono">/</span>{" "}
              <span className="text-sky-300">Cloud &amp; AI Enthusiast</span>
            </p>

            {/* Editorial Bio Excerpt */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
              Combining the analytical rigor of <strong className="text-white">Computer Science &amp; Physics</strong> with modern full-stack engineering to build reliable, high-performance web systems and intelligent software.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#about"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 hover:brightness-110 shadow-lg shadow-violet-600/30 hover:scale-[1.02] transition-all duration-200"
              >
                <span>Explore My Story [02]</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-white bg-slate-900/80 hover:bg-white/10 hover:border-violet-400/50 border border-white/15 backdrop-blur-md shadow-xs transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Featured Work [05]</span>
              </a>
            </div>

            {/* Verified Social & Contact Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-mono">
              <a
                href="https://www.linkedin.com/in/jahnavi-murthy-013250240/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 hover:border-violet-400/50 text-slate-200 hover:text-white shadow-xs transition-all group"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span className="font-semibold">LINKEDIN ↗</span>
              </a>

              <a
                href="https://github.com/Januuuu1creates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 hover:border-violet-400/50 text-slate-200 hover:text-white shadow-xs transition-all group"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-200 group-hover:text-violet-400 transition-colors" />
                <span className="font-semibold">GITHUB ↗</span>
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 hover:border-violet-400/50 text-slate-200 hover:text-white shadow-xs transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-semibold">COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Articulated Virtual Guide Companion Doll */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <LiveAnimatedDoll />
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Ticker (Cinematic Storyteller) */}
      <div className="mt-12 w-full overflow-hidden bg-slate-950/70 backdrop-blur-md border-y border-white/10 py-3.5 select-none shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-300 shrink-0">
            <span className="text-violet-400 font-bold">&bull;</span>
            <span className="text-white font-bold">JAHNAVI MURTHY</span>
            <span className="text-sky-400 font-bold">&bull;</span>
            <span>COMPUTER SCIENCE &amp; PHYSICS</span>
            <span className="text-violet-400 font-bold">&bull;</span>
            <span className="text-sky-300 font-semibold">GAINWELL TECHNOLOGIES APPRENTICE</span>
            <span className="text-violet-400 font-bold">&bull;</span>
            <span>FULL-STACK DEVELOPMENT</span>
            <span className="text-sky-400 font-bold">&bull;</span>
            <span className="text-violet-300 font-semibold">AWS &amp; TERRAFORM IAC</span>
            <span className="text-violet-400 font-bold">&bull;</span>
            <span>PYTHON &amp; NLP SYSTEMS</span>
            <span className="text-sky-400 font-bold">&bull;</span>
            <span>C# &amp; ASP.NET MVC</span>
            <span className="text-violet-400 font-bold">&bull;</span>
            <span>REACT.JS &amp; NEXT.JS</span>
          </div>
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-300 shrink-0 ml-8">
            <span className="text-violet-400 font-bold">&bull;</span>
            <span className="text-white font-bold">JAHNAVI MURTHY</span>
            <span className="text-sky-400 font-bold">&bull;</span>
            <span>COMPUTER SCIENCE &amp; PHYSICS</span>
            <span className="text-violet-400 font-bold">&bull;</span>
            <span className="text-sky-300 font-semibold">GAINWELL TECHNOLOGIES APPRENTICE</span>
            <span className="text-violet-400 font-bold">&bull;</span>
            <span>FULL-STACK DEVELOPMENT</span>
            <span className="text-sky-400 font-bold">&bull;</span>
            <span className="text-violet-300 font-semibold">AWS &amp; TERRAFORM IAC</span>
            <span className="text-violet-400 font-bold">&bull;</span>
            <span>PYTHON &amp; NLP SYSTEMS</span>
            <span className="text-sky-400 font-bold">&bull;</span>
            <span>C# &amp; ASP.NET MVC</span>
            <span className="text-violet-400 font-bold">&bull;</span>
            <span>REACT.JS &amp; NEXT.JS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
