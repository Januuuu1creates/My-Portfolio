"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950/80 backdrop-blur-xl border-t border-white/10 py-16 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand Signature */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-mono font-black text-xs shadow-md shadow-amber-500/25">
                JM
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight uppercase">
                V Jahnavi Murthy
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Aspiring Software Engineer &bull; Full-Stack Developer &bull; Cloud &amp; AI
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono uppercase tracking-wider text-slate-300">
            <a href="#hero" className="hover:text-amber-300 transition-colors">
              [00] Top
            </a>
            <a href="#about" className="hover:text-amber-300 transition-colors">
              [01] About
            </a>
            <a href="#experience" className="hover:text-amber-300 transition-colors">
              [02] Exp
            </a>
            <a href="#projects" className="hover:text-amber-300 transition-colors">
              [03] Work
            </a>
            <a href="#certifications" className="hover:text-amber-300 transition-colors">
              [04] Certs
            </a>
            <a href="#contact" className="hover:text-amber-300 transition-colors">
              [05] Contact
            </a>
          </div>

          {/* Social Icons & Back to top button */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/jahnavi-murthy-013250240/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-amber-400/50 shadow-xs transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
            </a>

            <a
              href="https://github.com/Januuuu1creates"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-amber-400/50 shadow-xs transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4 text-slate-200" />
            </a>

            <a
              href="mailto:jahnavimurthy1111@gmail.com"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-300 hover:border-amber-400/50 shadow-xs transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 text-amber-400" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-400/25 hover:-translate-y-0.5 transition-all cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p className="text-slate-300 font-medium">
            &copy; 2026 V Jahnavi Murthy. All rights reserved.
          </p>
          <p className="text-slate-400">
            Inspired by Swiss Editorial Design &bull; Next.js 16 &bull; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
