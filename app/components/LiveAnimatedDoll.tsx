"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MessageSquare,
  Smile,
  Compass,
  Zap,
  CheckCircle,
} from "lucide-react";
import { soundFX } from "./soundFx";
import { ttsVoice } from "./ttsVoice";

export type AnimationMode = "idle" | "walking" | "waving" | "explaining";

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
  const [animMode, setAnimMode] = useState<AnimationMode>("idle");
  const [currentTopic, setCurrentTopic] = useState<GuideTopic>(GUIDE_TOPICS[0]);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [isVoicePaused, setIsVoicePaused] = useState(false);

  // Character Kinematics State
  const [headTilt, setHeadTilt] = useState(0);
  const [headTurn, setHeadTurn] = useState(0);
  const [headNod, setHeadNod] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [breathScale, setBreathScale] = useState(1);
  const [walkOffset, setWalkOffset] = useState(0);
  const [bodySway, setBodySway] = useState(0);
  const [armAngle, setArmAngle] = useState(0);
  const [mouthOpen, setMouthOpen] = useState(0);
  const [sparkles, setSparkles] = useState<{ id: number; char: string; x: number; y: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Subscribe to TTS Voice controller
  useEffect(() => {
    setIsVoiceMuted(ttsVoice.getMuted());
    const unsubscribe = ttsVoice.subscribe(({ isSpeaking, isPaused }) => {
      setIsVoicePlaying(isSpeaking && !isPaused);
      setIsVoicePaused(isPaused);
      if (isSpeaking && !isPaused) {
        setAnimMode("explaining");
      }
    });
    return unsubscribe;
  }, []);

  // Mouse tracking for head and gaze
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mousePosRef.current = {
        x: (e.clientX - centerX) / (window.innerWidth / 2),
        y: (e.clientY - centerY) / (window.innerHeight / 2),
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Periodic natural blinking cycle
  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const delay = 3200 + Math.random() * 2500;
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 160);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimer);
  }, []);

  // Main 60 FPS Kinematics Animation Loop
  useEffect(() => {
    let startTime = performance.now();

    const loop = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;

      // 1. Natural Breathing (Sine wave rhythm)
      const breath = 1 + Math.sin(elapsed * 2.2) * 0.025;
      setBreathScale(breath);

      // 2. Mouse Target Smooth Interpolation
      const targetTilt = mousePosRef.current.x * 6 + Math.sin(elapsed * 1.5) * 2;
      const targetTurn = mousePosRef.current.x * 12;
      const targetNod = mousePosRef.current.y * 8 + Math.sin(elapsed * 2.2) * 1.5;

      setHeadTilt((prev) => prev + (targetTilt - prev) * 0.1);
      setHeadTurn((prev) => prev + (targetTurn - prev) * 0.1);
      setHeadNod((prev) => prev + (targetNod - prev) * 0.1);

      // 3. Locomotion & Posture by Animation Mode
      if (animMode === "walking") {
        setWalkOffset(Math.sin(elapsed * 1.8) * 28);
        setBodySway(Math.cos(elapsed * 1.8) * 4);
        setArmAngle(Math.sin(elapsed * 3.6) * 14);
        setMouthOpen(0);
      } else if (animMode === "waving") {
        setWalkOffset(0);
        setBodySway(Math.sin(elapsed * 2) * 2);
        // Rapid wave gesture (8 Hz)
        const waveAngle = -65 + Math.sin(elapsed * 8) * 22;
        setArmAngle(waveAngle);
        setMouthOpen(2);
      } else if (animMode === "explaining") {
        setWalkOffset(0);
        setBodySway(Math.sin(elapsed * 1.2) * 1.5);
        // Emphatic gestures
        const gestureAngle = -28 + Math.sin(elapsed * 3.2) * 18;
        setArmAngle(gestureAngle);
        // Mouth movement while speaking
        const mouth = Math.abs(Math.sin(elapsed * 10)) * 5;
        setMouthOpen(mouth);
      } else {
        // Idle mode
        setWalkOffset(0);
        setBodySway(Math.sin(elapsed * 1.5) * 1.5);
        setArmAngle(Math.sin(elapsed * 2) * 4);
        setMouthOpen(0);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animMode]);

  // Topic Selection & TTS Action
  const selectTopic = (topic: GuideTopic) => {
    soundFX.playSparkle();
    setCurrentTopic(topic);
    setAnimMode("explaining");

    // Speak topic text
    ttsVoice.speak(
      topic.speechText,
      () => {
        setIsVoicePlaying(true);
        setIsVoicePaused(false);
      },
      () => {
        setIsVoicePlaying(false);
        setIsVoicePaused(false);
        setAnimMode("idle");
      }
    );
  };

  const handleWaveClick = () => {
    soundFX.playChime();
    setAnimMode("waving");
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
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
      setIsWinking(false);
      if (!isVoicePlaying) setAnimMode("idle");
    }, 2400);
  };

  const toggleVoicePlayPause = () => {
    if (isVoicePlaying) {
      ttsVoice.pause();
      setAnimMode("idle");
    } else if (isVoicePaused) {
      ttsVoice.resume();
      setAnimMode("explaining");
    } else {
      selectTopic(currentTopic);
    }
  };

  const toggleVoiceMute = () => {
    const nextMuted = ttsVoice.toggleMute();
    setIsVoiceMuted(nextMuted);
    if (nextMuted) {
      setAnimMode("idle");
    }
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
          className="absolute z-30 text-2xl pointer-events-none animate-bounce"
          style={{
            transform: `translate(${sp.x}px, ${sp.y}px)`,
            filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))",
          }}
        >
          {sp.char}
        </div>
      ))}

      {/* Speech Bubble Guide Console */}
      <div className="relative z-20 mb-6 w-full">
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
                title={isVoicePlaying ? "Pause voice" : "Play voice"}
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
            <h4 className="text-base sm:text-lg font-bold text-white mb-1.5">
              {currentTopic.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              &ldquo;{currentTopic.speechText}&rdquo;
            </p>
          </div>

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

      {/* The Live Articulated Character Stage */}
      <div className="relative flex flex-col items-center">
        {/* Holographic Glowing Violet & Electric Blue Ambience */}
        <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-violet-600/30 via-indigo-600/20 to-sky-500/30 blur-2xl pointer-events-none -z-10 animate-violet-glow" />

        {/* Dynamic Ground Shadow that shifts and scales with walk/hover */}
        <div
          className="absolute bottom-1 w-44 h-8 rounded-full bg-violet-600/25 blur-lg pointer-events-none transition-all duration-150"
          style={{
            transform: `translateX(${walkOffset}px) scale(${1 - Math.abs(walkOffset) * 0.005})`,
          }}
        />

        {/* Articulated Doll Container */}
        <div
          onClick={handleWaveClick}
          className="relative cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
          title="Click to interact with Jahnavi's animated companion!"
          style={{
            transform: `translateX(${walkOffset}px) rotate(${bodySway}deg)`,
          }}
        >
          {/* Main Rig Wrapper */}
          <div className="relative w-56 h-64 sm:w-64 sm:h-72 flex items-center justify-center">
            {/* 1. Body & Torso Layer (Natural Breathing & Posture) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `scale(1, ${breathScale})`,
                transformOrigin: "bottom center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/robot_realistic.png"
                alt="Jahnavi's 3D Robot"
                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_15px_35px_rgba(139,92,246,0.5)]"
              />
            </div>

            {/* 2. Independent Head Group (Tilts, Nods, Turns smoothly) */}
            <div
              className="absolute top-0 w-full h-[60%] pointer-events-none"
              style={{
                transform: `rotateZ(${headTilt}deg) rotateY(${headTurn}deg) rotateX(${headNod}deg)`,
                transformOrigin: "50% 90%",
                transition: "transform 0.08s ease-out",
              }}
            >
              {/* Eyelids Over Left Eye (Realistic blinking) */}
              <div
                className="absolute transition-all duration-75"
                style={{
                  top: "39%",
                  left: "46%",
                  width: "22px",
                  height: "28px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <div
                  className="w-full bg-[#523326] transition-all duration-75"
                  style={{
                    height: isBlinking || isWinking ? "100%" : "0%",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  }}
                />
              </div>

              {/* Eyelids Over Right Eye (Realistic blinking, winking) */}
              <div
                className="absolute transition-all duration-75"
                style={{
                  top: "38%",
                  left: "64%",
                  width: "25px",
                  height: "30px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <div
                  className="w-full bg-[#523326] transition-all duration-75"
                  style={{
                    height: isBlinking ? "100%" : "0%",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  }}
                />
              </div>

              {/* Articulated Mouth Opening & Closing when Explaining */}
              {mouthOpen > 0 && (
                <div
                  className="absolute rounded-full bg-[#3a2219] border border-[#ffbf69]/30 transition-all duration-75"
                  style={{
                    top: "54%",
                    left: "55%",
                    width: "12px",
                    height: `${mouthOpen}px`,
                    transform: "translateX(-50%)",
                  }}
                />
              )}
            </div>

            {/* 3. Articulated Waving Arm Overlay (Shoulder Pivot) */}
            {animMode === "waving" && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "56%",
                  right: "26%",
                  width: "56px",
                  height: "56px",
                  transform: `rotate(${armAngle}deg)`,
                  transformOrigin: "top left",
                  transition: "transform 0.05s linear",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/robot_arm_wave.png"
                  alt="Waving Arm"
                  className="w-full h-full object-contain drop-shadow-[0_5px_12px_rgba(139,92,246,0.6)]"
                />
              </div>
            )}

            {/* Glowing Name Badge */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/95 border border-violet-400/80 shadow-[0_0_15px_rgba(139,92,246,0.6)] text-[9px] font-mono font-black text-violet-200 tracking-widest uppercase whitespace-nowrap">
              JAHNAVI
            </div>
          </div>
        </div>

        {/* Animation State Controls */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handleWaveClick}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              animMode === "waving"
                ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-600/40"
                : "bg-slate-900/80 hover:bg-white/10 text-slate-300 border border-white/10"
            }`}
          >
            <Smile className="w-3.5 h-3.5 text-sky-400" />
            <span>Wave</span>
          </button>

          <button
            onClick={() => setAnimMode("walking")}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              animMode === "walking"
                ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-600/40"
                : "bg-slate-900/80 hover:bg-white/10 text-slate-300 border border-white/10"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-violet-400" />
            <span>Walk</span>
          </button>

          <button
            onClick={() => setAnimMode("explaining")}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              animMode === "explaining"
                ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-600/40"
                : "bg-slate-900/80 hover:bg-white/10 text-slate-300 border border-white/10"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Explain</span>
          </button>

          <button
            onClick={() => setAnimMode("idle")}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              animMode === "idle"
                ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-600/40"
                : "bg-slate-900/80 hover:bg-white/10 text-slate-300 border border-white/10"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Idle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
