"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [timeString, setTimeString] = useState("");

  // Live real-time Indian Standard Time (Bengaluru) ticker
  useEffect(() => {
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
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", code: "01" },
    { name: "Projects", href: "#projects", code: "02" },
    { name: "Contact", href: "#contact", code: "03" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-amber-200/80 py-3 shadow-md shadow-amber-900/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Identity & Status & Coordinates (Swiss Style) */}
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-all">
                JM
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-amber-700 transition-colors">
                  V Jahnavi Murthy
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-amber-700 font-semibold">
                  Software Engineer
                </span>
              </div>
            </a>

            {/* Live Status & Coordinates ticker */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-200/80 text-[11px] font-mono text-slate-600 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-700 font-bold">AVAILABLE</span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-slate-600 font-medium">{timeString || "16:45"} IST</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 relative ${
                    isActive
                      ? "text-amber-900 bg-amber-100/90 font-bold border border-amber-300"
                      : "text-slate-600 hover:text-amber-800 hover:bg-amber-50/70"
                  }`}
                >
                  <span className="text-amber-600 mr-1.5 opacity-80">[{link.code}]</span>
                  <span>{link.name}</span>
                </a>
              );
            })}

            <div className="ml-3 pl-3 border-l border-amber-200/80">
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </nav>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2.5 rounded-xl bg-white text-slate-700 hover:text-amber-700 hover:bg-amber-50 border border-amber-200 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5 text-amber-600" /> : <Menu className="w-5 h-5 text-amber-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-amber-200 px-6 pt-4 pb-8 transition-all animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-100 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-700 font-bold">AVAILABLE FOR WORK</span>
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
                      ? "text-amber-900 bg-amber-100/90 font-bold border border-amber-300"
                      : "text-slate-700 hover:text-amber-700 hover:bg-amber-50"
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-amber-600 opacity-80">[{link.code}]</span>
                </a>
              );
            })}

            <div className="pt-3">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md shadow-amber-500/30"
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
