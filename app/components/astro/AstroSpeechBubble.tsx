"use client";

import React from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
  Sparkles,
  Heart,
  Radio,
} from "lucide-react";
import { AstroActionState } from "./AstroAnimations";
import { SectionExplanation, FAQItem, ASTRO_FAQS } from "./AstroKnowledgeBase";

interface AstroSpeechBubbleProps {
  explanation: SectionExplanation;
  activeFAQ: FAQItem | null;
  isSpeaking: boolean;
  isPaused: boolean;
  isMuted: boolean;
  currentState: AstroActionState;
  onToggleVoice: () => void;
  onToggleMute: () => void;
  onSelectFAQ: (faq: FAQItem) => void;
  onClose: () => void;
  onChangePose: (pose: AstroActionState) => void;
  onStartFullTour: () => void;
  outfitTheme: "lavender" | "pink" | "sky";
  onChangeOutfit: (theme: "lavender" | "pink" | "sky") => void;
}

export default function AstroSpeechBubble({
  explanation,
  activeFAQ,
  isSpeaking,
  isPaused,
  isMuted,
  currentState,
  onToggleVoice,
  onToggleMute,
  onSelectFAQ,
  onClose,
  onChangePose,
  onStartFullTour,
  outfitTheme,
  onChangeOutfit,
}: AstroSpeechBubbleProps) {
  const displayText = activeFAQ ? activeFAQ.answer : explanation.speech;
  const displayTitle = activeFAQ ? activeFAQ.question : explanation.greeting;
  const displayBadge = activeFAQ ? `FAQ &bull; ${activeFAQ.shortLabel}` : explanation.badge;

  return (
    <div className="w-[320px] sm:w-[400px] rounded-3xl scifi-glass-panel border-pink-400/40 shadow-[0_16px_50px_rgba(0,0,0,0.65)] p-5 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 select-none">
      {/* Soft Ambient Pastel Glows */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_#f472b6]" />
          <span className="text-xs font-mono font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
            <span>ASTRO</span>
            <span className="text-pink-400">&bull;</span>
            <span className="text-purple-300">3D COMPANION</span>
          </span>
        </div>

        {/* Audio & Close Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleVoice}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-pink-300 hover:text-white hover:border-pink-400 transition-colors cursor-pointer"
            title={isSpeaking ? (isPaused ? "Resume Voice" : "Pause Voice") : "Speak Explanation"}
            aria-label="Toggle Voice"
          >
            {isSpeaking && !isPaused ? (
              <Pause className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-pink-300 hover:text-white hover:border-pink-400 transition-colors cursor-pointer"
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
            aria-label="Toggle Mute"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-pink-400" />
            )}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-pink-400 transition-colors cursor-pointer ml-1"
            aria-label="Close speech bubble"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Dialogue Box */}
      <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 relative z-10 mb-3 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-pink-300 font-bold uppercase tracking-wider">
          <span dangerouslySetInnerHTML={{ __html: displayBadge }} />
          {isSpeaking && !isPaused && (
            <span className="flex items-center gap-1 text-pink-400 animate-pulse">
              <Radio className="w-3 h-3" />
              NARRATING
            </span>
          )}
        </div>

        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
          <span>{displayTitle}</span>
        </h4>

        <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-sans">
          {displayText}
        </p>

        {/* Guided Tour Launcher */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onStartFullTour}
            className="text-[11px] font-mono text-pink-300 hover:text-white font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>▶ Complete Tour (8 Chapters)</span>
          </button>

          <span className="text-[10px] font-mono text-purple-300/80">
            Pose: {currentState.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Ask Astro Quick Questions */}
      <div className="space-y-1.5 relative z-10 mb-3">
        <span className="text-[10px] font-mono text-purple-300/80 uppercase tracking-widest font-bold block mb-1">
          ASK ASTRO ABOUT JAHNAVI:
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {ASTRO_FAQS.slice(0, 4).map((faq) => {
            const isSelected = activeFAQ?.id === faq.id;
            return (
              <button
                key={faq.id}
                onClick={() => onSelectFAQ(faq)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono text-left transition-all duration-150 cursor-pointer truncate ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-500/25 to-purple-500/25 text-pink-200 border border-pink-400/50 font-bold shadow-xs"
                    : "bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                &bull; {faq.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Astro Action & Reaction Poses */}
      <div className="pt-2 border-t border-white/10 relative z-10">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
          <span className="uppercase tracking-widest font-bold">MAKE ASTRO REACT:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {[
            { label: "👋 Wave", state: "wave" as AstroActionState },
            { label: "🎉 Celebrate", state: "celebrate" as AstroActionState },
            { label: "👉 Point", state: "point" as AstroActionState },
            { label: "🌌 Float", state: "float" as AstroActionState },
            { label: "🚶 Waddle", state: "walk" as AstroActionState },
            { label: "🧘 Sit", state: "sit" as AstroActionState },
          ].map((action) => (
            <button
              key={action.state}
              onClick={() => onChangePose(action.state)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors cursor-pointer shrink-0 ${
                currentState === action.state
                  ? "bg-pink-500/25 border border-pink-400/60 text-pink-200 font-bold"
                  : "bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
              Dress Astro:
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: "lavender" as const, label: "Lavender", color: "bg-violet-400" },
              { id: "pink" as const, label: "Berry", color: "bg-pink-400" },
              { id: "sky" as const, label: "Sky", color: "bg-sky-400" },
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => onChangeOutfit(theme.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                  outfitTheme === theme.id
                    ? "bg-white/15 border border-white/30 text-white"
                    : "bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white"
                }`}
                aria-pressed={outfitTheme === theme.id}
              >
                <span className={`w-2 h-2 rounded-full ${theme.color}`} />
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
