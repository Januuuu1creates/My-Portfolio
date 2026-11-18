"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowUpDown,
  Smile,
  Bot,
} from "lucide-react";
import { soundFX } from "./soundFx";
import { ttsVoice } from "./ttsVoice";

export interface TourStep {
  title: string;
  speech: string;
  targetId?: string;
  badge: string;
  shortLabel: string;
}

export const tourSteps: TourStep[] = [
  {
    title: "Hi, I'm Jahnavi's AI Companion! ✨",
    speech:
      "Hello! I'm Jahnavi Murthy's 3D companion robot! 🌟 Watch me walk up and down as I guide you through her journey as a Computer Science & Physics graduate, Gainwell Technologies Software Development Apprentice, and Full-Stack & Cloud engineer!",
    targetId: "introduction",
    badge: "01 / INTRO",
    shortLabel: "Meet Jahnavi",
  },
  {
    title: "Bachelors & Academic Focus 💡",
    speech:
      "Jahnavi is pursuing her Bachelors in Computer Science & Physics (2022–2026). She combines rigorous first-principles analytical reasoning and mathematical modeling from physics with scalable software architecture and algorithms from computer science!",
    targetId: "about",
    badge: "02 / EDUCATION",
    shortLabel: "Education",
  },
  {
    title: "Gainwell Technologies Experience 💼",
    speech:
      "Jahnavi completed her professional Software Development Apprenticeship at Gainwell Technologies, Bangalore (July 2025 – January 2026), writing clean maintainable code, participating in agile sprint cycles, and contributing to enterprise engineering deliverables!",
    targetId: "journey",
    badge: "03 / EXPERIENCE",
    shortLabel: "Gainwell Exp",
  },
  {
    title: "12 Programming Superpowers! ⚡",
    speech:
      "Check out her 12 core programming skills with animated percentage bars: Java at 90%, Python at 75%, C# at 75%, HTML & CSS at 80%, JavaScript at 70%, Flask at 70%, Git & GitHub at 70%, SQL at 65%, C at 65%, React at 60%, Machine Learning at 60%, and Data Structures & Algorithms at 55%!",
    targetId: "skills-section",
    badge: "04 / SKILLS",
    shortLabel: "12 Skills",
  },
  {
    title: "Flagship Work: AXIOM AI Agent 🤖",
    speech:
      "Her flagship project is AXIOM AI Agent! An autonomous intelligent agent framework built with Python, LLM APIs, LangChain, and vector embeddings, featuring multi-step chain-of-thought task planning, tool execution, and semantic memory!",
    targetId: "projects",
    badge: "05 / FLAGSHIP",
    shortLabel: "AXIOM AI Agent",
  },
  {
    title: "AI Resume Parser & Cloud Automation ☁️",
    speech:
      "She also engineered the AI Resume Parser using Python, NLP, and Scikit-learn for automated candidate ranking, and Cloud Infrastructure Automation with AWS and Terraform for zero-drift cloud hosting!",
    targetId: "projects",
    badge: "06 / PROJECTS",
    shortLabel: "AI Parser & Cloud",
  },
  {
    title: "AI Cooking Assistant 🍳",
    speech:
      "Her smart AI Cooking Assistant is powered by Python, Flask, and clean REST APIs to generate real-time culinary recipes dynamically based on pantry ingredients with zero food waste!",
    targetId: "projects",
    badge: "07 / PROJECTS",
    shortLabel: "Cooking Assistant",
  },
  {
    title: "Let's Connect & Build! 💌",
    speech:
      "Enjoyed exploring? Jahnavi is actively seeking software engineering roles! Reach out directly via email at jahnavimurthy1111@gmail.com, LinkedIn, or explore her verified code on GitHub at github.com/Januuuu1creates!",
    targetId: "contact",
    badge: "08 / CONNECT",
    shortLabel: "Let's Connect",
  },
];

export default function DollCompanion() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isWalkingUpDown, setIsWalkingUpDown] = useState(true);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; char: string; x: number; y: number }[]>([]);

  // Voice narration states
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [isVoicePaused, setIsVoicePaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Subscribe to TTS Voice controller
  useEffect(() => {
    setIsVoiceMuted(ttsVoice.getMuted());
    const unsubscribe = ttsVoice.subscribe(({ isSpeaking, isPaused }) => {
      setIsVoicePlaying(isSpeaking && !isPaused);
      setIsVoicePaused(isPaused);
    });
    return unsubscribe;
  }, []);

  // Natural Blinking
  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const delay = 3200 + Math.random() * 2500;
      blinkTimer = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => {
          setBlinking(false);
          scheduleNextBlink();
        }, 160);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimer);
  }, []);

  // Mouse Tracking for 3D Head Tilt & Eyes
  useEffect(() => {
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

      setHeadTilt({
        x: Math.max(-10, Math.min(10, -deltaY * 8)),
        y: Math.max(-14, Math.min(14, deltaX * 12)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToStep = (stepIdx: number, speakText = false) => {
    const s = tourSteps[stepIdx];
    if (!s) return;
    setCurrentStep(stepIdx);

    if (s.targetId) {
      const el = document.getElementById(s.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    if (speakText) {
      ttsVoice.speak(
        s.speech,
        () => {
          setIsVoicePlaying(true);
          setIsVoicePaused(false);
        },
        () => {
          setIsVoicePlaying(false);
          setIsVoicePaused(false);
        }
      );
    }
  };

  const handleNextStep = () => {
    soundFX.playSparkle();
    const nextIdx = (currentStep + 1) % tourSteps.length;
    scrollToStep(nextIdx, isVoicePlaying);
  };

  const handlePrevStep = () => {
    soundFX.playSparkle();
    const prevIdx = (currentStep - 1 + tourSteps.length) % tourSteps.length;
    scrollToStep(prevIdx, isVoicePlaying);
  };

  const handleRobotTap = () => {
    soundFX.playChime();
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 900);

    const emojis = ["✨", "💜", "🌟", "💙", "⚡", "👋"];
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
      "✨ 'Beep boop! Jahnavi's 3D companion robot at your service!'",
      "💜 'Notice me walking up and down among the magical lights!'",
      "🤖 'Check her Gainwell Technologies experience & AXIOM AI Agent!'",
      "🌟 'Click Walk & Explain Next to tour each chapter!'",
    ];
    setActionNotice(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => setActionNotice(null), 3400);
  };

  const toggleVoicePlayPause = () => {
    if (isVoicePlaying) {
      ttsVoice.pause();
    } else if (isVoicePaused) {
      ttsVoice.resume();
    } else {
      scrollToStep(currentStep, true);
    }
  };

  const toggleVoiceMute = () => {
    const nextMuted = ttsVoice.toggleMute();
    setIsVoiceMuted(nextMuted);
  };

  const step = tourSteps[currentStep];

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center max-w-xl mx-auto w-full select-none"
    >
      {/* Speech Balloon Console Explaining The Portfolio */}
      <div className="w-full bg-slate-950/90 backdrop-blur-2xl border border-violet-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_15px_45px_rgba(139,92,246,0.25)] relative z-30 mb-4 transition-all">
        {/* Step Header */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-600/30 text-violet-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-violet-500/40">
              {step.badge}
            </span>
            <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-violet-400" />
              <span>{step.title}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice Controls */}
            <button
              onClick={toggleVoicePlayPause}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-200 text-[11px] font-mono transition-all cursor-pointer"
              title={isVoicePlaying ? "Pause voice narration" : "Play voice narration"}
            >
              {isVoicePlaying ? (
                <>
                  <Pause className="w-3 h-3 text-sky-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-sky-400" />
                  <span>Speak</span>
                </>
              )}
            </button>

            <button
              onClick={toggleVoiceMute}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isVoiceMuted ? "Unmute voice" : "Mute voice"}
              aria-label="Toggle voice sound"
            >
              {isVoiceMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-violet-400" />
              )}
            </button>

            <span className="text-xs font-mono font-bold text-violet-400 ml-1">
              {currentStep + 1} / {tourSteps.length}
            </span>
          </div>
        </div>

        {/* Narrative Speech Text */}
        <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed min-h-[64px]">
          &ldquo;{step.speech}&rdquo;
        </p>

        {/* Action Notice from Tap */}
        {actionNotice && (
          <div className="mt-2 text-xs font-mono text-violet-200 bg-violet-950/60 p-2.5 rounded-xl border border-violet-400/40 animate-in fade-in flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Tour Navigation Controls & Step Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-violet-300 hover:bg-white/10 transition-colors cursor-pointer"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 text-white text-xs font-mono font-extrabold shadow-lg shadow-violet-600/30 hover:brightness-110 transition-all cursor-pointer"
            >
              <span>Walk &amp; Explain Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick jump pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
            {tourSteps.map((s, idx) => (
              <button
                key={s.badge}
                onClick={() => scrollToStep(idx, isVoicePlaying)}
                className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  currentStep === idx
                    ? "bg-violet-600 text-white font-bold border-violet-400 shadow-sm"
                    : "bg-white/5 border-white/10 text-slate-300 hover:text-violet-300 hover:border-violet-500/40"
                }`}
              >
                {s.shortLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Speech Bubble Arrow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-slate-950/90" />
      </div>

      {/* THE PHOTOREALISTIC 3D DOLL THAT WALKS UP AND DOWN */}
      <div
        onClick={handleRobotTap}
        className={`relative w-76 h-96 sm:w-88 sm:h-[420px] cursor-pointer flex flex-col items-center justify-center select-none ${
          isWalkingUpDown ? "animate-walk-up-down" : ""
        }`}
        title="Tap me! I'm Jahnavi Murthy's realistic 3D software companion robot!"
      >
        {/* Floating Sparkle Particles */}
        {floatingParticles.map((p) => (
          <div
            key={p.id}
            className="absolute text-xl pointer-events-none animate-in fade-in zoom-in-50 duration-700 z-50"
            style={{
              left: `calc(50% + ${p.x}px)`,
              top: `calc(35% + ${p.y}px)`,
              filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))",
            }}
          >
            {p.char}
          </div>
        ))}

        {/* Dynamic Ambient Glow & Shadow */}
        <div className="absolute bottom-4 w-64 sm:w-72 h-14 rounded-full bg-violet-600/25 blur-xl -z-10 animate-pulse pointer-events-none" />
        <div className="absolute bottom-2 w-48 sm:w-56 h-8 rounded-full bg-black/70 blur-md -z-10 pointer-events-none" />

        {/* 3D Model Container with 3D Head Tilt & Natural Breathing */}
        <div
          style={{
            transform: `rotateX(${headTilt.x}deg) rotateY(${headTilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.15s ease-out",
          }}
          className="relative w-full h-full flex flex-col items-center justify-center animate-robot-breathe [perspective:1000px]"
        >
          {/* THE PHOTOREALISTIC CUTOUT IMAGE (NO BOXED BACKGROUND!) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/robot_realistic.png"
            alt="Jahnavi's Realistic 3D Robot Doll"
            className="w-auto h-full max-h-[380px] sm:max-h-[420px] object-contain drop-shadow-[0_20px_45px_rgba(139,92,246,0.6)] pointer-events-none transition-transform duration-300 group-hover:scale-105"
          />

          {/* EYE SPECULAR HIGHLIGHT OVERLAYS (Tracking mouse cursor over 3D model) */}
          <div className="absolute top-[38%] left-[46%] w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {!blinking && (
              <div
                className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] opacity-95 transition-transform duration-75 ease-out"
                style={{
                  transform: `translate(${eyeOffset.x * 0.7}px, ${eyeOffset.y * 0.7}px)`,
                }}
              />
            )}
          </div>

          <div className="absolute top-[40%] left-[64%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {!blinking && !isWinking && (
              <div
                className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] opacity-95 transition-transform duration-75 ease-out"
                style={{
                  transform: `translate(${eyeOffset.x * 0.6}px, ${eyeOffset.y * 0.6}px)`,
                }}
              />
            )}
          </div>

          {/* ILLUMINATED 3D NAME BADGE EMBOSSED ON CHEST: JAHNAVI */}
          <div className="absolute top-[68%] left-[54%] -translate-x-1/2 pointer-events-none z-30">
            <div className="px-3.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-violet-400/80 shadow-[0_0_15px_rgba(139,92,246,0.8)] flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-sm shadow-violet-400" />
              <span className="text-[9.5px] sm:text-[10.5px] font-mono font-black tracking-widest text-violet-200 drop-shadow">
                JAHNAVI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Walking Controls & Motion Toggles */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setIsWalkingUpDown(!isWalkingUpDown)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
            isWalkingUpDown
              ? "bg-violet-600/30 border border-violet-500/50 text-violet-200 font-bold"
              : "bg-white/5 border border-white/10 text-slate-400"
          }`}
          title="Toggle up and down walking stroll"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-violet-400" />
          <span>{isWalkingUpDown ? "Walking Up & Down: ON" : "Walking: PAUSED"}</span>
        </button>

        <button
          onClick={handleRobotTap}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          title="Wave hello"
        >
          <Smile className="w-3.5 h-3.5 text-sky-400" />
          <span>Tap Companion</span>
        </button>
      </div>
    </div>
  );
}
