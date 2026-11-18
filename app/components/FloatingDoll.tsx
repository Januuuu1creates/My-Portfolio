"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function FloatingDoll() {
  const [visible, setVisible] = useState(false);
  const [speech, setSpeech] = useState("Hi! I'm Jahnavi's 3D robot! Scroll down to explore! ✨");
  const [showBubble, setShowBubble] = useState(true);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; char: string }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 280);

      const sections = [
        { id: "hero", speech: "Hi! Welcome to Jahnavi Murthy's portfolio! 💛" },
        { id: "about", speech: "💡 Check out her 17+ skills: React, Next.js, Python, AWS & Terraform!" },
        { id: "experience", speech: "💼 Software Development Apprentice at Gainwell Technologies, Bangalore!" },
        { id: "projects", speech: "🚀 4 featured projects with architecture, objectives & verified repos!" },
        { id: "certifications", speech: "📜 Cloud, Python AI, and Full-Stack Engineering credentials!" },
        { id: "contact", speech: "💌 Reach Jahnavi directly at jahnavimurthy1111@gmail.com!" },
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

  const handleRobotTap = () => {
    const emojis = ["✨", "💛", "🌟", "⭐", "🎉"];
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
      id="floating-realistic-robot"
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
          <div className="p-3 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/20 text-xs font-mono text-slate-100 shadow-2xl flex items-start justify-between gap-2">
            <span>{speech}</span>
            <button
              onClick={() => setShowBubble(false)}
              className="text-slate-400 hover:text-amber-400 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-950/85 mx-auto -mt-[1px] ml-auto mr-8" />
        </div>
      )}

      {/* Mini Realistic 3D Robot that walks up & down */}
      <div
        onClick={handleRobotTap}
        className="relative group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 animate-walk-up-down"
        title="I'm Jahnavi's realistic 3D mini robot! Tap me!"
      >
        <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-lg animate-pulse" />

        {/* Realistic Mini Cutout Image */}
        <div className="relative w-20 h-26 flex flex-col items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/robot_realistic.png"
            alt="Jahnavi's 3D Robot"
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(245,158,11,0.5)]"
          />

          {/* Mini JAHNAVI Name Badge */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-950/95 border border-amber-400/90 shadow-[0_0_10px_rgba(245,158,11,0.8)] text-[7px] font-mono font-black text-amber-200 tracking-widest whitespace-nowrap">
            JAHNAVI
          </div>
        </div>
      </div>
    </div>
  );
}
