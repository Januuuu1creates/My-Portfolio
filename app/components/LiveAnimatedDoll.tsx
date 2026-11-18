"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Smile,
  Compass,
  ArrowUpDown,
  MessageSquare,
  Bot,
} from "lucide-react";
import { soundFX } from "./soundFx";
import { ttsVoice } from "./ttsVoice";

export interface GuideTopic {
  id: string;
  badge: string;
  title: string;
  shortLabel: string;
  speechText: string;
  targetId?: string;
}

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: "who-am-i",
    badge: "01 / IDENTITY",
    title: "Who is Jahnavi Murthy?",
    shortLabel: "Who I Am",
    speechText:
      "Hi! I'm Jahnavi Murthy, an aspiring Software Engineer, Full-Stack Developer, and Cloud and AI enthusiast based in Bengaluru. I combine first-principles analytical reasoning with hands-on software engineering to build reliable, high-performance web systems and intelligent digital tools.",
    targetId: "about",
  },
  {
    id: "education",
    badge: "02 / EDUCATION",
    title: "Academic Background & Apprenticeship",
    shortLabel: "Education & Background",
    speechText:
      "Jahnavi is pursuing her Bachelors in Computer Science & Physics from 2022 to 2026. This unique dual background combines mathematical rigor and analytical problem-solving from physics with modern software architecture and algorithms from computer science. She also completed her Software Development Apprenticeship at Gainwell Technologies, Bangalore from July 2025 to January 2026!",
    targetId: "journey",
  },
  {
    id: "skills",
    badge: "03 / CAPABILITIES",
    title: "Programming Skills & Technical Strengths",
    shortLabel: "Programming Skills",
    speechText:
      "Jahnavi possesses a versatile programming arsenal! She excels in Java at 90% mastery, Python at 75%, C# and ASP.NET MVC at 75%, JavaScript and TypeScript at 70%, HTML & CSS at 80%, SQL databases at 65%, React at 60%, Flask at 70%, Git and GitHub at 70%, plus core foundations in Data Structures & Algorithms at 55% and Machine Learning at 60%!",
    targetId: "skills-section",
  },
  {
    id: "projects",
    badge: "04 / FEATURED WORK",
    title: "AXIOM AI Agent & Featured Projects",
    shortLabel: "AXIOM AI Agent & Projects",
    speechText:
      "Jahnavi builds real, impactful software! Her flagship work includes AXIOM AI Agent, an autonomous intelligent agent system with chain-of-thought task planning and vector memory. She also developed the AI Resume Parser using NLP and Scikit-learn, Cloud Infrastructure Automation with AWS and Terraform, and the AI Cooking Assistant powered by Flask and REST APIs!",
    targetId: "projects",
  },
  {
    id: "goals",
    badge: "05 / VISION",
    title: "Technical Interests & Career Goals",
    shortLabel: "Interests & Goals",
    speechText:
      "Jahnavi is deeply passionate about full-stack software development, cloud infrastructure automation, and autonomous AI systems. Her career goal is to join an ambitious engineering team as a Software Engineer where she can solve complex challenges, write maintainable production code, and build software that makes a genuine human impact!",
    targetId: "contact",
  },
];

export default function LiveAnimatedDoll() {
  const [currentTopic, setCurrentTopic] = useState<GuideTopic>(GUIDE_TOPICS[0]);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [isVoicePaused, setIsVoicePaused] = useState(false);

  // Doll Articulation States
  const [isWalkingUpDown, setIsWalkingUpDown] = useState(true);
  const [isWaving, setIsWaving] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0 });
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; char: string; x: number; y: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Subscribe to voice controller
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
      const delay = 3000 + Math.random() * 2500;
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

  // Mouse Tracking for 3D Head Tilt and Eyes
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

  // Topic Selection & TTS Action
  const selectTopic = (topic: GuideTopic) => {
    soundFX.playSparkle();
    setCurrentTopic(topic);

    ttsVoice.speak(
      topic.speechText,
      () => {
        setIsVoicePlaying(true);
        setIsVoicePaused(false);
      },
      () => {
        setIsVoicePlaying(false);
        setIsVoicePaused(false);
      }
    );

    if (topic.targetId) {
      const el = document.getElementById(topic.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleDollTap = () => {
    soundFX.playChime();
    setIsWaving(true);
    setIsWinking(true);

    const emojis = ["✨", "🌟", "💜", "💙", "⚡", "👋"];
    const id = Date.now();
    setSparkles((prev) => [
      ...prev,
      {
        id,
        char: emojis[Math.floor(Math.random() * emojis.length)],
        x: (Math.random() - 0.5) * 80,
        y: -30 - Math.random() * 20,
      },
    ]);

    const messages = [
      "✨ 'Beep boop! Jahnavi's companion at your service!'",
      "💜 'Check her Gainwell Technologies experience & AXIOM AI Agent!'",
      "↕️ 'Walking up and down through her interactive portfolio!'",
      "🌟 'Ask me any topic above to hear me speak!'",
    ];
    setActionNotice(messages[Math.floor(Math.random() * messages.length)]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
      setIsWinking(false);
      setIsWaving(false);
    }, 2200);

    setTimeout(() => setActionNotice(null), 3500);
  };

  const toggleVoicePlayPause = () => {
    if (isVoicePlaying) {
      ttsVoice.pause();
    } else if (isVoicePaused) {
      ttsVoice.resume();
    } else {
      selectTopic(currentTopic);
    }
  };

  const toggleVoiceMute = () => {
    const nextMuted = ttsVoice.toggleMute();
    setIsVoiceMuted(nextMuted);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full max-w-lg mx-auto select-none"
    >
      {/* Floating Sparkles Emitter */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="absolute z-40 text-2xl pointer-events-none animate-bounce"
          style={{
            transform: `translate(${sp.x}px, ${sp.y}px)`,
            filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))",
          }}
        >
          {sp.char}
        </div>
      ))}

      {/* SPEECH BUBBLE GUIDE CONSOLE */}
      <div className="relative z-30 mb-4 w-full">
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-violet-500/40 shadow-[0_15px_45px_rgba(139,92,246,0.25)] space-y-3">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2 text-violet-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              <span className="uppercase tracking-wider">{currentTopic.badge}</span>
            </div>

            {/* Voice Control Buttons */}
            <div className="flex items-center gap-1.5">
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
            </div>
          </div>

          {/* Topic Title & Conversational Explanation */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 flex items-center gap-2">
              <Bot className="w-4 h-4 text-violet-400" />
              <span>{currentTopic.title}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans min-h-[54px]">
              &ldquo;{currentTopic.speechText}&rdquo;
            </p>
          </div>

          {/* Action Notice Toast */}
          {actionNotice && (
            <div className="text-xs font-mono text-violet-200 bg-violet-950/60 p-2.5 rounded-xl border border-violet-400/40 animate-in fade-in flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* Clickable Topics to Ask Her About */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
              ASK JAHNAVI&apos;S COMPANION:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {GUIDE_TOPICS.map((topic) => {
                const isSelected = currentTopic.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => selectTopic(topic)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30 border border-violet-400"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    {topic.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Speech Bubble Arrow */}
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-slate-950/90 mx-auto -mt-[1px]" />
      </div>

      {/* THE PHOTOREALISTIC 3D DOLL COMPANION */}
      <div
        onClick={handleDollTap}
        className={`relative w-72 h-88 sm:w-80 sm:h-[400px] cursor-pointer flex flex-col items-center justify-center select-none ${
          isWalkingUpDown ? "animate-walk-up-down" : ""
        } ${isWaving ? "rotate-2 scale-105" : ""}`}
        title="Tap me! I'm Jahnavi Murthy's 3D robot companion!"
      >
        {/* Holographic Violet & Blue Ambient Lighting */}
        <div className="absolute inset-0 rounded-full bg-violet-600/25 blur-2xl -z-10 animate-pulse pointer-events-none" />
        <div className="absolute bottom-2 w-56 h-10 rounded-full bg-sky-500/20 blur-xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 w-44 h-6 rounded-full bg-black/70 blur-md -z-10 pointer-events-none" />

        {/* 3D Model Container with Head Tilt and Breathing */}
        <div
          style={{
            transform: `rotateX(${headTilt.x}deg) rotateY(${headTilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.12s ease-out",
          }}
          className="relative w-full h-full flex flex-col items-center justify-center animate-robot-breathe [perspective:1000px]"
        >
          {/* THE PHOTOREALISTIC 3D ROBOT IMAGE */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/robot_realistic.png"
            alt="Jahnavi's 3D Robot Doll"
            className="w-auto h-full max-h-[360px] sm:max-h-[390px] object-contain drop-shadow-[0_20px_40px_rgba(139,92,246,0.6)] pointer-events-none transition-transform duration-300"
          />

          {/* INTERACTIVE MOVING EYE SPECULAR GLINTS */}
          <div className="absolute top-[38%] left-[46%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
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

          {/* JAHNAVI NAME BADGE */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none z-30">
            <div className="px-3.5 py-1 rounded-full bg-slate-950/95 backdrop-blur-md border border-violet-400/80 shadow-[0_0_15px_rgba(139,92,246,0.8)] flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-sm shadow-violet-400" />
              <span className="text-[10px] font-mono font-black tracking-widest text-violet-200">
                JAHNAVI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Walking & Animation Toggles */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          onClick={() => setIsWalkingUpDown(!isWalkingUpDown)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
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
          onClick={handleDollTap}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          title="Wave hello"
        >
          <Smile className="w-3.5 h-3.5 text-sky-400" />
          <span>Wave</span>
        </button>
      </div>
    </div>
  );
}
