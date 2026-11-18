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
  Footprints,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";

interface TourStep {
  title: string;
  speech: string;
  targetId?: string;
  badge: string;
}

const tourSteps: TourStep[] = [
  {
    title: "Hi, I'm Jahnavi's Bubbly Robot! ✨",
    speech:
      "Hello! I'm Jahnavi Murthy's cute bubbly companion robot! 🌟 Watch me walk up and down as I guide you through her portfolio as an Aspiring Software Engineer, Full-Stack Developer, and Cloud & AI enthusiast! Check out my chest badge: JAHNAVI!",
    targetId: "hero",
    badge: "01 / INTRO",
  },
  {
    title: "About Jahnavi's Mission 💡",
    speech:
      "Jahnavi is a Computer Science student dedicated to building innovative applications and solving real-world challenges. She loves clean code, cloud architecture, and modern engineering!",
    targetId: "about",
    badge: "02 / ABOUT",
  },
  {
    title: "17+ Technical Superpowers! ⚡",
    speech:
      "From React, Next.js, and TypeScript on the frontend to Python, C#, and ASP.NET MVC on the backend, plus AWS and Terraform for automated infrastructure deployment!",
    targetId: "about",
    badge: "03 / SKILLS",
  },
  {
    title: "01: Appointment Booking System 📅",
    speech:
      "Her Appointment Booking System web app is built with ASP.NET MVC, C#, Entity Framework, and SQL Server for fast, reliable scheduling and user management.",
    targetId: "projects",
    badge: "04 / PROJECT",
  },
  {
    title: "02: AI Resume Parser 📄",
    speech:
      "Her AI Resume Parser uses Python, Natural Language Processing (NLP), Scikit-learn, and Pandas to automatically extract resume data and evaluate candidate skills!",
    targetId: "projects",
    badge: "05 / PROJECT",
  },
  {
    title: "03: Cloud Infrastructure Automation ☁️",
    speech:
      "Look at her AWS cloud automation! Jahnavi automated EC2 web servers, Apache hosting, S3 buckets, and IAM security permissions completely in Terraform code!",
    targetId: "projects",
    badge: "06 / PROJECT",
  },
  {
    title: "04: AI Cooking Assistant 🍳",
    speech:
      "Her smart AI Cooking Assistant recommends delicious recipes based on whatever ingredients you provide, powered by Python, Flask, and clean REST APIs!",
    targetId: "projects",
    badge: "07 / PROJECT",
  },
  {
    title: "Let's Connect & Build! 💌",
    speech:
      "Jahnavi is actively looking for software engineering roles and internships! Reach out via email (jahnavimurthy878@gmail.com) or LinkedIn. We'd love to collaborate!",
    targetId: "contact",
    badge: "08 / CONNECT",
  },
];

export default function DollCompanion() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isWalkingUpDown, setIsWalkingUpDown] = useState(true);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; char: string; x: number; y: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Cute bubbly audio chime
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

  // Cursor tracking for real-time bubbly eye movement & 3D head tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height * 0.45;

      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const dist = Math.min(Math.hypot(deltaX, deltaY) / 20, 7);
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

  // Life-like blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 160);
      }
    }, 3500);
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

    const emojis = ["✨", "💛", "🫧", "🌟", "⭐", "🎉"];
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
      "🫧 'Beep boop! I'm Jahnavi's bubbly software robot!'",
      "💛 'Look at my chest badge: JAHNAVI!'",
      "↕️ 'Walking up and down to explain her projects!'",
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
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-amber-200/80 text-amber-900 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span className="font-bold tracking-wider text-[11px] uppercase">
            Jahnavi&apos;s Bubbly Companion &bull; [00]
          </span>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-amber-200/80 text-slate-700 hover:text-amber-700 hover:border-amber-300 transition-colors cursor-pointer shadow-xs"
          title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
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

      {/* SPEECH BALLOON EXPLAINING THE PORTFOLIO (Swiss Minimalist Card) */}
      <div className="w-full bg-white/95 backdrop-blur-md border-2 border-amber-200/90 rounded-3xl p-6 sm:p-7 shadow-xl shadow-amber-900/5 relative z-20 mb-4 transition-all">
        {/* Step Header */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider">
              {step.badge}
            </span>
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              {step.title}
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-amber-700">
            {currentStep + 1} / {tourSteps.length}
          </span>
        </div>

        {/* Narrative Speech Text */}
        <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed min-h-[60px]">
          {step.speech}
        </p>

        {/* Action Notice from Tap */}
        {actionNotice && (
          <div className="mt-2 text-xs font-mono text-amber-950 bg-amber-50 p-2.5 rounded-xl border border-amber-200 animate-in fade-in flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Tour Navigation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-amber-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep}
              className="p-2 rounded-xl bg-amber-50/60 border border-amber-200 text-slate-700 hover:text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white text-xs font-mono font-bold shadow-md shadow-amber-500/25 hover:from-amber-600 hover:to-yellow-700 transition-all cursor-pointer"
            >
              <span>Walk &amp; Explain Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick jump pills */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-2.5 py-1 rounded-lg bg-amber-50/50 border border-amber-200 text-slate-700 hover:text-amber-700 hover:border-amber-300 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-2.5 py-1 rounded-lg bg-amber-50/50 border border-amber-200 text-slate-700 hover:text-amber-700 hover:border-amber-300 cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-2.5 py-1 rounded-lg bg-amber-50/50 border border-amber-200 text-slate-700 hover:text-amber-700 hover:border-amber-300 cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => setCurrentStep(7)}
              className="px-2.5 py-1 rounded-lg bg-amber-50/50 border border-amber-200 text-slate-700 hover:text-amber-700 hover:border-amber-300 cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Speech Bubble Arrow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white" />
      </div>

      {/* THE CUTE BUBBLY ROBOT THAT WALKS UP AND DOWN
          Standalone on canvas (NO full boxed image!), with moving eyes, golden halo visor, and articulated walking legs */}
      <div
        onClick={handleRobotTap}
        className={`relative w-80 h-96 sm:w-96 sm:h-[420px] cursor-pointer flex flex-col items-center justify-center select-none ${
          isWalkingUpDown ? "animate-walk-up-down" : ""
        }`}
        title="Tap me! I'm Jahnavi Murthy's cute bubbly software robot!"
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

        {/* Dynamic Floor Shadow (Expands and contracts as robot walks up and down) */}
        <div className="absolute bottom-4 w-60 sm:w-72 h-10 rounded-full bg-amber-900/15 blur-lg -z-10 animate-pulse" />

        {/* Warm Fairy Light Strand at Robot's Feet */}
        <div className="absolute bottom-2 w-72 sm:w-84 h-6 flex items-center justify-around pointer-events-none -z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-md shadow-amber-400 animate-fairy-glow" />
          <span className="w-3.5 h-3.5 rounded-full bg-yellow-200 shadow-lg shadow-amber-300 animate-fairy-glow" />
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400 animate-fairy-glow" />
          <span className="w-3 h-3 rounded-full bg-yellow-100 shadow-lg shadow-amber-400 animate-fairy-glow" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-md shadow-amber-400 animate-fairy-glow" />
        </div>

        {/* 3D SCULPTED CUTE BUBBLY ROBOT */}
        <div
          style={{
            transform: `rotateX(${headTilt.x}deg) rotateY(${headTilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.12s ease-out",
          }}
          className={`relative w-full h-full flex flex-col items-center justify-center [perspective:1000px] ${
            isWalkingUpDown ? "animate-walk-bob animate-bubbly-bounce" : "animate-float"
          }`}
        >
          <svg
            viewBox="0 0 400 460"
            className="w-full h-full drop-shadow-2xl overflow-visible"
          >
            <defs>
              {/* Glossy Bubbly White Ceramic Helmet */}
              <radialGradient id="bubblyHeadGrad" cx="38%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FCFBF8" />
                <stop offset="80%" stopColor="#EDE7DC" />
                <stop offset="100%" stopColor="#D8D0C3" />
              </radialGradient>

              {/* Chubby Round Torso */}
              <radialGradient id="bubblyBodyGrad" cx="42%" cy="32%" r="68%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FAF7F2" />
                <stop offset="88%" stopColor="#E5DFD4" />
                <stop offset="100%" stopColor="#D0C7B8" />
              </radialGradient>

              {/* Metallic Golden Mechanical Joints */}
              <linearGradient id="goldJointGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>

              {/* Dark Obsidian Visor Screen */}
              <radialGradient id="visorGlassGrad" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#2E231C" />
                <stop offset="65%" stopColor="#18120E" />
                <stop offset="100%" stopColor="#0B0806" />
              </radialGradient>

              {/* Cute Bubbly Eyes Core */}
              <radialGradient id="cuteEyeGrad" cx="45%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#35261D" />
                <stop offset="75%" stopColor="#17100B" />
                <stop offset="100%" stopColor="#0A0704" />
              </radialGradient>

              {/* Golden Visor Halo Glow Filter */}
              <filter id="goldenHaloGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur1" />
                <feGaussianBlur stdDeviation="9" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Cute Cheek Blush Blur */}
              <filter id="blushGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            {/* === 1. CHUBBY BUBBLY WALKING FEET & LEGS === */}
            {/* Left Foot (Articulated Walking Swing) */}
            <g className={isWalkingUpDown ? "animate-walk-left-leg" : ""}>
              <circle cx="165" cy="388" r="9" fill="url(#goldJointGrad)" />
              <path
                d="M 158 388 L 154 416 C 154 420 176 420 176 416 L 172 388 Z"
                fill="url(#bubblyBodyGrad)"
              />
              <rect x="153" y="414" width="24" height="4" rx="2" fill="url(#goldJointGrad)" />
              {/* Bubbly Round Boot */}
              <ellipse cx="165" cy="428" rx="26" ry="14" fill="#C9C2B5" />
              <ellipse cx="165" cy="425" rx="24" ry="12" fill="url(#bubblyHeadGrad)" />
              <ellipse cx="165" cy="422" rx="16" ry="7" fill="url(#goldJointGrad)" opacity="0.85" />
            </g>

            {/* Right Foot (Opposite Walking Swing) */}
            <g className={isWalkingUpDown ? "animate-walk-right-leg" : ""}>
              <circle cx="235" cy="388" r="9" fill="url(#goldJointGrad)" />
              <path
                d="M 228 388 L 224 416 C 224 420 246 420 246 416 L 242 388 Z"
                fill="url(#bubblyBodyGrad)"
              />
              <rect x="223" y="414" width="24" height="4" rx="2" fill="url(#goldJointGrad)" />
              {/* Bubbly Round Boot */}
              <ellipse cx="235" cy="428" rx="26" ry="14" fill="#C9C2B5" />
              <ellipse cx="235" cy="425" rx="24" ry="12" fill="url(#bubblyHeadGrad)" />
              <ellipse cx="235" cy="422" rx="16" ry="7" fill="url(#goldJointGrad)" opacity="0.85" />
            </g>

            {/* === 2. CHUBBY BUBBLY TORSO & JAHNAVI NAME BADGE === */}
            <ellipse cx="200" cy="365" rx="60" ry="46" fill="url(#bubblyBodyGrad)" />

            {/* Golden Mechanical Waist Joint Ring */}
            <path
              d="M 150 382 Q 200 395 250 382"
              stroke="url(#goldJointGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* ILLUMINATED NAME BADGE: JAHNAVI */}
            <g>
              <rect
                x="150"
                y="336"
                width="100"
                height="22"
                rx="11"
                fill="#1C1814"
                stroke="url(#goldJointGrad)"
                strokeWidth="1.8"
              />
              <circle cx="164" cy="347" r="3" fill="#F59E0B" className="animate-pulse" />
              <text
                x="207"
                y="351.5"
                textAnchor="middle"
                fontSize="10"
                fontWeight="900"
                fontFamily="ui-monospace, monospace"
                fill="#FDE68A"
                letterSpacing="1.4"
              >
                JAHNAVI
              </text>
            </g>

            {/* === 3. STUBBY CHUBBY BUBBLY ARMS & HANDS === */}
            <g className={isWalkingUpDown ? "animate-walk-arms origin-[145px_335px]" : ""}>
              <circle cx="145" cy="336" r="8" fill="url(#goldJointGrad)" />
              <path
                d="M 144 336 Q 118 355 124 378"
                stroke="url(#bubblyBodyGrad)"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="124" cy="378" r="5" fill="url(#goldJointGrad)" />
              <circle cx="125" cy="385" r="9" fill="url(#bubblyHeadGrad)" />
            </g>

            <g className={isWalkingUpDown ? "animate-walk-arms origin-[255px_335px] [animation-direction:reverse]" : ""}>
              <circle cx="255" cy="336" r="8" fill="url(#goldJointGrad)" />
              <path
                d="M 256 336 Q 282 355 276 378"
                stroke="url(#bubblyBodyGrad)"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="276" cy="378" r="5" fill="url(#goldJointGrad)" />
              <circle cx="275" cy="385" r="9" fill="url(#bubblyHeadGrad)" />
            </g>

            {/* === 4. GIANT SPHERICAL BUBBLE HEAD & HELMET === */}
            {/* Perfect Bubbly Head */}
            <ellipse cx="200" cy="192" rx="118" ry="114" fill="url(#bubblyHeadGrad)" />

            {/* Bubbly Specular Gloss Glaze */}
            <path
              d="M 125 120 Q 200 90 275 120 Q 200 105 125 120 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />

            {/* Bubbly Round Capsule Headphones */}
            <g>
              <ellipse cx="84" cy="202" rx="14" ry="42" fill="#D5CEC3" />
              <ellipse cx="87" cy="202" rx="11" ry="38" fill="url(#bubblyHeadGrad)" />
              <circle cx="87" cy="202" r="4.5" fill="url(#goldJointGrad)" />
            </g>

            <g>
              <ellipse cx="316" cy="202" rx="14" ry="42" fill="#D5CEC3" />
              <ellipse cx="313" cy="202" rx="11" ry="38" fill="url(#bubblyHeadGrad)" />
              <circle cx="313" cy="202" r="4.5" fill="url(#goldJointGrad)" />
            </g>

            {/* Cute Golden Cheek Blush (Bubbly blush ovals) */}
            <ellipse cx="132" cy="235" rx="12" ry="7" fill="#F59E0B" opacity="0.32" filter="url(#blushGlow)" />
            <ellipse cx="268" cy="235" rx="12" ry="7" fill="#F59E0B" opacity="0.32" filter="url(#blushGlow)" />

            {/* === 5. PULSING GOLDEN HALO VISOR RIM === */}
            <path
              d="M 112 208 C 112 153 150 133 200 133 C 250 133 288 153 288 208 C 288 263 250 278 200 278 C 150 278 112 263 112 208 Z"
              stroke="#F59E0B"
              strokeWidth="6"
              fill="none"
              filter="url(#goldenHaloGlow)"
            />

            <path
              d="M 112 208 C 112 153 150 133 200 133 C 250 133 288 153 288 208 C 288 263 250 278 200 278 C 150 278 112 263 112 208 Z"
              stroke="#FEF3C7"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Dark Glossy Obsidian Glass Visor */}
            <path
              d="M 116 208 C 116 158 152 138 200 138 C 248 138 284 158 284 208 C 284 258 248 273 200 273 C 152 273 116 258 116 208 Z"
              fill="url(#visorGlassGrad)"
            />

            {/* Curved Specular Glaze */}
            <path
              d="M 135 163 Q 200 146 265 163 Q 200 154 135 163 Z"
              fill="#FFFFFF"
              opacity="0.2"
            />

            {/* === 6. GIANT BUBBLY EYES (Smooth Mouse Cursor Tracking) === */}
            {/* Left Eye */}
            <g>
              <circle cx="162" cy="213" r="26" fill="none" stroke="#F59E0B" strokeWidth="2.5" filter="url(#goldenHaloGlow)" />
              <circle
                cx={162 + eyeOffset.x * 0.45}
                cy={213 + eyeOffset.y * 0.45}
                r="24"
                fill="url(#cuteEyeGrad)"
              />

              {blinking ? (
                <rect x="140" y="211" width="44" height="4" rx="2" fill="#F59E0B" />
              ) : (
                <>
                  <circle
                    cx={162 + eyeOffset.x * 0.35}
                    cy={213 + eyeOffset.y * 0.35}
                    r="12"
                    fill="#D97706"
                    opacity="0.45"
                  />
                  {/* Top-Left Crisp Specular Highlight */}
                  <ellipse
                    cx={154 + eyeOffset.x * 0.3}
                    cy={204 + eyeOffset.y * 0.3}
                    rx="8"
                    ry="6.5"
                    fill="#FFFFFF"
                    opacity="0.95"
                    transform="rotate(-20 154 204)"
                  />
                  {/* Bottom-Right Secondary Reflection */}
                  <circle
                    cx={170 + eyeOffset.x * 0.3}
                    cy={222 + eyeOffset.y * 0.3}
                    r="4"
                    fill="#FFFFFF"
                    opacity="0.85"
                  />
                </>
              )}
            </g>

            {/* Right Eye */}
            <g>
              <circle cx="238" cy="213" r="26" fill="none" stroke="#F59E0B" strokeWidth="2.5" filter="url(#goldenHaloGlow)" />
              <circle
                cx={238 + eyeOffset.x * 0.45}
                cy={213 + eyeOffset.y * 0.45}
                r="24"
                fill="url(#cuteEyeGrad)"
              />

              {blinking || isWinking ? (
                <path
                  d="M 218 213 Q 238 224 258 213"
                  stroke="#F59E0B"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <>
                  <circle
                    cx={238 + eyeOffset.x * 0.35}
                    cy={213 + eyeOffset.y * 0.35}
                    r="12"
                    fill="#D97706"
                    opacity="0.45"
                  />
                  {/* Top-Left Crisp Specular Highlight */}
                  <ellipse
                    cx={230 + eyeOffset.x * 0.3}
                    cy={204 + eyeOffset.y * 0.3}
                    rx="8"
                    ry="6.5"
                    fill="#FFFFFF"
                    opacity="0.95"
                    transform="rotate(-20 230 204)"
                  />
                  {/* Bottom-Right Secondary Reflection */}
                  <circle
                    cx={246 + eyeOffset.x * 0.3}
                    cy={222 + eyeOffset.y * 0.3}
                    r="4"
                    fill="#FFFFFF"
                    opacity="0.85"
                  />
                </>
              )}
            </g>

            {/* === 7. SWEET BUBBLY CHIBI SMILE === */}
            <path
              d="M 192 245 Q 200 252 208 245"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
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
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
            isWalkingUpDown
              ? "bg-amber-500 text-white font-bold shadow-amber-500/30"
              : "bg-white text-slate-700 border border-amber-200 hover:text-amber-700"
          }`}
          title={isWalkingUpDown ? "Pause walking up & down" : "Start walking up & down"}
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>{isWalkingUpDown ? "Walking Up & Down" : "Resume Walk"}</span>
        </button>

        {/* Tap Me Reaction */}
        <button
          onClick={handleRobotTap}
          className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-amber-100/90 text-amber-900 border border-amber-300 hover:bg-amber-200 transition-all cursor-pointer font-bold flex items-center gap-1.5 shadow-xs"
        >
          <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          <span>Bubbly Tap!</span>
        </button>

        {/* Next Project Tour Trigger */}
        <button
          onClick={handleNextStep}
          className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white text-slate-700 border border-amber-200 hover:text-amber-800 hover:border-amber-300 transition-all cursor-pointer flex items-center gap-1"
        >
          <span>Next Project</span>
          <ChevronRight className="w-3 h-3 text-amber-600" />
        </button>
      </div>
    </div>
  );
}
