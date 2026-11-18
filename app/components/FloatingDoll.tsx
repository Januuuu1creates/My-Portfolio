"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Heart } from "lucide-react";

export default function FloatingDoll() {
  const [visible, setVisible] = useState(false);
  const [speech, setSpeech] = useState("Hi! I'm Jahnavi's bubbly robot! Scroll down to explore! 🫧");
  const [showBubble, setShowBubble] = useState(true);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; char: string }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 280);

      const sections = [
        { id: "hero", speech: "Hi! Welcome to Jahnavi Murthy's portfolio! 💛" },
        { id: "about", speech: "💡 Check out her 17+ skills: React, Next.js, Python, AWS & Terraform!" },
        { id: "projects", speech: "🚀 4 featured projects! Click any to inspect the case study!" },
        { id: "contact", speech: "💌 Have an opportunity? Drop Jahnavi a message right here!" },
      ];

      const scrollPos = scrollY + window.innerHeight * 0.4;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setSpeech(sec.speech);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pupil movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dollEl = document.getElementById("floating-bubbly-robot");
      if (!dollEl) return;
      const rect = dollEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const dist = Math.min(Math.hypot(deltaX, deltaY) / 20, 4);

      setEyeOffset({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleRobotTap = () => {
    const emojis = ["✨", "💛", "🫧", "🌟", "⭐", "🎉"];
    const id = Date.now();
    setFloatingParticles((prev) => [
      ...prev,
      { id, char: emojis[Math.floor(Math.random() * emojis.length)] },
    ]);
    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((h) => h.id !== id));
    }, 1200);

    setShowBubble(true);
  };

  if (!visible) return null;

  return (
    <div
      id="floating-bubbly-robot"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {/* Floating Sparkles */}
      {floatingParticles.map((h) => (
        <div
          key={h.id}
          className="absolute -top-8 right-8 text-xl pointer-events-none animate-bounce"
        >
          {h.char}
        </div>
      ))}

      {/* Floating Speech Bubble */}
      {showBubble && (
        <div className="relative mb-2 max-w-[240px] sm:max-w-[280px]">
          <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-amber-200 text-xs font-mono text-slate-800 shadow-xl shadow-amber-900/10 flex items-start justify-between gap-2">
            <span>{speech}</span>
            <button
              onClick={() => setShowBubble(false)}
              className="text-slate-400 hover:text-amber-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white mx-auto -mt-[1px] ml-auto mr-8" />
        </div>
      )}

      {/* Mini Bubbly Robot that walks up & down */}
      <div
        onClick={handleRobotTap}
        className="relative group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 animate-walk-up-down"
        title="I'm Jahnavi's bubbly mini robot! Tap me!"
      >
        <div className="absolute inset-0 rounded-3xl bg-amber-400/25 blur-md animate-pulse" />

        <div className="relative w-22 h-26 rounded-3xl border-2 border-amber-200 shadow-xl shadow-amber-900/20 bg-gradient-to-b from-white via-[#FAF7F2] to-[#EAE5DC] flex flex-col items-center justify-between p-1.5">
          {/* Mini Bubbly Head */}
          <div className="relative w-16 h-14 rounded-2xl bg-[#FFFFFF] border border-amber-300 shadow-inner flex items-center justify-center mt-0.5">
            {/* Glowing Golden Visor */}
            <div className="w-13 h-10 rounded-xl bg-[#18120E] border-2 border-amber-400 shadow-xs shadow-amber-400/50 flex items-center justify-around px-1 relative">
              {/* Cute Blush dots */}
              <div className="absolute left-0.5 bottom-1 w-1.5 h-1 rounded-full bg-amber-400/60" />
              <div className="absolute right-0.5 bottom-1 w-1.5 h-1 rounded-full bg-amber-400/60" />

              {/* Left Eye */}
              <div
                className="w-3.5 h-4.5 rounded-full bg-black relative border border-amber-500/80"
                style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}
              >
                <div className="w-1 h-1 bg-white rounded-full ml-0.5 mt-0.5" />
              </div>
              {/* Right Eye */}
              <div
                className="w-3.5 h-4.5 rounded-full bg-black relative border border-amber-500/80"
                style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}
              >
                <div className="w-1 h-1 bg-white rounded-full ml-0.5 mt-0.5" />
              </div>
            </div>
          </div>

          {/* Mini JAHNAVI Name Badge */}
          <div className="w-16 h-4.5 rounded-full bg-[#1C1814] border border-amber-400 flex items-center justify-center text-[7.5px] font-mono font-black text-amber-200 tracking-wider">
            JAHNAVI
          </div>

          {/* Mini Walking Boots */}
          <div className="w-14 flex items-center justify-between px-1">
            <div className="w-3.5 h-2 rounded-full bg-[#FAF7F2] border border-amber-300 animate-walk-left-leg" />
            <div className="w-3.5 h-2 rounded-full bg-[#FAF7F2] border border-amber-300 animate-walk-right-leg" />
          </div>
        </div>
      </div>
    </div>
  );
}
