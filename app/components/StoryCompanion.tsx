"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Smile,
} from "lucide-react";
import { soundFX } from "./soundFx";

export interface TourStep {
  chapter: string;
  title: string;
  subtitle: string;
  narration: string;
  targetId: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    chapter: "01",
    title: "Meet Jahnavi",
    subtitle: "Welcome to My World",
    narration:
      "Hi, I'm Jahnavi. Welcome to my little corner of the internet. Scroll down and I'll show you around! I'm an aspiring Software Engineer, Full-Stack Developer, and Cloud & AI enthusiast.",
    targetId: "introduction",
  },
  {
    chapter: "02",
    title: "About Me",
    subtitle: "The Person Behind the Code",
    narration:
      "I have a background in both Computer Science and Physics (2022–2026). Physics gave me deep analytical rigor and first-principles thinking, while Computer Science gives me the creative power to build scalable, human-centered software.",
    targetId: "about",
  },
  {
    chapter: "03",
    title: "My Journey",
    subtitle: "Education & Gainwell Technologies",
    narration:
      "From studying Computer Science & Physics to working as a Software Development Apprentice at Gainwell Technologies, Bangalore (July 2025 – January 2026), where I contributed to enterprise software, agile sprint cycles, and production code.",
    targetId: "journey",
  },
  {
    chapter: "04",
    title: "What I Work With",
    subtitle: "Interactive Engineering Workbench",
    narration:
      "Here is the lab of languages and tools I use every day: Java, Python, C#, JavaScript, SQL, REST APIs, React, Next.js, AWS, and Terraform. Click any tool in the workbench to inspect how I apply it in practice!",
    targetId: "workbench",
  },
  {
    chapter: "05",
    title: "My Projects",
    subtitle: "Individual Visual Case Studies",
    narration:
      "Check out my four featured projects: the Appointment Booking System (ASP.NET MVC & SQL Server), AI Resume Parser (Python & NLP), Cloud Infrastructure Automation (AWS & Terraform), and AI Cooking Assistant (Flask & REST APIs)!",
    targetId: "projects",
  },
  {
    chapter: "06",
    title: "Certifications",
    subtitle: "Technical Credentials",
    narration:
      "Continuous growth is fundamental to my work. Explore my verified certifications across Cloud Architecture & AWS, Python & AI Systems, and Full-Stack Web Engineering with C# / .NET.",
    targetId: "certifications",
  },
  {
    chapter: "07",
    title: "Let's Connect",
    subtitle: "Build Something Meaningful",
    narration:
      "Enjoyed exploring my world? Let's connect and build something meaningful. You can email me at jahnavimurthy1111@gmail.com, connect on LinkedIn, or inspect my verified repositories on GitHub!",
    targetId: "contact",
  },
];

export default function StoryCompanion({
  onStartTour,
}: {
  onStartTour?: () => void;
}) {
  const [speech, setSpeech] = useState(
    "Hi, I'm Jahnavi. Welcome to my little corner of the internet. Scroll down and I'll show you around."
  );
  const [speechTitle, setSpeechTitle] = useState("Jahnavi's Companion");
  const [isMuted, setIsMuted] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<{ id: number; char: string; x: number; y: number }[]>([]);
  const [isWaving, setIsWaving] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMuted(soundFX.getMuted());

    // Mouse tracking for companion's curious eyes
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const maxOffset = 5;
      setEyeOffset({
        x: Math.max(-maxOffset, Math.min(maxOffset, deltaX * maxOffset)),
        y: Math.max(-maxOffset, Math.min(maxOffset, deltaY * maxOffset)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCompanionClick = () => {
    soundFX.playChime();

    const greetings = [
      {
        title: "So glad you're here! ✨",
        text: "Hi there! I'm Jahnavi's interactive companion. Feel free to explore every chapter of her story!",
      },
      {
        title: "Did you know? 💡",
        text: "Jahnavi combines Computer Science with Physics, giving her both mathematical analytical depth and practical engineering craftsmanship!",
      },
      {
        title: "Gainwell Technologies 💼",
        text: "She gained enterprise software experience as an Apprentice Software Developer at Gainwell Technologies, Bangalore!",
      },
      {
        title: "Ready for a Tour? 🚀",
        text: "Click 'Start Story Tour' below and I'll guide you through each section step-by-step!",
      },
    ];

    const pick = greetings[Math.floor(Math.random() * greetings.length)];
    setSpeechTitle(pick.title);
    setSpeech(pick.text);

    // Spawn floating sparkles
    const emojis = ["✨", "🌟", "💜", "💙", "⚡", "🚀"];
    const id = Date.now();
    setSparkles((prev) => [
      ...prev,
      {
        id,
        char: emojis[Math.floor(Math.random() * emojis.length)],
        x: (Math.random() - 0.5) * 80,
        y: -20 - Math.random() * 30,
      },
    ]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 1200);
  };

  const handleWave = () => {
    setIsWaving(true);
    soundFX.playSparkle();
    setSpeechTitle("Jahnavi says hello! 👋");
    setSpeech(
      "Wishing you an awesome day! Scroll down to discover her journey, skills, and featured software projects!"
    );
    setTimeout(() => setIsWaving(false), 2000);
  };

  const toggleSound = () => {
    const next = soundFX.toggleMute();
    setIsMuted(next);
  };

  const startTour = () => {
    soundFX.playChime();
    setIsTourActive(true);
    setCurrentTourStep(0);
    scrollToChapter(0);
    if (onStartTour) onStartTour();
  };

  const scrollToChapter = (stepIdx: number) => {
    const step = TOUR_STEPS[stepIdx];
    if (!step) return;
    const el = document.getElementById(step.targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const nextTourStep = () => {
    if (currentTourStep < TOUR_STEPS.length - 1) {
      const nextIdx = currentTourStep + 1;
      setCurrentTourStep(nextIdx);
      scrollToChapter(nextIdx);
      soundFX.playSparkle();
    } else {
      setIsTourActive(false);
      soundFX.playChime();
    }
  };

  const prevTourStep = () => {
    if (currentTourStep > 0) {
      const prevIdx = currentTourStep - 1;
      setCurrentTourStep(prevIdx);
      scrollToChapter(prevIdx);
      soundFX.playSparkle();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto select-none"
    >
      {/* Sparkles Emitter */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="absolute z-30 text-2xl pointer-events-none animate-bounce"
          style={{
            transform: `translate(${sp.x}px, ${sp.y}px)`,
            filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))",
          }}
        >
          {sp.char}
        </div>
      ))}

      {/* Conversational Speech Bubble (sebg.ch inspired) */}
      <div className="relative z-20 mb-6 w-full max-w-sm">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-violet-500/30 shadow-[0_10px_35px_rgba(139,92,246,0.25)] transition-all duration-300">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-violet-400 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              {speechTitle}
            </span>
            <span className="text-slate-400 text-[11px]">AI Companion</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            &ldquo;{speech}&rdquo;
          </p>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Tap companion to talk</span>
            <span className="text-violet-300 font-medium">Interactive Guide</span>
          </div>
        </div>

        {/* Speech Bubble Arrow pointing to the companion */}
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-slate-950/90 mx-auto -mt-[1px]" />
      </div>

      {/* The 3D Companion Character Stage */}
      <div className="relative flex flex-col items-center group">
        {/* Holographic Glowing Violet & Electric Blue Rings */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-violet-600/30 via-indigo-600/20 to-sky-500/30 blur-2xl pointer-events-none -z-10 animate-violet-glow" />
        <div className="absolute bottom-2 w-48 h-12 bg-sky-500/20 rounded-full blur-xl pointer-events-none -z-10 animate-blue-glow" />

        {/* Holographic Base Ring */}
        <div className="absolute bottom-0 w-44 h-8 rounded-full border border-violet-400/30 bg-violet-950/30 backdrop-blur-xs -z-5 animate-pulse-ring" />

        {/* Realistic 3D Cute Robot Image */}
        <div
          onClick={handleCompanionClick}
          className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 animate-walk-up-down ${
            isWaving ? "rotate-3 scale-110" : ""
          }`}
          title="Click to interact with Jahnavi's companion!"
        >
          <div className="relative w-48 h-56 sm:w-56 sm:h-64 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/robot_realistic.png"
              alt="Jahnavi's 3D Companion Robot"
              className="w-full h-full object-contain animate-robot-breathe transition-all duration-300 pointer-events-none"
              style={{
                transform: `translate(${eyeOffset.x * 0.3}px, ${eyeOffset.y * 0.3}px)`,
              }}
            />

            {/* Glowing Name Badge on Companion Chest */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/95 border border-violet-400/80 shadow-[0_0_15px_rgba(139,92,246,0.6)] text-[9px] font-mono font-black text-violet-200 tracking-widest uppercase whitespace-nowrap">
              JAHNAVI
            </div>
          </div>
        </div>

        {/* Quick Micro-Interaction Buttons */}
        <div className="flex items-center gap-2.5 mt-4">
          <button
            onClick={startTour}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/50 text-violet-200 text-xs font-mono font-semibold transition-all shadow-xs cursor-pointer hover:scale-105"
            title="Start step-by-step interactive portfolio tour"
          >
            <Compass className="w-3.5 h-3.5 text-violet-300" />
            <span>Start Story Tour</span>
          </button>

          <button
            onClick={handleWave}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono transition-all cursor-pointer hover:scale-105"
            title="Wave to companion"
          >
            <Smile className="w-3.5 h-3.5 text-sky-400" />
            <span>Wave</span>
          </button>

          <button
            onClick={toggleSound}
            type="button"
            className="p-1.5 rounded-full bg-slate-900/80 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? "Unmute audio chimes" : "Mute audio chimes"}
            aria-label="Toggle sound effects"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-violet-400" />
            )}
          </button>
        </div>
      </div>

      {/* Guided Story Tour Modal / Overlay */}
      {isTourActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-violet-500/40 shadow-[0_20px_60px_rgba(139,92,246,0.3)] space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-bold">
                <span className="px-2 py-0.5 rounded-md bg-violet-500/20 border border-violet-500/30">
                  CHAPTER {TOUR_STEPS[currentTourStep].chapter} OF 07
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-300 uppercase">
                  {TOUR_STEPS[currentTourStep].subtitle}
                </span>
              </div>

              <button
                onClick={() => setIsTourActive(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white tracking-tight">
                {TOUR_STEPS[currentTourStep].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {TOUR_STEPS[currentTourStep].narration}
              </p>
            </div>

            {/* Stepper Dots & Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                {TOUR_STEPS.map((step, idx) => (
                  <button
                    key={step.chapter}
                    onClick={() => {
                      setCurrentTourStep(idx);
                      scrollToChapter(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentTourStep === idx
                        ? "w-6 bg-violet-400"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Jump to step ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevTourStep}
                  disabled={currentTourStep === 0}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors cursor-pointer"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextTourStep}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-violet-600/30 cursor-pointer"
                >
                  <span>
                    {currentTourStep === TOUR_STEPS.length - 1
                      ? "Finish Tour"
                      : "Next Chapter"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
