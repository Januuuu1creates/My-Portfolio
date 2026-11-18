"use client";

import React from "react";
import { ArrowUp, Mail, Heart, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function FooterStory() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black/30 backdrop-blur-xl border-t border-pink-500/20 py-14 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-pink-500/15">
          {/* Brand Signature */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 via-purple-400 to-sky-400 flex items-center justify-center text-white font-mono font-black text-xs shadow-md shadow-pink-500/20">
                JM
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                Jahnavi Murthy
              </span>
            </div>
            <p className="text-xs font-mono text-purple-200/80">
              Aspiring Software Engineer &bull; Full-Stack Developer &bull; Cloud &amp; AI
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono uppercase tracking-wider text-slate-300">
            <a href="#introduction" className="hover:text-pink-300 transition-colors">
              Meet
            </a>
            <a href="#about" className="hover:text-pink-300 transition-colors">
              About
            </a>
            <a href="#journey" className="hover:text-pink-300 transition-colors">
              Journey
            </a>
            <a href="#skills-section" className="hover:text-pink-300 transition-colors">
              Skills
            </a>
            <a href="#workbench" className="hover:text-pink-300 transition-colors">
              Workbench
            </a>
            <a href="#projects" className="hover:text-pink-300 transition-colors">
              Works
            </a>
            <a href="#certifications" className="hover:text-pink-300 transition-colors">
              Certs
            </a>
            <a href="#contact" className="hover:text-pink-300 transition-colors">
              Connect
            </a>
          </div>

          {/* Social Icons & Back to top button */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/jahnavi-murthy-013250240/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-pink-400/50 shadow-xs transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
            </a>

            <a
              href="https://github.com/Januuuu1creates"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-400/50 shadow-xs transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4 text-slate-200" />
            </a>

            <a
              href="mailto:jahnavimurthy1111@gmail.com"
              className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-pink-300 hover:border-pink-400/50 shadow-xs transition-all"
              aria-label="Email Jahnavi"
            >
              <Mail className="w-4 h-4 text-pink-400" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 hover:brightness-110 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-pink-500/20 hover:-translate-y-0.5 transition-all cursor-pointer ml-2"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p className="text-purple-200/80 font-medium">
            &copy; 2026 Jahnavi Murthy. All rights reserved.
          </p>
          <p className="text-slate-400 flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            <span>Next.js 16, Three.js &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
