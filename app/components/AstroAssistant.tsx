"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  Bot,
  Radio,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ttsVoice } from "./ttsVoice";
import { soundFX } from "./soundFx";

interface AstroTopic {
  id: string;
  label: string;
  sectionId: string;
  speech: string;
}

const ASTRO_TOPICS: AstroTopic[] = [
  {
    id: "intro",
    label: "Who is Jahnavi?",
    sectionId: "about",
    speech:
      "Jahnavi Murthy is an aspiring software engineer based in Bengaluru, India. She combines the analytical rigor of Computer Science and Physics with modern full-stack web and cloud engineering to build reliable, high-performance software systems.",
  },
  {
    id: "journey",
    label: "Professional Journey",
    sectionId: "journey",
    speech:
      "Jahnavi served as a Software Development Apprentice at Gainwell Technologies from July 2025 to January 2026, contributing to agile enterprise workflows and clean code. She holds a Bachelor's in Computer Science & Physics from 2022 to 2026.",
  },
  {
    id: "skills",
    label: "Technical Proficiencies",
    sectionId: "skills-section",
    speech:
      "Her core technical proficiencies include Java at 90 percent, Python at 75 percent, C# at 75 percent, JavaScript, HTML and CSS, SQL, React, Flask, Git, Data Structures and Algorithms, and Machine Learning.",
  },
  {
    id: "projects",
    label: "Featured Projects",
    sectionId: "projects",
    speech:
      "Jahnavi engineered four verified software systems: the AXIOM AI Agent with autonomous reasoning, an NLP-based AI Resume Parser, Cloud Infrastructure Automation using AWS and Terraform, and a smart AI Cooking Assistant.",
  },
  {
    id: "contact",
    label: "How to Connect",
    sectionId: "contact",
    speech:
      "Jahnavi is actively available for 2026 software engineering roles. You can reach her directly via email at jahnavimurthy1111@gmail.com, on LinkedIn, or inspect her verified GitHub repositories under Januuuu1creates.",
  },
];

export default function AstroAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState<AstroTopic>(ASTRO_TOPICS[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

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

  const handleSelectTopic = (topic: AstroTopic) => {
    soundFX.playClick();
    setActiveTopic(topic);
    setHasInteracted(true);
    if (!isMuted) {
      ttsVoice.speak(topic.speech);
    }
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      ttsVoice.togglePlayPause();
    } else {
      ttsVoice.speak(activeTopic.speech);
    }
  };

  const handleToggleMute = () => {
    soundFX.playClick();
    const muted = ttsVoice.toggleMute();
    setIsMuted(muted);
  };

  const scrollToSection = (sectionId: string) => {
    soundFX.playClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className="fixed bottom-6 right-6 z-40 select-none pointer-events-auto"
      aria-label="Astro AI Portfolio Assistant"
    >
      {/* Expanded Holographic Assistant Window */}
      {isOpen ? (
        <div className="w-[320px] sm:w-[380px] rounded-3xl scifi-glass-panel border-cyan-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-5 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Subtle Ambient Cosmic Lighting */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-sky-500/20 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white shadow-[0_0_12px_rgba(56,189,248,0.5)] border border-cyan-300/40">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-white tracking-wider">
                    ASTRO
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] font-mono text-cyan-300">
                  Portfolio Intelligence Guide
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              {/* Play/Pause Speech */}
              <button
                onClick={handleToggleVoice}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-sky-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                title={isSpeaking ? (isPaused ? "Resume Speech" : "Pause Speech") : "Read Aloud"}
                aria-label={isSpeaking ? (isPaused ? "Resume Speech" : "Pause Speech") : "Read Aloud"}
              >
                {isSpeaking && !isPaused ? (
                  <Pause className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Mute/Unmute */}
              <button
                onClick={handleToggleMute}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-sky-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
                aria-label={isMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  soundFX.playClick();
                  ttsVoice.stop();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-sky-500/30 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer ml-1"
                aria-label="Close Astro assistant"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Explanation Content Card */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-sky-500/25 relative z-10 mb-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
              <span>EXPLORING: {activeTopic.label}</span>
              {isSpeaking && !isPaused && (
                <span className="flex items-center gap-1 text-cyan-400 animate-pulse">
                  <Radio className="w-3 h-3" />
                  NARRATING
                </span>
              )}
            </div>

            <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-sans">
              {activeTopic.speech}
            </p>

            {/* Jump to section action */}
            <button
              onClick={() => scrollToSection(activeTopic.sectionId)}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 hover:text-cyan-200 font-semibold cursor-pointer pt-1 transition-colors"
            >
              <span>Jump to Section</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Clickable Topics Selector */}
          <div className="space-y-1.5 relative z-10">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block mb-1">
              ASK ASTRO ABOUT:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {ASTRO_TOPICS.map((topic) => {
                const isSelected = activeTopic.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono text-left transition-all duration-150 cursor-pointer truncate ${
                      isSelected
                        ? "bg-gradient-to-r from-cyan-500/30 to-violet-600/30 text-cyan-200 border border-cyan-400/50 font-bold"
                        : "bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-900/90 border border-sky-500/15"
                    }`}
                  >
                    &bull; {topic.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Docked Floating Trigger Capsule */
        <button
          onClick={() => {
            soundFX.playSparkle();
            setIsOpen(true);
            if (!hasInteracted && !isMuted) {
              ttsVoice.speak(activeTopic.speech);
              setHasInteracted(true);
            }
          }}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full scifi-glass-panel border-cyan-400/40 hover:border-cyan-400 text-slate-100 shadow-[0_8px_30px_rgba(56,189,248,0.25)] hover:shadow-[0_8px_35px_rgba(56,189,248,0.45)] transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Open Astro AI Guide"
        >
          {/* Subtle Glowing Pulse Dot */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="absolute w-4 h-4 rounded-full bg-cyan-400/40 animate-ping" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              ASTRO &bull; AI GUIDE
            </span>
            <span className="text-[9px] font-mono text-cyan-400/80 -mt-0.5">
              Click to Explore Portfolio
            </span>
          </div>

          <div className="w-7 h-7 rounded-full bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-xs ml-1">
            <Bot className="w-3.5 h-3.5" />
          </div>
        </button>
      )}
    </aside>
  );
}
