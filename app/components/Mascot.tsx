"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Terminal, Cloud, Brain, RefreshCw } from "lucide-react";

type MoodType = "coder" | "cloud" | "ai" | "sleepy";

interface MascotProps {
  onMoodChange?: (mood: MoodType) => void;
}

export default function Mascot({ onMoodChange }: MascotProps) {
  const [mood, setMood] = useState<MoodType>("coder");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [dialogue, setDialogue] = useState("Hi! I'm Jahnavi's AI Companion. Tap me!");
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse eye-tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      // Max eye pupil travel distance
      const maxDistance = 7;
      const angle = Math.atan2(deltaY, deltaX);
      const moveDistance = Math.min(distance / 25, maxDistance);

      setEyeOffset({
        x: Math.cos(angle) * moveDistance,
        y: Math.sin(angle) * moveDistance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  const changeMood = (newMood: MoodType) => {
    setMood(newMood);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);

    if (onMoodChange) onMoodChange(newMood);

    switch (newMood) {
      case "coder":
        setDialogue("Full-Stack mode: React, Next.js & ASP.NET running fast!");
        break;
      case "cloud":
        setDialogue("Cloud mode: AWS & Terraform automated infrastructure ready!");
        break;
      case "ai":
        setDialogue("AI mode: NLP models, Python & smart embeddings active!");
        break;
      case "sleepy":
        setDialogue("Zzz... compiling background threads... 😴");
        break;
    }
  };

  const handleMascotClick = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    const quotes = [
      "✨ Jahnavi solves problems through clean code!",
      "🚀 Check out the 4 featured projects below!",
      "⚡ ASP.NET + Python + Next.js = The perfect stack!",
      "☁️ Terraform automated all AWS resources seamlessly!",
      "💜 Hit 'Get In Touch' to discuss opportunities!",
      "🎉 Thanks for patting me! Have a wonderful day!",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDialogue(randomQuote);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center select-none"
    >
      {/* Speech Bubble */}
      <div className="relative mb-3 max-w-[280px] sm:max-w-[320px]">
        <div className="px-4 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-purple-500/30 text-xs sm:text-sm text-purple-200 shadow-xl shadow-purple-900/20 text-center animate-in fade-in zoom-in-95 duration-200">
          <span className="font-mono text-purple-400 mr-1.5">&gt;</span>
          {dialogue}
        </div>
        {/* Little bubble triangle */}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-900/90 mx-auto -mt-[1px]" />
      </div>

      {/* Mascot Body */}
      <div
        onClick={handleMascotClick}
        className={`relative w-36 h-36 sm:w-44 sm:h-44 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${
          animating ? "animate-bounce" : ""
        }`}
        title="Click to interact with me!"
      >
        {/* Glow halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/40 via-violet-500/30 to-indigo-500/40 blur-xl animate-pulse" />

        {/* Outer Head Shell */}
        <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-slate-900 via-[#131127] to-[#0A0915] border-2 border-purple-500/40 shadow-2xl shadow-purple-950/60 p-4 flex flex-col items-center justify-between overflow-hidden">
          {/* Subtle Scanline Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

          {/* Top Antenna / Headgear according to Mood */}
          <div className="relative z-10 flex items-center justify-center">
            {mood === "coder" && (
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-[10px] font-mono text-purple-300">
                <Terminal className="w-3 h-3 text-purple-400" />
                <span>DEV</span>
              </div>
            )}
            {mood === "cloud" && (
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-[10px] font-mono text-sky-300">
                <Cloud className="w-3 h-3 text-sky-400" />
                <span>AWS</span>
              </div>
            )}
            {mood === "ai" && (
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-[10px] font-mono text-pink-300">
                <Brain className="w-3 h-3 text-pink-400" />
                <span>NLP</span>
              </div>
            )}
            {mood === "sleepy" && (
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-[10px] font-mono text-indigo-300">
                <span>Zzz</span>
              </div>
            )}
          </div>

          {/* Visor Screen with Eyes */}
          <div className="relative z-10 w-full h-20 sm:h-24 rounded-2xl bg-[#03020A] border border-purple-500/30 flex items-center justify-around px-4 shadow-inner">
            {/* Left Eye */}
            <div className="relative w-8 h-10 sm:w-10 sm:h-12 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-center overflow-hidden">
              {blinking || mood === "sleepy" ? (
                <div className="w-6 h-1 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
              ) : (
                <div
                  className="w-5 h-6 sm:w-6 sm:h-7 rounded-lg bg-gradient-to-tr from-purple-400 to-violet-200 shadow-md shadow-purple-400/80 transition-transform duration-75"
                  style={{
                    transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white ml-1 mt-1 opacity-90" />
                </div>
              )}
            </div>

            {/* Right Eye */}
            <div className="relative w-8 h-10 sm:w-10 sm:h-12 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-center overflow-hidden">
              {blinking || mood === "sleepy" ? (
                <div className="w-6 h-1 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
              ) : (
                <div
                  className="w-5 h-6 sm:w-6 sm:h-7 rounded-lg bg-gradient-to-tr from-purple-400 to-violet-200 shadow-md shadow-purple-400/80 transition-transform duration-75"
                  style={{
                    transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white ml-1 mt-1 opacity-90" />
                </div>
              )}
            </div>
          </div>

          {/* Cute Smile / Mouth */}
          <div className="relative z-10 pb-1">
            <div className="w-6 h-2 rounded-full bg-purple-500/40 border-b-2 border-purple-400" />
          </div>
        </div>
      </div>

      {/* Interactive Controls ("Dress me up / Switch Mode" like sebg.ch) */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 mr-1">
          Role Mode:
        </span>
        <button
          onClick={() => changeMood("coder")}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            mood === "coder"
              ? "bg-purple-600 text-white shadow-sm shadow-purple-500/40 font-bold"
              : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-purple-500/50 hover:text-white"
          }`}
        >
          💻 Full-Stack
        </button>
        <button
          onClick={() => changeMood("cloud")}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            mood === "cloud"
              ? "bg-sky-600 text-white shadow-sm shadow-sky-500/40 font-bold"
              : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-sky-500/50 hover:text-white"
          }`}
        >
          ☁️ Cloud
        </button>
        <button
          onClick={() => changeMood("ai")}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            mood === "ai"
              ? "bg-pink-600 text-white shadow-sm shadow-pink-500/40 font-bold"
              : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-pink-500/50 hover:text-white"
          }`}
        >
          🤖 AI / NLP
        </button>
      </div>
    </div>
  );
}
