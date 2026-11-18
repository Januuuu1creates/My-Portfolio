"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-amber-200/80 py-16 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-amber-200/60">
          {/* Brand Signature */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-mono font-bold text-xs shadow-md shadow-amber-500/25">
                JM
              </div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight uppercase">
                V Jahnavi Murthy
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500">
              Aspiring Software Engineer &bull; Full-Stack Developer &bull; Cloud &amp; AI
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-slate-600">
            <a href="#hero" className="hover:text-amber-700 transition-colors">
              [00] Top
            </a>
            <a href="#about" className="hover:text-amber-700 transition-colors">
              [01] About
            </a>
            <a href="#projects" className="hover:text-amber-700 transition-colors">
              [02] Work
            </a>
            <a href="#contact" className="hover:text-amber-700 transition-colors">
              [03] Contact
            </a>
          </div>

          {/* Social Icons & Back to top button */}
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com/in/jahnavi-murthy-013250240/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white border border-amber-200/80 flex items-center justify-center text-slate-700 hover:text-[#0A66C2] hover:border-amber-300 shadow-xs transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
            </a>

            <a
              href="mailto:jahnavimurthy878@gmail.com"
              className="w-10 h-10 rounded-xl bg-white border border-amber-200/80 flex items-center justify-center text-slate-700 hover:text-amber-700 hover:border-amber-300 shadow-xs transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 text-amber-600" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/25 hover:-translate-y-0.5 transition-all cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p className="text-slate-600 font-medium">
            &copy; 2026 V Jahnavi Murthy. All rights reserved.
          </p>
          <p className="text-slate-500">
            Inspired by Swiss Editorial Design &bull; Next.js 16 &bull; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
