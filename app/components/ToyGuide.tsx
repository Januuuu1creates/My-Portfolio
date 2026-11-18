"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  X,
  Radio,
  RotateCcw,
  Compass,
  ArrowRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { soundFX } from "./soundFx";
import { ttsVoice } from "./ttsVoice";

export interface TourStep {
  id: string;
  title: string;
  speech: string;
  targetId: string;
  badge: string;
  shortLabel: string;
}

export const TOY_EXPLANATIONS: TourStep[] = [
  {
    id: "meet",
    title: "Hi, I'm Jahnavi's Portfolio Guide! ✨",
    speech:
      "Hi! I'm Jahnavi's portfolio guide. I'll walk you through her projects, skills, and experience. Jahnavi is an aspiring software engineer with a dual background in Computer Science and Physics, and experience as a Software Development Apprentice at Gainwell Technologies!",
    targetId: "introduction",
    badge: "01 / MEET JAHNAVI",
    shortLabel: "Who I Am",
  },
  {
    id: "about",
    title: "Dual Foundation: CS & Physics 💡",
    speech:
      "Jahnavi is completing her Bachelors in Computer Science & Physics (2022–2026). Her physics background instills first-principles mathematical analysis, while computer science provides the software architecture to build scalable, high-performance systems!",
    targetId: "about",
    badge: "02 / EDUCATION",
    shortLabel: "Education",
  },
  {
    id: "gainwell",
    title: "Gainwell Technologies Experience 💼",
    speech:
      "Jahnavi completed her Software Development Apprenticeship at Gainwell Technologies, Bangalore from July 2025 to January 2026. She engaged in agile sprint cycles, full-stack tasks, peer code reviews, and enterprise programming standards!",
    targetId: "journey",
    badge: "03 / EXPERIENCE",
    shortLabel: "Gainwell Exp",
  },
  {
    id: "skills",
    title: "12 Programming Superpowers ⚡",
    speech:
      "Check out her 12 verified technical skills with animated proficiency bars: Java at 90%, Python at 75%, C# at 75%, HTML & CSS at 80%, JavaScript at 70%, Flask at 70%, Git at 70%, SQL at 65%, C at 65%, React at 60%, Machine Learning at 60%, and Data Structures at 55%!",
    targetId: "skills-section",
    badge: "04-A / 12 SKILLS",
    shortLabel: "12 Skills",
  },
  {
    id: "workbench",
    title: "The Engineering Workbench 🛠️",
    speech:
      "Her engineering workbench spans 14 core tools across Python, Java, C#, Next.js, SQL, AWS, and Terraform Infrastructure as Code for automated, zero-drift cloud environments!",
    targetId: "workbench",
    badge: "04-B / WORKBENCH",
    shortLabel: "Workbench",
  },
  {
    id: "axiom",
    title: "Flagship: AXIOM AI Agent 🤖",
    speech:
      "Her flagship software project is AXIOM AI Agent! An autonomous agent framework featuring multi-step chain-of-thought task execution, vector memory retrieval, dynamic tool orchestration, and resilient reasoning loops!",
    targetId: "projects",
    badge: "05 / AXIOM AGENT",
    shortLabel: "AXIOM AI",
  },
  {
    id: "projects-other",
    title: "AI Resume Parser & Cloud IaC ☁️",
    speech:
      "She also engineered the NLP-based AI Resume Parser with Scikit-learn, Cloud Infrastructure Automation with AWS and Terraform, and a smart AI Cooking Assistant powered by Flask REST APIs!",
    targetId: "projects",
    badge: "05-B / PROJECTS",
    shortLabel: "All Projects",
  },
  {
    id: "certs",
    title: "Verified Technical Credentials 📜",
    speech:
      "Jahnavi holds verified technical credentials in Cloud Infrastructure & AWS Fundamentals, Python for Data Science & AI Systems, and Full-Stack Web Engineering with C# and .NET!",
    targetId: "certifications",
    badge: "06 / CREDENTIALS",
    shortLabel: "Certifications",
  },
  {
    id: "contact",
    title: "Let's Connect & Build! 💌",
    speech:
      "Enjoyed exploring Jahnavi's world? She is actively seeking 2026 software engineering roles! Contact her directly at jahnavimurthy1111@gmail.com, on LinkedIn, or inspect her verified GitHub repositories under Januuuu1creates!",
    targetId: "contact",
    badge: "07 / CONNECT",
    shortLabel: "Let's Connect",
  },
];

export default function ToyGuide() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTourPlaying, setIsTourPlaying] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; char: string }[]>([]);
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0 });

  const activeStep = TOY_EXPLANATIONS[currentStepIndex];

  useEffect(() => {
    setIsMuted(ttsVoice.getMuted());
    const unsubscribe = ttsVoice.subscribe((state) => {
      setIsSpeaking(state.isSpeaking);
      setIsPaused(state.isPaused);
    });
    return () => {
      unsubscribe();
      ttsVoice.stop();
    };
  }, []);

  // Give the guide a subtle tilt toward the cursor.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setHeadTilt({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Sync with scroll position to update speech bubble contextually
  useEffect(() => {
    const handleScroll = () => {
      if (isTourPlaying) return; // Don't override during manual tour
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (let i = 0; i < TOY_EXPLANATIONS.length; i++) {
        const step = TOY_EXPLANATIONS[i];
        const el = document.getElementById(step.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentStepIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTourPlaying]);

  const speakCurrentStep = (stepIdx: number, continueTour = false) => {
    const step = TOY_EXPLANATIONS[stepIdx];
    if (!isMuted) {
      ttsVoice.speak(step.speech, undefined, () => {
        if (continueTour && stepIdx < TOY_EXPLANATIONS.length - 1) {
          setTimeout(() => {
            goToStep(stepIdx + 1, true, true);
          }, 1000);
        } else {
          setIsTourPlaying(false);
        }
      });
    }
  };

  const goToStep = (
    stepIdx: number,
    autoSpeak: boolean = true,
    continueTour: boolean = false
  ) => {
    soundFX.playClick();
    setCurrentStepIndex(stepIdx);
    const target = TOY_EXPLANATIONS[stepIdx].targetId;
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (autoSpeak) {
      speakCurrentStep(stepIdx, continueTour);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < TOY_EXPLANATIONS.length - 1) {
      goToStep(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  };

  const startExplainEverything = () => {
    soundFX.playSparkle();
    setIsExpanded(true);
    setIsTourPlaying(true);
    goToStep(0, true, true);
  };

  const toggleVoice = () => {
    if (isSpeaking) {
      ttsVoice.togglePlayPause();
    } else {
      speakCurrentStep(currentStepIndex);
    }
  };

  const toggleMute = () => {
    soundFX.playClick();
    const muted = ttsVoice.toggleMute();
    setIsMuted(muted);
  };

  const triggerSparkles = () => {
    soundFX.playSparkle();
    const emojis = ["✨", "🌟", "💜", "💙", "⭐", "🎉", "🚀"];
    const id = Date.now();
    setSparkles((prev) => [
      ...prev,
      { id, char: emojis[Math.floor(Math.random() * emojis.length)] },
    ]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 1200);

    // Speak or toggle expanded
    if (!isExpanded) {
      setIsExpanded(true);
      speakCurrentStep(currentStepIndex);
    } else {
      toggleVoice();
    }
  };

  return (
    <aside
      id="toy-guide-companion"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none pointer-events-auto"
      aria-label="Portfolio Guide Explaining Jahnavi's Portfolio"
    >
      {/* Floating Sparkles on Tap */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="absolute -top-8 right-12 text-2xl pointer-events-none animate-bounce"
        >
          {sp.char}
        </div>
      ))}

      {/* Expanded Interactive Tour Console */}
      {isExpanded ? (
        <div className="w-[320px] sm:w-[400px] mb-3 rounded-3xl scifi-glass-panel border-cyan-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-5 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Subtle Ambient Cosmic Lighting */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-sky-500/20 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#f472b6]" />
              <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                PORTFOLIO GUIDE &bull; EXPLAINING
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Play/Pause Voice */}
              <button
                onClick={toggleVoice}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-sky-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                title={isSpeaking ? (isPaused ? "Resume Voice" : "Pause Voice") : "Speak Explanation"}
                aria-label="Toggle Speech"
              >
                {isSpeaking && !isPaused ? (
                  <Pause className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Mute/Unmute */}
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-sky-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
                aria-label="Toggle Mute"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </button>

              {/* Minimize to Corner */}
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsExpanded(false);
                }}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-sky-500/30 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer ml-1"
                aria-label="Minimize Portfolio Guide"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Current Step Content Box */}
          <div className="p-3.5 rounded-2xl bg-slate-950/75 border border-sky-500/25 relative z-10 mb-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
              <span>{activeStep.badge}</span>
              <span className="text-slate-400">
                STEP {currentStepIndex + 1} OF {TOY_EXPLANATIONS.length}
              </span>
            </div>

            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{activeStep.title}</span>
            </h4>

            <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-sans">
              {activeStep.speech}
            </p>

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-sky-500/15 text-xs font-mono">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-sky-500/20 text-slate-300 hover:text-white hover:border-cyan-400/40 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>Prev</span>
              </button>

              <button
                onClick={() => goToStep(currentStepIndex, true)}
                className="text-[11px] text-cyan-400 hover:text-cyan-200 flex items-center gap-1 cursor-pointer font-semibold"
              >
                <span>Jump to Section</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentStepIndex === TOY_EXPLANATIONS.length - 1}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-cyan-200 hover:text-white hover:bg-cyan-900 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <span>Next</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Clickable Topics: Ask Toy About Anything */}
          <div className="space-y-1.5 relative z-10">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block mb-1">
              CLICK A TOPIC TO HEAR AN EXPLANATION:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {TOY_EXPLANATIONS.map((step, idx) => {
                const isSelected = currentStepIndex === idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => goToStep(idx, true)}
                    className={`px-2 py-1.5 rounded-xl text-[10px] font-mono text-left transition-all duration-150 cursor-pointer truncate ${
                      isSelected
                        ? "bg-gradient-to-r from-cyan-500/30 to-violet-600/30 text-cyan-200 border border-cyan-400/50 font-bold"
                        : "bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-900/90 border border-sky-500/15"
                    }`}
                  >
                    &bull; {step.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Floating Speech Bubble when minimized */
        <div className="relative mb-2 max-w-[240px] sm:max-w-[280px] animate-in fade-in duration-200">
          <div className="p-3 rounded-2xl scifi-glass-panel border-cyan-400/40 text-xs text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>{activeStep.badge}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-200 leading-snug line-clamp-2">
                {activeStep.speech}
              </p>
              <button
                onClick={startExplainEverything}
                className="text-[10px] font-mono text-cyan-400 hover:text-cyan-200 font-bold uppercase underline underline-offset-2 flex items-center gap-1 cursor-pointer pt-0.5"
              >
                <span>▶ Explain My Portfolio</span>
              </button>
            </div>

            <button
              onClick={() => setIsExpanded(true)}
              className="text-slate-400 hover:text-cyan-300 p-0.5 rounded cursor-pointer shrink-0"
              title="Expand Portfolio Guide"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speech Bubble Tip */}
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-950/95 ml-auto mr-8 -mt-[1px]" />
        </div>
      )}

      {/* Illustrated portfolio guide */}
      <div className="flex items-center gap-2">
        {/* Toggle Expand / Minimize Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            setIsExpanded(!isExpanded);
          }}
          className="p-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-sky-500/30 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-colors shadow-xs cursor-pointer text-[10px] font-mono"
          title={isExpanded ? "Minimize Guide" : "Expand Portfolio Guide"}
          aria-label={isExpanded ? "Minimize Guide" : "Expand Portfolio Guide"}
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
          )}
        </button>

        <button
          type="button"
          onClick={triggerSparkles}
          className="relative group cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
          title="Tap to hear me explain Jahnavi's portfolio"
          aria-label="Hear the portfolio guide explain Jahnavi's portfolio"
          style={{
            transform: `translate3d(0, 0, 0) rotate(${headTilt.x * 0.15}deg)`,
          }}
        >
          <div className="absolute inset-1 rounded-[1.5rem] bg-pink-400/40 blur-xl animate-pulse pointer-events-none" />

          <div className="relative w-24 h-36 sm:w-28 sm:h-[168px] pointer-events-none">
            <Image
              src="/portfolio-guide-cutout.png"
              alt="Illustration of Jahnavi's portfolio guide"
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-contain drop-shadow-[0_10px_24px_rgba(192,132,252,0.55)]"
            />
          </div>
        </button>
      </div>
    </aside>
  );
}
