"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { createAstroCharacter, disposeAstroCharacter, AstroRig } from "./AstroCharacter";
import { AstroAnimationController } from "./AstroAnimations";
import { Play, Sparkles } from "lucide-react";
import { soundFX } from "../soundFx";

interface HeroAstroWidgetProps {
  onStartTour: () => void;
}

export default function HeroAstroWidget({ onStartTour }: HeroAstroWidgetProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<AstroRig | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 140;
    const height = 160;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.25, 4.2);
    camera.lookAt(0, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Warm, Dreamy Toy Lighting (Soft white, pastel rose rim, lilac fill)
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const roseRimLight = new THREE.DirectionalLight(0xf472b6, 2.6);
    roseRimLight.position.set(-4, 3, -3);
    scene.add(roseRimLight);

    const lilacFill = new THREE.DirectionalLight(0xd8b4fe, 1.8);
    lilacFill.position.set(0, -3, 2);
    scene.add(lilacFill);

    // Cute Procedural 3D Toy Rig
    const rig = createAstroCharacter();
    scene.add(rig.rootGroup);
    rigRef.current = rig;

    const animController = new AstroAnimationController(rig);

    let mouseNorm = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseNorm.x = (e.clientX - centerX) / (window.innerWidth * 0.5);
      mouseNorm.y = (e.clientY - centerY) / (window.innerHeight * 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      animController.update({
        state: "wave",
        isSpeaking: false,
        mouseNormalized: mouseNorm,
        time,
        delta,
      });

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
  }, []);

  return (
    <div className="p-5 rounded-3xl scifi-glass-panel border-pink-400/30 shadow-2xl relative overflow-hidden space-y-3">
      {/* Top Tag */}
      <div className="flex items-center justify-between pb-2 border-b border-pink-500/15 text-xs font-mono">
        <span className="text-pink-300 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
          <span>ASTRO &bull; 3D TOY GUIDE</span>
        </span>
        <span className="text-[10px] text-purple-300/80 uppercase">
          ORIGINAL 3D &bull; ONLINE
        </span>
      </div>

      {/* 3D Model + Speech */}
      <div className="flex items-center gap-3">
        {/* Procedural 3D Canvas */}
        <div
          ref={mountRef}
          className="w-[140px] h-[160px] shrink-0 flex items-center justify-center relative drop-shadow-[0_10px_25px_rgba(244,114,182,0.45)] cursor-pointer"
          title="I'm Astro, Jahnavi's adorable 3D toy companion! Tap to start tour!"
          onClick={onStartTour}
        />

        {/* Narrative & Tour Button */}
        <div className="flex-1 space-y-2">
          <p className="text-xs text-slate-200 font-sans leading-relaxed">
            &ldquo;Hi! I&apos;m Astro, Jahnavi&apos;s adorable 3D toy guide! Tap below and I&apos;ll explain her complete engineering universe!&rdquo;
          </p>

          <button
            onClick={() => {
              soundFX.playSparkle();
              onStartTour();
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 hover:brightness-110 shadow-md shadow-pink-400/30 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Explain Everything Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
}
