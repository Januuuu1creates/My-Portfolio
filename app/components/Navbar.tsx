"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Sparkles } from "lucide-react";
import { soundFX } from "./soundFx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [timeString, setTimeString] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundFX.getMuted());

    // Bengaluru live clock
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(now.toLocaleTimeString("en-GB", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = [
        "introduction",
        "about",
        "journey",
        "workbench",
        "projects",
        "certifications",
        "contact",
      ];
      const scrollPosition = window.scrollY + 140;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const next = soundFX.toggleMute();
    setIsMuted(next);
  };

  const navLinks = [
    { name: "Meet", href: "#introduction", code: "01" },
    { name: "About", href: "#about", code: "02" },
    { name: "Journey", href: "#journey", code: "03" },
    { name: "Workbench", href: "#workbench", code: "04" },
    { name: "Projects", href: "#projects", code: "05" },
    { name: "Certs", href: "#certifications", code: "06" },
    { name: "Connect", href: "#contact", code: "07" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Identity & Status */}
          <div className="flex items-center gap-4">
            <a
              href="#introduction"
              className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white font-mono font-black text-sm shadow-md shadow-violet-500/30 group-hover:shadow-violet-500/60 transition-all">
                JM
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base sm:text-lg tracking-tight group-hover:text-violet-300 transition-colors">
                  Jahnavi Murthy
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-sky-400 font-semibold">
                  Software Engineer
                </span>
              </div>
            </a>

            {/* Live Status & Coordinates ticker */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-[11px] font-mono text-slate-300 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-emerald-400 font-bold">AVAILABLE</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-slate-300">{timeString || "14:15"} IST</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "text-violet-200 bg-violet-600/25 font-bold border border-violet-500/40 shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-violet-400 mr-1 opacity-70">[{link.code}]</span>
                  <span>{link.name}</span>
                </a>
              );
            })}

            {/* Audio Mute/Unmute Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer ml-1"
              title={isMuted ? "Unmute audio chimes" : "Mute audio chimes"}
              aria-label="Toggle sound"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-violet-400" />
              )}
            </button>

            {/* CTA Talk Button */}
            <div className="ml-2 pl-2 border-l border-white/10">
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 shadow-md shadow-violet-600/30 hover:scale-[1.02] transition-all"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </nav>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              type="button"
              className="p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white border border-white/10"
              title={isMuted ? "Unmute sound" : "Mute sound"}
              aria-label="Toggle sound"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-violet-400" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 border border-white/10 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-5 h-5 text-violet-400" />
              ) : (
                <Menu className="w-5 h-5 text-violet-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-white/15 px-6 pt-4 pb-8 transition-all animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 font-bold">AVAILABLE FOR WORK</span>
            </div>
            <span>{timeString} IST</span>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono uppercase tracking-wider transition-all ${
                    isActive
                      ? "text-violet-200 bg-violet-600/25 font-bold border border-violet-500/40"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-violet-400 opacity-80">[{link.code}]</span>
                </a>
              );
            })}

            <div className="pt-3">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 shadow-md shadow-violet-600/30"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
