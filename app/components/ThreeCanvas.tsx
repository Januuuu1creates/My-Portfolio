"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Dreamy Pastel Cosmos with Hanging Fairy Lights & Bokeh
 * Inspired directly by user reference images:
 * - Hanging glowing fairy lights (canopy of celestial lanterns)
 * - Soft floating bokeh orbs in warm gold, rose pink, and lavender
 * - Gentle twinkling pastel stars
 * - Dreamy rose & lilac atmospheric dust
 */
export default function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Transparent depth with zero dimming fog so background artwork remains bright & crisp
    scene.fog = undefined;

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Warm, Dreamy Ambient & Accent Lighting
    const ambientLight = new THREE.AmbientLight(0xffe4e6, 1.8);
    scene.add(ambientLight);

    const roseKeyLight = new THREE.DirectionalLight(0xf472b6, 2.2);
    roseKeyLight.position.set(-30, 45, 25);
    scene.add(roseKeyLight);

    const lilacRimLight = new THREE.DirectionalLight(0xc084fc, 2.0);
    lilacRimLight.position.set(30, -25, -15);
    scene.add(lilacRimLight);

    const warmLight = new THREE.PointLight(0xd8b4fe, 1.5, 80);
    warmLight.position.set(0, 20, 15);
    scene.add(warmLight);

    // 1. Procedural Soft Glow Texture Generator
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(251, 207, 232, 0.95)");
        gradient.addColorStop(0.5, "rgba(244, 114, 182, 0.45)");
        gradient.addColorStop(0.75, "rgba(192, 132, 252, 0.15)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const glowTexture = createGlowTexture();

    // 2. Hanging Celestial Fairy Lights (Inspired by Reference Image 3)
    const fairyLightsGroup = new THREE.Group();
    const fairyCount = isMobile ? 32 : 64;
    const bulbGeom = new THREE.SphereGeometry(0.38, 16, 16);

    const bulbPalette = [
      0xf472b6,
      0xc084fc,
      0xa855f7,
      0xf9a8d4,
      0xe9d5ff,
    ];

    interface FairyBulb {
      bulbMesh: THREE.Mesh;
      baseY: number;
      swingOffset: number;
      speed: number;
      stringLine: THREE.Line;
      positions: Float32Array;
    }

    const fairyBulbs: FairyBulb[] = [];

    for (let i = 0; i < fairyCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = -25 + Math.random() * 45;
      const length = 12 + Math.random() * 26; // varying drop length from ceiling
      const topY = 35;
      const bottomY = topY - length;

      const colorHex = bulbPalette[i % bulbPalette.length];
      const bulbMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 1.8,
        roughness: 0.1,
      });

      const bulbMesh = new THREE.Mesh(bulbGeom, bulbMat);
      bulbMesh.position.set(x, bottomY, z);
      fairyLightsGroup.add(bulbMesh);

      // Delicate hanging cord
      const linePositions = new Float32Array([x, topY, z, x, bottomY, z]);
      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xf472b6,
        transparent: true,
        opacity: 0.25,
      });
      const stringLine = new THREE.Line(lineGeom, lineMat);
      fairyLightsGroup.add(stringLine);

      fairyBulbs.push({
        bulbMesh,
        baseY: bottomY,
        swingOffset: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 0.8,
        stringLine,
        positions: linePositions,
      });
    }

    scene.add(fairyLightsGroup);

    // 3. Floating Bokeh Orbs (Soft, Dreamy Ambient Bubbles)
    const bokehCount = isMobile ? 35 : 75;
    const bokehGeom = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);
    const bokehColors = new Float32Array(bokehCount * 3);
    const bokehSizes = new Float32Array(bokehCount);

    const bokehPalette = [
      new THREE.Color(0xec4899),
      new THREE.Color(0xf472b6),
      new THREE.Color(0xc084fc),
      new THREE.Color(0xd8b4fe),
    ];

    for (let i = 0; i < bokehCount; i++) {
      bokehPositions[i * 3] = (Math.random() - 0.5) * 70;
      bokehPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      bokehPositions[i * 3 + 2] = -30 + Math.random() * 50;

      const c = bokehPalette[Math.floor(Math.random() * bokehPalette.length)];
      bokehColors[i * 3] = c.r;
      bokehColors[i * 3 + 1] = c.g;
      bokehColors[i * 3 + 2] = c.b;

      bokehSizes[i] = 12 + Math.random() * 20;
    }

    bokehGeom.setAttribute("position", new THREE.BufferAttribute(bokehPositions, 3));
    bokehGeom.setAttribute("color", new THREE.BufferAttribute(bokehColors, 3));

    const bokehMat = new THREE.PointsMaterial({
      size: 4.5,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const bokehPoints = new THREE.Points(bokehGeom, bokehMat);
    scene.add(bokehPoints);

    // 4. Multi-Depth Pastel Starfield
    const starCount = isMobile ? 500 : 1000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starPalette = [
      new THREE.Color(0xffffff), // pure diamond white
      new THREE.Color(0xfbcfe8), // pastel pink
      new THREE.Color(0xe9d5ff), // soft lavender
      new THREE.Color(0xf9a8d4),
      new THREE.Color(0xd8b4fe),
    ];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 220;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 180;
      starPositions[i * 3 + 2] = -120 + Math.random() * 140;

      const c = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.4,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 5. Dreamy Pastel Nebulae Clouds
    const createCloudTexture = (colorStop: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, colorStop);
        gradient.addColorStop(0.4, "rgba(244, 114, 182, 0.12)");
        gradient.addColorStop(0.7, "rgba(192, 132, 252, 0.05)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const cloudGroup = new THREE.Group();
    const cloudTextures = [
      createCloudTexture("rgba(244, 114, 182, 0.26)"), // soft rose
      createCloudTexture("rgba(192, 132, 252, 0.22)"), // pastel lilac
      createCloudTexture("rgba(251, 207, 232, 0.16)"),
    ];

    const cloudGeom = new THREE.PlaneGeometry(65, 65);
    const cloudConfigs = [
      { x: -30, y: 15, z: -35, tex: 0, rot: 0.2 },
      { x: 30, y: -20, z: -45, tex: 1, rot: -0.3 },
      { x: -15, y: -50, z: -60, tex: 2, rot: 0.5 },
      { x: 20, y: -80, z: -70, tex: 0, rot: -0.4 },
    ];

    cloudConfigs.forEach((cfg) => {
      const mat = new THREE.MeshBasicMaterial({
        map: cloudTextures[cfg.tex],
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(cloudGeom, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.rotation.z = cfg.rot;
      cloudGroup.add(mesh);
    });

    scene.add(cloudGroup);

    // Scroll & Mouse Parallax
    let scrollY = 0;
    let targetScrollY = 0;
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth scroll lerp
      scrollY += (targetScrollY - scrollY) * 0.05;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Camera gentle drift & parallax
      camera.position.y = -scrollY * 0.025;
      camera.position.x = mouseX * 2.5;
      camera.lookAt(0, -scrollY * 0.025, 0);

      // 1. Gently sway hanging fairy lights (like starlight lanterns)
      fairyBulbs.forEach((item) => {
        const swayX = Math.sin(time * item.speed + item.swingOffset) * 0.45;
        const swayZ = Math.cos(time * item.speed * 0.8 + item.swingOffset) * 0.35;
        item.bulbMesh.position.x += (swayX - (item.bulbMesh.position.x - item.positions[0])) * 0.05;
        item.bulbMesh.position.z += (swayZ - (item.bulbMesh.position.z - item.positions[2])) * 0.05;

        // Update cord position
        const posAttr = item.stringLine.geometry.attributes.position as THREE.BufferAttribute;
        posAttr.setXYZ(1, item.bulbMesh.position.x, item.bulbMesh.position.y + 0.35, item.bulbMesh.position.z);
        posAttr.needsUpdate = true;
      });

      // 2. Slow rotation of starfield & bokeh
      starField.rotation.y = time * 0.015;
      bokehPoints.rotation.y = -time * 0.02;

      // 3. Slowly drift nebulae
      cloudGroup.children.forEach((cloud, idx) => {
        cloud.rotation.z += (idx % 2 === 0 ? 0.0008 : -0.0008);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      glowTexture.dispose();
      bulbGeom.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden"
      aria-hidden="true"
    />
  );
}
