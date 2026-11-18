"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, MessageSquare, ChevronUp, ChevronDown, Radio } from "lucide-react";
import { soundFX } from "./soundFx";

interface ChapterComment {
  id: string;
  badge: string;
  speech: string;
}

const CHAPTER_COMMENTS: ChapterComment[] = [
  {
    id: "introduction",
    badge: "01 / MEET",
    speech: "Hi! Welcome to my little corner of the internet! Scroll down and I'll show you around! ✨",
  },
  {
    id: "about",
    badge: "02 / ABOUT ME",
    speech: "Jahnavi combines Computer Science with Physics — analytical rigor meets practical software craftsmanship! 💡",
  },
  {
    id: "journey",
    badge: "03 / JOURNEY",
    speech: "Software Development Apprentice at Gainwell Technologies, Bangalore! Contributing to agile enterprise engineering! 💼",
  },
  {
    id: "skills-section",
    badge: "04-A / PROGRAMMING SKILLS",
    speech: "Java (90%), Python (75%), C# (75%), HTML & CSS (80%), JS (70%), Flask (70%), Git (70%) and ML (60%) with animated proficiency bars! ⚡",
  },
  {
    id: "workbench",
    badge: "04-B / WORKBENCH",
    speech: "Interactive developer workbench: Java, Python, C#, JS, SQL, AWS & Terraform! Click any skill above to inspect how she uses it! 🛠️",
  },
  {
    id: "projects",
    badge: "05 / PROJECTS",
    speech: "AXIOM AI Agent, AI Resume Parser, Cloud Infrastructure Automation & AI Cooking Assistant with verified GitHub code! 🚀",
  },
  {
    id: "certifications",
    badge: "06 / CERTS",
    speech: "Verified technical credentials across Cloud Infrastructure, Python & AI, and Full-Stack Web! 📜",
  },
  {
    id: "contact",
    badge: "07 / CONNECT",
    speech: "Enjoyed exploring? Drop Jahnavi a message directly at jahnavimurthy1111@gmail.com! 💌",
  },
];

export default function FloatingCompanion() {
  const [visible, setVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState(CHAPTER_COMMENTS[0].speech);
  const [currentBadge, setCurrentBadge] = useState(CHAPTER_COMMENTS[0].badge);
  const [showBubble, setShowBubble] = useState(true);
  const [sparkles, setSparkles] = useState<{ id: number; char: string }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 320);

      const scrollPos = scrollY + window.innerHeight * 0.45;
      for (const ch of CHAPTER_COMMENTS) {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentSpeech(ch.speech);
            setCurrentBadge(ch.badge);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTap = () => {
    soundFX.playSparkle();
    const emojis = ["✨", "🌟", "💜", "💙", "⭐", "🎉"];
    const id = Date.now();
    setSparkles((prev) => [
      ...prev,
      { id, char: emojis[Math.floor(Math.random() * emojis.length)] },
    ]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 1200);

    setShowBubble(true);
  };

  if (!visible) return null;

  return (
    <div
      id="docked-companion"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto"
      role="region"
      aria-label="Interactive Companion Guide"
    >
      {/* Floating Sparkles */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="absolute -top-6 right-8 text-xl pointer-events-none animate-bounce"
        >
          {sp.char}
        </div>
      ))}

      {/* Speech Bubble */}
      {!isMinimized && showBubble && (
        <div className="relative mb-2 max-w-[250px] sm:max-w-[290px] animate-in fade-in duration-200">
          <div className="p-3 sm:p-3.5 rounded-2xl scifi-glass-panel border-cyan-400/40 text-xs text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                <span>{currentBadge}</span>
              </div>
              <p className="text-[11.5px] sm:text-xs text-slate-200 leading-snug">
                {currentSpeech}
              </p>
            </div>

            <button
              onClick={() => setShowBubble(false)}
              className="text-slate-400 hover:text-cyan-300 p-0.5 rounded cursor-pointer shrink-0"
              aria-label="Dismiss speech bubble"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speech Bubble Tip */}
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-950/95 ml-auto mr-8 -mt-[1px]" />
        </div>
      )}

      {/* Docked Companion Robot Mini Widget */}
      <div className="flex items-center gap-2">
        {/* Toggle Minimize Button */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-sky-500/30 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-colors shadow-xs cursor-pointer text-[10px] font-mono"
          title={isMinimized ? "Expand Companion" : "Minimize Companion"}
          aria-label={isMinimized ? "Expand Companion" : "Minimize Companion"}
        >
          {isMinimized ? (
            <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>

        {/* Mini Realistic 3D Robot that walks up & down */}
        <div
          onClick={handleTap}
          className={`relative group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 animate-walk-up-down ${
            isMinimized ? "opacity-75 hover:opacity-100" : ""
          }`}
          title="I'm Jahnavi's 3D companion robot! Tap me!"
        >
          {/* Subtle Glow halo */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/25 blur-lg animate-pulse pointer-events-none" />

          {/* Realistic Mini Cutout Image */}
          <div className="relative w-20 h-28 flex flex-col items-center justify-center animate-robot-breathe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/robot_realistic.png"
              alt="Jahnavi's 3D Companion"
              className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(56,189,248,0.5)] pointer-events-none"
            />

            {/* Mini JAHNAVI Name Badge */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-950/95 border border-cyan-400/90 shadow-[0_0_10px_rgba(56,189,248,0.8)] text-[7px] font-mono font-black text-cyan-200 tracking-widest whitespace-nowrap">
              JAHNAVI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
