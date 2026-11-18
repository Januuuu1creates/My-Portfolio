"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Sparkles } from "lucide-react";
import { soundFX } from "./soundFx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundFX.getMuted());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = [
        "introduction",
        "about",
        "journey",
        "skills-section",
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
    { name: "Meet", href: "#introduction" },
    { name: "About", href: "#about" },
    { name: "Journey", href: "#journey" },
    { name: "Skills", href: "#skills-section" },
    { name: "Workbench", href: "#workbench" },
    { name: "Projects", href: "#projects" },
    { name: "Certs", href: "#certifications" },
    { name: "Connect", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#12091d]/85 backdrop-blur-2xl border-b border-pink-500/15 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Identity & Status */}
          <div className="flex items-center gap-3">
            <a
              href="#introduction"
              className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            >
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 via-purple-400 to-sky-400 flex items-center justify-center text-white font-mono font-black text-sm shadow-[0_0_20px_rgba(244,114,182,0.4)] group-hover:shadow-[0_0_25px_rgba(244,114,182,0.7)] transition-all">
                <span>JM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base sm:text-lg tracking-tight group-hover:text-pink-300 transition-colors">
                  Jahnavi Murthy
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-pink-300/80 font-medium flex items-center gap-1">
                  <span>Software Engineer</span>
                  <span className="text-purple-400">&bull;</span>
                  <span className="text-slate-400">CS &amp; Physics</span>
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links (Minimal pill style) */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? "text-pink-200 bg-gradient-to-r from-pink-500/25 to-purple-500/25 font-bold border border-pink-400/40 shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span>{link.name}</span>
                </a>
              );
            })}

            {/* Audio Mute/Unmute Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className="p-2 rounded-full text-slate-400 hover:text-pink-300 hover:bg-white/5 transition-all cursor-pointer ml-1"
              title={isMuted ? "Unmute audio" : "Mute audio"}
              aria-label="Toggle sound"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-pink-400" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10"
              aria-label="Toggle audio"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-pink-400" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10"
              aria-label="Open menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-3 mx-4 p-4 rounded-3xl bg-[#0b0d1e]/95 backdrop-blur-2xl border border-pink-500/20 shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-pink-200 hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
