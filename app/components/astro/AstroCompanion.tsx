"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  createAstroCharacter,
  disposeAstroCharacter,
  AstroRig,
} from "./AstroCharacter";
import { AstroAnimationController, AstroActionState } from "./AstroAnimations";
import { AstroMovementController, SECTION_WAYPOINTS } from "./AstroMovement";
import {
  ASTRO_SECTION_EXPLANATIONS,
  ASTRO_FAQS,
  SectionExplanation,
  FAQItem,
} from "./AstroKnowledgeBase";
import AstroSpeechBubble from "./AstroSpeechBubble";
import { ttsVoice } from "../ttsVoice";
import { soundFX } from "../soundFx";
import { Sparkles, Bot, ChevronUp, ChevronDown, Radio } from "lucide-react";

export default function AstroCompanion() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<AstroRig | null>(null);
  const animControllerRef = useRef<AstroAnimationController | null>(null);
  const movementControllerRef = useRef<AstroMovementController>(new AstroMovementController());

  // State
  const [currentSection, setCurrentSection] = useState<string>("introduction");
  const [currentPose, setCurrentPose] = useState<AstroActionState>("wave");
  const [isBubbleOpen, setIsBubbleOpen] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [activeFAQ, setActiveFAQ] = useState<FAQItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [sparkles, setSparkles] = useState<{ id: number; char: string }[]>([]);
  const [outfitTheme, setOutfitTheme] = useState<"lavender" | "pink" | "sky">("lavender");
  const dragRef = useRef({
    active: false,
    startX: 0,
    rotation: -0.2,
    moved: false,
  });

  const explanation: SectionExplanation =
    ASTRO_SECTION_EXPLANATIONS[currentSection] || ASTRO_SECTION_EXPLANATIONS.introduction;

  // Initialize Speech Voice Sync
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

  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;

    const palettes = {
      lavender: {
        lilac: 0xe9d5ff,
        pink: 0xf472b6,
        eye: 0x38bdf8,
        blush: 0xff8fab,
        rotation: -0.2,
      },
      pink: {
        lilac: 0xfbcfe8,
        pink: 0xfb7185,
        eye: 0xc084fc,
        blush: 0xff91a8,
        rotation: 0.15,
      },
      sky: {
        lilac: 0xbae6fd,
        pink: 0x67e8f9,
        eye: 0x2563eb,
        blush: 0xf9a8d4,
        rotation: -0.35,
      },
    } as const;
    const palette = palettes[outfitTheme];

    const lilac = (rig.materials.softLilac || rig.materials.lilac) as THREE.MeshStandardMaterial | undefined;
    const pink = (rig.materials.strawberryPink || rig.materials.pastelPink || rig.materials.pink) as THREE.MeshStandardMaterial | undefined;
    const eye = (rig.materials.eyeIris || rig.materials.eyeBase) as THREE.MeshBasicMaterial | undefined;
    const blush = rig.materials.blush as THREE.MeshBasicMaterial | undefined;
    if (lilac?.color) lilac.color.setHex(palette.lilac);
    if (pink?.color) pink.color.setHex(palette.pink);
    if (eye?.color) eye.color.setHex(palette.eye);
    if (blush?.color) blush.color.setHex(palette.blush);
    dragRef.current.rotation = palette.rotation;
  }, [outfitTheme]);

  // Initialize Three.js Procedural 3D Character
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 160;
    const height = 190;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.25, 4.4);
    camera.lookAt(0, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lighting for glossy toy materials
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc084fc, 2.5); // Lavender rim
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const cyanFill = new THREE.DirectionalLight(0x38bdf8, 1.8);
    cyanFill.position.set(0, -3, 2);
    scene.add(cyanFill);

    // Procedural Character Rig
    const rig = createAstroCharacter();
    const initialTheme = {
      lavender: { lilac: 0xe9d5ff, pink: 0xf472b6, eye: 0x38bdf8, blush: 0xff8fab, rotation: -0.2 },
      pink: { lilac: 0xfbcfe8, pink: 0xfb7185, eye: 0xc084fc, blush: 0xff91a8, rotation: 0.15 },
      sky: { lilac: 0xbae6fd, pink: 0x67e8f9, eye: 0x2563eb, blush: 0xf9a8d4, rotation: -0.35 },
    }[outfitTheme];
    const matLilac = (rig.materials.softLilac || rig.materials.lilac) as THREE.MeshStandardMaterial | undefined;
    const matPink = (rig.materials.strawberryPink || rig.materials.pastelPink || rig.materials.pink) as THREE.MeshStandardMaterial | undefined;
    const matEye = (rig.materials.eyeIris || rig.materials.eyeBase) as THREE.MeshBasicMaterial | undefined;
    const matBlush = rig.materials.blush as THREE.MeshBasicMaterial | undefined;
    if (matLilac?.color) matLilac.color.setHex(initialTheme.lilac);
    if (matPink?.color) matPink.color.setHex(initialTheme.pink);
    if (matEye?.color) matEye.color.setHex(initialTheme.eye);
    if (matBlush?.color) matBlush.color.setHex(initialTheme.blush);
    dragRef.current.rotation = initialTheme.rotation;
    scene.add(rig.rootGroup);
    rigRef.current = rig;

    const animController = new AstroAnimationController(rig);
    animControllerRef.current = animController;

    // Mouse Tracking
    let mouseNorm = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseNorm.x = (e.clientX - centerX) / (window.innerWidth * 0.5);
      mouseNorm.y = (e.clientY - centerY) / (window.innerHeight * 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (animControllerRef.current) {
        animControllerRef.current.update({
          state: currentPose,
          isSpeaking: ttsVoice.getMuted() ? false : isSpeaking,
          mouseNormalized: mouseNorm,
          time,
          delta,
        });
      }

      rig.rootGroup.rotation.y = dragRef.current.rotation;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      disposeAstroCharacter(rig);
      renderer.dispose();
    };
  }, [currentPose, isSpeaking]);

  // Section Tracking on Scroll (Astro roams and observes webpage)
  useEffect(() => {
    const handleScroll = () => {
      if (isTourActive) return; // Ignore scroll auto-update during explicit tour
      const result = movementControllerRef.current.updateScrollPosition(
        window.scrollY,
        window.innerHeight
      );

      if (result.hasChanged) {
        setCurrentSection(result.sectionId);
        setCurrentPose(result.defaultPose);
        setActiveFAQ(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTourActive]);

  // Interactions
  const handleAstroClick = () => {
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

    if (isMinimized) {
      setIsMinimized(false);
      setIsBubbleOpen(true);
    } else {
      setIsBubbleOpen((prev) => !prev);
    }

    // Astro waves when clicked
    setCurrentPose("wave");
    setTimeout(() => {
      setCurrentPose("idle");
    }, 2800);

    // Speak explanation if not muted
    if (!isMuted) {
      const textToSpeak = activeFAQ ? activeFAQ.answer : explanation.speech;
      ttsVoice.speak(textToSpeak);
    }
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      ttsVoice.togglePlayPause();
    } else {
      const textToSpeak = activeFAQ ? activeFAQ.answer : explanation.speech;
      ttsVoice.speak(textToSpeak);
    }
  };

  const handleToggleMute = () => {
    soundFX.playClick();
    const muted = ttsVoice.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectFAQ = (faq: FAQItem) => {
    soundFX.playClick();
    setActiveFAQ(faq);
    setCurrentPose("point");
    if (!isMuted) {
      ttsVoice.speak(faq.answer);
    }
    // Scroll to relevant section if appropriate
    const el = document.getElementById(faq.targetSection);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      setCurrentPose("idle");
    }, 3200);
  };

  const handleStartFullTour = () => {
    soundFX.playSparkle();
    setIsTourActive(true);
    setIsBubbleOpen(true);
    setIsMinimized(false);

    const sections = Object.keys(SECTION_WAYPOINTS);
    let tourIdx = 0;

    const playStep = (idx: number) => {
      if (idx >= sections.length) {
        setIsTourActive(false);
        setCurrentPose("wave");
        return;
      }

      const secId = sections[idx];
      setCurrentSection(secId);
      setActiveFAQ(null);
      const waypoint = SECTION_WAYPOINTS[secId];
      setCurrentPose(waypoint.defaultPose);

      const el = document.getElementById(secId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }

      const currentExplanation = ASTRO_SECTION_EXPLANATIONS[secId];
      if (!isMuted) {
        ttsVoice.speak(currentExplanation.speech, undefined, () => {
          setTimeout(() => {
            playStep(idx + 1);
          }, 1200);
        });
      } else {
        setTimeout(() => {
          playStep(idx + 1);
        }, 5000);
      }
    };

    playStep(tourIdx);
  };

  return (
    <aside
      id="astro-3d-companion"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none pointer-events-auto"
      aria-label="Astro 3D Toy Companion Guide"
    >
      {/* Floating Sparkles on Tap */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="absolute -top-10 right-14 text-2xl pointer-events-none animate-bounce"
        >
          {sp.char}
        </div>
      ))}

      {/* Holographic Speech Bubble */}
      {!isMinimized && isBubbleOpen && (
        <div className="relative mb-2 animate-in fade-in zoom-in-95 duration-200">
          <AstroSpeechBubble
            explanation={explanation}
            activeFAQ={activeFAQ}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            isMuted={isMuted}
            currentState={currentPose}
            onToggleVoice={handleToggleVoice}
            onToggleMute={handleToggleMute}
            onSelectFAQ={handleSelectFAQ}
            onClose={() => setIsBubbleOpen(false)}
            onChangePose={(pose) => {
              soundFX.playClick();
              setCurrentPose(pose);
            }}
            onStartFullTour={handleStartFullTour}
            outfitTheme={outfitTheme}
            onChangeOutfit={(theme) => {
              soundFX.playSparkle();
              setOutfitTheme(theme);
              setCurrentPose("celebrate");
              setTimeout(() => setCurrentPose("idle"), 2200);
            }}
          />
          {/* Speech Bubble Pointer Tip */}
          <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-slate-950/95 ml-auto mr-12 -mt-[1px]" />
        </div>
      )}

      {/* Astro 3D Character Viewport Capsule */}
      <div className="flex items-center gap-2">
        {/* Toggle Minimize/Maximize Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            if (isMinimized) {
              setIsMinimized(false);
              setIsBubbleOpen(true);
            } else {
              setIsMinimized(true);
              setIsBubbleOpen(false);
            }
          }}
          className="p-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-sky-500/30 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-colors shadow-xs cursor-pointer text-[10px] font-mono"
          title={isMinimized ? "Summon Astro" : "Minimize Astro"}
          aria-label={isMinimized ? "Summon Astro" : "Minimize Astro"}
        >
          {isMinimized ? (
            <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>

        {/* 3D Astro Canvas Wrapper */}
        <div
          onClick={() => {
            if (dragRef.current.moved) {
              dragRef.current.moved = false;
              return;
            }
            handleAstroClick();
          }}
          onDoubleClick={() => {
            soundFX.playSparkle();
            setCurrentPose("celebrate");
            setTimeout(() => setCurrentPose("idle"), 2600);
          }}
          onPointerDown={(event) => {
            dragRef.current.active = true;
            dragRef.current.startX = event.clientX;
            dragRef.current.moved = false;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!dragRef.current.active) return;
            const delta = event.clientX - dragRef.current.startX;
            if (Math.abs(delta) > 1) dragRef.current.moved = true;
            dragRef.current.rotation += delta * 0.012;
            dragRef.current.rotation = Math.max(-Math.PI, Math.min(Math.PI, dragRef.current.rotation));
            dragRef.current.startX = event.clientX;
          }}
          onPointerUp={(event) => {
            dragRef.current.active = false;
            event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            dragRef.current.active = false;
          }}
          className={`relative group cursor-grab active:cursor-grabbing touch-none transition-transform duration-300 hover:scale-105 active:scale-95 ${
            isMinimized ? "opacity-75 hover:opacity-100 scale-75" : ""
          }`}
          title="Drag to rotate Astro, tap for chat, or double-click to celebrate!"
        >
          {/* Subtle Dreamy Rose / Lavender Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-pink-500/25 via-purple-500/20 to-transparent blur-xl pointer-events-none group-hover:blur-2xl transition-all" />

          {/* Three.js Canvas Container */}
          <div
            ref={mountRef}
            className="w-[160px] h-[190px] flex items-center justify-center relative overflow-visible drop-shadow-[0_12px_28px_rgba(244,114,182,0.45)]"
          />

          {/* Name & Status Pill below character */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/95 border border-pink-400/80 shadow-[0_0_12px_rgba(244,114,182,0.6)] flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-[8px] font-mono font-black text-pink-200 tracking-widest uppercase">
              ASTRO 3D
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
