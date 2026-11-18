"use client";

import React from "react";
import { ArrowUp, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function FooterStory() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030712]/90 backdrop-blur-xl border-t border-white/10 py-16 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand Signature */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-sky-500 flex items-center justify-center text-white font-mono font-black text-xs shadow-md shadow-violet-500/25">
                JM
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight uppercase">
                Jahnavi Murthy
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Aspiring Software Engineer &bull; Full-Stack Developer &bull; Cloud &amp; AI
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono uppercase tracking-wider text-slate-300">
            <a href="#introduction" className="hover:text-violet-300 transition-colors">
              [01] Meet
            </a>
            <a href="#about" className="hover:text-violet-300 transition-colors">
              [02] About
            </a>
            <a href="#journey" className="hover:text-violet-300 transition-colors">
              [03] Journey
            </a>
            <a href="#workbench" className="hover:text-violet-300 transition-colors">
              [04] Workbench
            </a>
            <a href="#projects" className="hover:text-violet-300 transition-colors">
              [05] Works
            </a>
            <a href="#certifications" className="hover:text-violet-300 transition-colors">
              [06] Certs
            </a>
            <a href="#contact" className="hover:text-violet-300 transition-colors">
              [07] Connect
            </a>
          </div>

          {/* Social Icons & Back to top button */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/jahnavi-murthy-013250240/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-violet-400/50 shadow-xs transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
            </a>

            <a
              href="https://github.com/Januuuu1creates"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-violet-400/50 shadow-xs transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4 text-slate-200" />
            </a>

            <a
              href="mailto:jahnavimurthy1111@gmail.com"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-violet-300 hover:border-violet-400/50 shadow-xs transition-all"
              aria-label="Email Jahnavi"
            >
              <Mail className="w-4 h-4 text-violet-400" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-violet-600/30 hover:-translate-y-0.5 transition-all cursor-pointer ml-2"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p className="text-slate-300 font-medium">
            &copy; 2026 Jahnavi Murthy. All rights reserved.
          </p>
          <p className="text-slate-400 flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-violet-400 fill-violet-400" />
            <span>Next.js 16, Three.js &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
