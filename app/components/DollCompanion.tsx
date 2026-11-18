"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Heart,
  ArrowUpDown,
} from "lucide-react";

interface TourStep {
  title: string;
  speech: string;
  targetId?: string;
  badge: string;
}

const tourSteps: TourStep[] = [
  {
    title: "Hi, I'm Jahnavi's AI Robot! ✨",
    speech:
      "Hello! I'm Jahnavi Murthy's realistic 3D companion robot! 🌟 Watch me walk up and down as I guide you through her journey as a Computer Science & Physics graduate, Gainwell Technologies Software Development Apprentice, and Full-Stack & Cloud engineer!",
    targetId: "hero",
    badge: "01 / INTRO",
  },
  {
    title: "Bachelors & Academic Focus 💡",
    speech:
      "Jahnavi is pursuing her Bachelors in Computer Science & Physics (2022–2026). She combines rigorous analytical computing foundations with practical full-stack software development!",
    targetId: "about",
    badge: "02 / EDUCATION",
  },
  {
    title: "Gainwell Technologies Experience 💼",
    speech:
      "Jahnavi completed her Software Development Apprenticeship at Gainwell Technologies, Bangalore (July 2025 – January 2026), writing clean code, collaborating in agile sprints, and contributing to enterprise engineering!",
    targetId: "experience",
    badge: "03 / EXPERIENCE",
  },
  {
    title: "17+ Technical Superpowers! ⚡",
    speech:
      "From React, Next.js, and TypeScript on the frontend to Python, C#, and ASP.NET MVC on the backend, plus AWS and Terraform for automated infrastructure deployment!",
    targetId: "about",
    badge: "04 / SKILLS",
  },
  {
    title: "01: Appointment Booking System 📅",
    speech:
      "Her Appointment Booking System web app is built with ASP.NET MVC, C#, Entity Framework, and SQL Server for fast, reliable scheduling and user management. Check it on her GitHub: Januuuu1creates!",
    targetId: "projects",
    badge: "05 / PROJECT",
  },
  {
    title: "02: AI Resume Parser 📄",
    speech:
      "Her AI Resume Parser uses Python, Natural Language Processing (NLP), Scikit-learn, and Pandas to automatically extract resume data and evaluate candidate skills!",
    targetId: "projects",
    badge: "06 / PROJECT",
  },
  {
    title: "03: Cloud Infrastructure Automation ☁️",
    speech:
      "Look at her AWS cloud automation! Jahnavi automated EC2 web servers, Apache hosting, S3 buckets, and IAM security permissions completely in Terraform code!",
    targetId: "projects",
    badge: "07 / PROJECT",
  },
  {
    title: "04: AI Cooking Assistant 🍳",
    speech:
      "Her smart AI Cooking Assistant recommends delicious recipes based on whatever ingredients you provide, powered by Python, Flask, and clean REST APIs!",
    targetId: "projects",
    badge: "08 / PROJECT",
  },
  {
    title: "Let's Connect & Build! 💌",
    speech:
      "Jahnavi is actively looking for software engineering roles! Reach out directly via email (jahnavimurthy1111@gmail.com), LinkedIn, or explore her code on GitHub (github.com/Januuuu1creates)!",
    targetId: "contact",
    badge: "09 / CONNECT",
  },
];

export default function DollCompanion() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isWalkingUpDown, setIsWalkingUpDown] = useState(true);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; char: string; x: number; y: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Realistic cute robot audio synthesizer
  const playCuteSound = (freq = 680, duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.45, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio catch
    }
  };

  // Cursor tracking for real-time 3D eye movement & perspective tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height * 0.45;

      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const dist = Math.min(Math.hypot(deltaX, deltaY) / 22, 6.5);
      setEyeOffset({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });

      const maxTilt = 7;
      const tiltX = Math.max(-maxTilt, Math.min(maxTilt, -(deltaY / 42)));
      const tiltY = Math.max(-maxTilt, Math.min(maxTilt, deltaX / 42));
      setHeadTilt({ x: tiltX, y: tiltY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Life-like natural blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 160);
      }
    }, 3600);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleNextStep = () => {
    playCuteSound(760);
    const next = (currentStep + 1) % tourSteps.length;
    setCurrentStep(next);

    const target = tourSteps[next].targetId;
    if (target) {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    playCuteSound(540);
    const prev = (currentStep - 1 + tourSteps.length) % tourSteps.length;
    setCurrentStep(prev);

    const target = tourSteps[prev].targetId;
    if (target) {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRobotTap = () => {
    playCuteSound(840, 0.16);
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 700);

    const emojis = ["✨", "💛", "🌟", "⭐", "🎉"];
    const particles = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      char: emojis[Math.floor(Math.random() * emojis.length)],
      x: (Math.random() - 0.5) * 80,
      y: -Math.random() * 60 - 20,
    }));

    setFloatingParticles((prev) => [...prev, ...particles]);
    setTimeout(() => {
      setFloatingParticles((prev) => prev.slice(particles.length));
    }, 1400);

    const messages = [
      "✨ 'Beep boop! Jahnavi's software robot at your service!'",
      "💛 'Check her Gainwell Technologies experience & GitHub code!'",
      "↕️ 'Walking up and down among the magical glowing lights!'",
      "🌟 'Notice my warm golden glowing halo visor! Let's build together!'",
    ];
    setActionNotice(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => setActionNotice(null), 3200);
  };

  const step = tourSteps[currentStep];

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center max-w-xl mx-auto w-full select-none"
    >
      {/* Sound & Companion Status Bar */}
      <div className="flex items-center justify-between w-full px-2 mb-3 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-400/40 text-amber-200 shadow-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-bold tracking-wider text-[11px] uppercase">
            Jahnavi&apos;s 3D Companion &bull; [00]
          </span>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-400/30 text-slate-300 hover:text-amber-300 hover:border-amber-400/60 transition-colors cursor-pointer shadow-xs"
          title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-bold">SFX ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px]">SFX OFF</span>
            </>
          )}
        </button>
      </div>

      {/* SPEECH BALLOON EXPLAINING THE PORTFOLIO (Frosted Glassmorphism Card) */}
      <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/60 relative z-20 mb-4 transition-all">
        {/* Step Header */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-400/30">
              {step.badge}
            </span>
            <span className="text-sm font-bold text-white tracking-tight">
              {step.title}
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-amber-400">
            {currentStep + 1} / {tourSteps.length}
          </span>
        </div>

        {/* Narrative Speech Text */}
        <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed min-h-[60px]">
          {step.speech}
        </p>

        {/* Action Notice from Tap */}
        {actionNotice && (
          <div className="mt-2 text-xs font-mono text-amber-200 bg-amber-950/50 p-2.5 rounded-xl border border-amber-400/40 animate-in fade-in flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Tour Navigation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 text-xs font-mono font-extrabold shadow-lg shadow-amber-500/30 hover:brightness-110 transition-all cursor-pointer"
            >
              <span>Walk &amp; Explain Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick jump pills */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 cursor-pointer transition-colors"
            >
              About
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 cursor-pointer transition-colors"
            >
              Exp
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 cursor-pointer transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => setCurrentStep(8)}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 cursor-pointer transition-colors"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Speech Bubble Arrow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-slate-950/80" />
      </div>

      {/* THE PHOTOREALISTIC 3D ROBOT
          Isolated cutout directly on canvas (NO rectangular box!) that walks smoothly up and down */}
      <div
        onClick={handleRobotTap}
        className={`relative w-76 h-96 sm:w-88 sm:h-[420px] cursor-pointer flex flex-col items-center justify-center select-none ${
          isWalkingUpDown ? "animate-walk-up-down" : ""
        }`}
        title="Tap me! I'm Jahnavi Murthy's realistic 3D software robot!"
      >
        {/* Floating Sparkle Particles */}
        {floatingParticles.map((p) => (
          <div
            key={p.id}
            className="absolute text-xl pointer-events-none animate-in fade-in zoom-in-50 duration-700 z-50"
            style={{
              left: `calc(50% + ${p.x}px)`,
              top: `calc(35% + ${p.y}px)`,
            }}
          >
            {p.char}
          </div>
        ))}

        {/* Dynamic Warm Ground Contact Light & Shadow */}
        <div className="absolute bottom-4 w-64 sm:w-72 h-14 rounded-full bg-amber-500/25 blur-xl -z-10 animate-pulse pointer-events-none" />
        <div className="absolute bottom-2 w-48 sm:w-56 h-8 rounded-full bg-black/70 blur-md -z-10 pointer-events-none" />

        {/* 3D Realistic Robot Model Container with 3D Head Tilt */}
        <div
          style={{
            transform: `rotateX(${headTilt.x}deg) rotateY(${headTilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.15s ease-out",
          }}
          className="relative w-full h-full flex flex-col items-center justify-center animate-robot-breathe [perspective:1000px]"
        >
          {/* THE REALISTIC 3D CUTOUT IMAGE (NO BOXED BACKGROUND!) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/robot_realistic.png"
            alt="Jahnavi's Realistic 3D Robot"
            className="w-auto h-full max-h-[380px] sm:max-h-[420px] object-contain drop-shadow-[0_20px_35px_rgba(245,158,11,0.45)] pointer-events-none transition-transform duration-300 group-hover:scale-105"
          />

          {/* INTERACTIVE MOVING EYE OVERLAYS (Tracking mouse cursor over the 3D model) */}
          <div className="absolute top-[38%] left-[46%] w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {!blinking && (
              <div
                className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] opacity-95 transition-transform duration-75 ease-out"
                style={{
                  transform: `translate(${eyeOffset.x * 0.7}px, ${eyeOffset.y * 0.7}px)`,
                }}
              />
            )}
          </div>

          <div className="absolute top-[40%] left-[84%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {!blinking && !isWinking && (
              <div
                className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] opacity-95 transition-transform duration-75 ease-out"
                style={{
                  transform: `translate(${eyeOffset.x * 0.6}px, ${eyeOffset.y * 0.6}px)`,
                }}
              />
            )}
          </div>

          {/* ILLUMINATED 3D NAME BADGE EMBOSSED ON CHEST: JAHNAVI */}
          <div className="absolute top-[68%] left-[54%] -translate-x-1/2 pointer-events-none z-30">
            <div className="px-3 py-0.8 rounded-full bg-slate-950/90 backdrop-blur-md border border-amber-400/90 shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
              <span className="text-[9.5px] sm:text-[10.5px] font-mono font-black tracking-widest text-amber-200 drop-shadow">
                JAHNAVI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Walking Controls & Motion Toggles */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {/* Toggle Up and Down Walking */}
        <button
          onClick={() => {
            setIsWalkingUpDown(!isWalkingUpDown);
            playCuteSound(isWalkingUpDown ? 480 : 720);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
            isWalkingUpDown
              ? "bg-amber-500 text-slate-950 font-extrabold shadow-amber-500/30"
              : "bg-slate-900/90 text-slate-200 border border-white/10 hover:border-amber-400/50"
          }`}
          title={isWalkingUpDown ? "Pause walking up & down" : "Start walking up & down"}
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>{isWalkingUpDown ? "Walking Up & Down" : "Resume Walk"}</span>
        </button>

        {/* Tap Me Reaction */}
        <button
          onClick={handleRobotTap}
          className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-amber-400/20 text-amber-200 border border-amber-400/40 hover:bg-amber-400/30 transition-all cursor-pointer font-bold flex items-center gap-1.5 shadow-xs"
        >
          <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Tap Me!</span>
        </button>

        {/* Next Project Tour Trigger */}
        <button
          onClick={handleNextStep}
          className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900/90 text-slate-200 border border-white/10 hover:border-amber-400/50 hover:text-amber-300 transition-all cursor-pointer flex items-center gap-1"
        >
          <span>Next Stop</span>
          <ChevronRight className="w-3 h-3 text-amber-400" />
        </button>
      </div>
    </div>
  );
}
