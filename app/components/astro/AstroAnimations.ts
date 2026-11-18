import * as THREE from "three";
import { AstroRig } from "./AstroCharacter";

export type AstroActionState =
  | "idle"
  | "walk"
  | "run"
  | "float"
  | "wave"
  | "point"
  | "celebrate"
  | "sit";

export interface AnimationParams {
  state: AstroActionState;
  isSpeaking: boolean;
  mouseNormalized: { x: number; y: number };
  time: number;
  delta: number;
}

export class AstroAnimationController {
  private rig: AstroRig;
  private blinkTimer: number = 0;
  private nextBlinkTime: number = 2.8;
  private isBlinking: boolean = false;
  private blinkProgress: number = 0;

  // Smoothing targets
  private headTarget = new THREE.Vector2(0, 0);
  private currentHead = new THREE.Vector2(0, 0);

  constructor(rig: AstroRig) {
    this.rig = rig;
  }

  public update(params: AnimationParams) {
    const { state, isSpeaking, mouseNormalized, time, delta } = params;
    const rig = this.rig;

    // 1. Kawaii Eye Blinking Logic
    this.blinkTimer += delta;
    if (this.blinkTimer > this.nextBlinkTime) {
      this.isBlinking = true;
      this.blinkProgress += delta * 14;
      if (this.blinkProgress >= 1) {
        this.isBlinking = false;
        this.blinkProgress = 0;
        this.blinkTimer = 0;
        this.nextBlinkTime = 2.0 + Math.random() * 3.0;
      }
    }

    const eyeScaleY = this.isBlinking
      ? Math.max(0.06, 1 - Math.sin(this.blinkProgress * Math.PI) * 0.94)
      : 1;

    rig.leftEyeGroup.scale.y = eyeScaleY;
    rig.rightEyeGroup.scale.y = eyeScaleY;

    // 2. Mouse Tracking for Head & Eyes (Curious, adorable gaze)
    this.headTarget.x = mouseNormalized.x * 0.32;
    this.headTarget.y = -mouseNormalized.y * 0.22;
    this.currentHead.lerp(this.headTarget, delta * 5);

    // 3. Antenna Cute Bouncy Spring & Visor Halo Pulsing
    const antennaSpring = Math.sin(time * 5.0) * 0.08;
    rig.leftAntennaGroup.rotation.z = -0.35 + antennaSpring;
    rig.rightAntennaGroup.rotation.z = 0.35 - antennaSpring;
    rig.antennaLight.intensity = 1.2 + Math.sin(time * 5) * 0.3;

    // Glowing Halo Ring Emissive Breathing
    if (rig.haloRingMesh.material && "emissiveIntensity" in rig.haloRingMesh.material) {
      (rig.haloRingMesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.5 + Math.sin(time * 3.5) * 0.4;
    }

    // 4. Rosy Cheeks Blush Pulsing
    const blushPulse = 0.9 + Math.sin(time * 3) * 0.12;
    rig.leftBlushMesh.scale.set(blushPulse, blushPulse, 1);
    rig.rightBlushMesh.scale.set(blushPulse, blushPulse, 1);

    // 5. Talking Animation (Cute mouth bounce when narrating)
    if (isSpeaking) {
      const talkScale = 1.0 + Math.sin(time * 15) * 0.3;
      rig.mouthMesh.scale.set(talkScale, talkScale, talkScale);
    } else {
      rig.mouthMesh.scale.set(1, 1, 1);
    }

    // 6. Action State Poses
    switch (state) {
      case "walk":
        this.animateCuteWaddle(time);
        break;
      case "run":
        this.animateRun(time);
        break;
      case "float":
        this.animateFloat(time);
        break;
      case "wave":
        this.animateWave(time);
        break;
      case "point":
        this.animatePoint(time);
        break;
      case "celebrate":
        this.animateCelebrate(time);
        break;
      case "sit":
        this.animateSit(time);
        break;
      case "idle":
      default:
        this.animateIdle(time);
        break;
    }
  }

  // --- Animation States ---

  private animateIdle(time: number) {
    const rig = this.rig;
    const breathe = Math.sin(time * 2.4);

    // Squishy marshmallow breathing
    rig.bodyGroup.position.y = breathe * 0.035;
    rig.bodyGroup.scale.set(1 - breathe * 0.015, 1 + breathe * 0.02, 1 - breathe * 0.015);
    rig.bodyGroup.rotation.z = Math.sin(time * 1.5) * 0.02;

    // Head curious tilt
    rig.headGroup.rotation.y = this.currentHead.x;
    rig.headGroup.rotation.x = this.currentHead.y + breathe * 0.02;
    rig.headGroup.rotation.z = Math.sin(time * 1.8) * 0.04;

    // Cute relaxed mitten arms
    rig.leftArmGroup.rotation.x = Math.sin(time * 2.4) * 0.06;
    rig.leftArmGroup.rotation.z = 0.18;

    rig.rightArmGroup.rotation.x = -Math.sin(time * 2.4) * 0.06;
    rig.rightArmGroup.rotation.z = -0.18;

    // Stubby standing feet
    rig.leftLegGroup.position.y = 0.32;
    rig.leftLegGroup.rotation.x = 0;
    rig.rightLegGroup.position.y = 0.32;
    rig.rightLegGroup.rotation.x = 0;
  }

  private animateCuteWaddle(time: number) {
    const rig = this.rig;
    const waddleSpeed = time * 8.0;
    const waddle = Math.sin(waddleSpeed);

    // Cute hip waddle & bounce
    rig.bodyGroup.position.y = Math.abs(Math.sin(waddleSpeed)) * 0.07;
    rig.bodyGroup.rotation.z = waddle * 0.08; // cute side-to-side waddle!
    rig.bodyGroup.rotation.y = waddle * 0.06;

    // Head bobble
    rig.headGroup.rotation.y = this.currentHead.x + waddle * 0.04;
    rig.headGroup.rotation.z = -waddle * 0.06;

    // Tiny arm swings
    rig.leftArmGroup.rotation.x = -waddle * 0.55;
    rig.leftArmGroup.rotation.z = 0.25;

    rig.rightArmGroup.rotation.x = waddle * 0.55;
    rig.rightArmGroup.rotation.z = -0.25;

    // Alternating little feet steps
    rig.leftLegGroup.rotation.x = waddle * 0.65;
    rig.rightLegGroup.rotation.x = -waddle * 0.65;
    rig.leftLegGroup.position.y = 0.32 + Math.max(0, -waddle * 0.06);
    rig.rightLegGroup.position.y = 0.32 + Math.max(0, waddle * 0.06);
  }

  private animateRun(time: number) {
    const rig = this.rig;
    const runSpeed = time * 12.0;
    const swing = Math.sin(runSpeed);

    rig.bodyGroup.position.y = Math.abs(swing) * 0.1;
    rig.bodyGroup.rotation.x = 0.22; // cute forward lean
    rig.bodyGroup.rotation.z = swing * 0.05;

    rig.headGroup.rotation.x = -0.1 + this.currentHead.y;
    rig.headGroup.rotation.y = this.currentHead.x;

    rig.leftArmGroup.rotation.x = -swing * 0.95;
    rig.leftArmGroup.rotation.z = 0.28;

    rig.rightArmGroup.rotation.x = swing * 0.95;
    rig.rightArmGroup.rotation.z = -0.28;

    rig.leftLegGroup.rotation.x = swing * 1.0;
    rig.rightLegGroup.rotation.x = -swing * 1.0;
    rig.leftLegGroup.position.y = 0.32 + Math.max(0, -swing * 0.1);
    rig.rightLegGroup.position.y = 0.32 + Math.max(0, swing * 0.1);
  }

  private animateFloat(time: number) {
    const rig = this.rig;
    const floatWave = Math.sin(time * 2.8);

    // Dreamy gentle floating
    rig.bodyGroup.position.y = floatWave * 0.12;
    rig.bodyGroup.rotation.x = Math.sin(time * 1.8) * 0.06;
    rig.bodyGroup.rotation.z = Math.cos(time * 1.4) * 0.06;

    rig.headGroup.rotation.y = this.currentHead.x;
    rig.headGroup.rotation.x = this.currentHead.y - 0.05;
    rig.headGroup.rotation.z = Math.sin(time * 1.6) * 0.06;

    // Balancing outstretched arms
    rig.leftArmGroup.rotation.x = Math.sin(time * 2.0) * 0.12;
    rig.leftArmGroup.rotation.z = 0.65 + Math.cos(time * 2.2) * 0.08;

    rig.rightArmGroup.rotation.x = Math.cos(time * 2.0) * 0.12;
    rig.rightArmGroup.rotation.z = -0.65 - Math.sin(time * 2.2) * 0.08;

    // Stubby legs tucked up happily
    rig.leftLegGroup.rotation.x = 0.35 + Math.sin(time * 2.4) * 0.06;
    rig.rightLegGroup.rotation.x = 0.25 + Math.cos(time * 2.4) * 0.06;
    rig.leftLegGroup.position.y = 0.32 + floatWave * 0.12;
    rig.rightLegGroup.position.y = 0.32 + floatWave * 0.12;
  }

  private animateWave(time: number) {
    const rig = this.rig;
    const waveSpeed = time * 8.5;
    const wave = Math.sin(waveSpeed);

    // Cheerful bounce
    rig.bodyGroup.position.y = Math.sin(time * 3.5) * 0.05;
    rig.bodyGroup.rotation.z = -0.05;

    // Inquisitive happy head tilt
    rig.headGroup.rotation.y = this.currentHead.x;
    rig.headGroup.rotation.x = this.currentHead.y;
    rig.headGroup.rotation.z = -0.18; // Super cute head tilt!

    // Right mitten arm raised high waving!
    rig.rightArmGroup.rotation.x = -0.15;
    rig.rightArmGroup.rotation.z = -2.35 + wave * 0.35;
    rig.rightArmGroup.rotation.y = wave * 0.25;

    // Left arm on side
    rig.leftArmGroup.rotation.x = 0.08;
    rig.leftArmGroup.rotation.z = 0.25;

    rig.leftLegGroup.rotation.x = 0;
    rig.rightLegGroup.rotation.x = 0;
  }

  private animatePoint(time: number) {
    const rig = this.rig;

    rig.bodyGroup.rotation.y = -0.32;
    rig.bodyGroup.rotation.z = 0.04;

    rig.headGroup.rotation.y = -0.42;
    rig.headGroup.rotation.x = 0.04;

    // Right arm pointing directly forward toward portfolio card
    rig.rightArmGroup.rotation.x = -1.45;
    rig.rightArmGroup.rotation.y = -0.35;
    rig.rightArmGroup.rotation.z = -0.08 + Math.sin(time * 3) * 0.03;

    rig.leftArmGroup.rotation.x = 0.12;
    rig.leftArmGroup.rotation.z = 0.28;

    rig.leftLegGroup.rotation.x = -0.12;
    rig.rightLegGroup.rotation.x = 0.12;
  }

  private animateCelebrate(time: number) {
    const rig = this.rig;
    const jump = Math.abs(Math.sin(time * 6.5));
    const armPump = Math.sin(time * 7.5);

    // Joyful little bounces
    rig.bodyGroup.position.y = jump * 0.25;
    rig.bodyGroup.rotation.y = Math.sin(time * 3.5) * 0.3; // happy twirl

    rig.headGroup.rotation.x = -0.2;
    rig.headGroup.rotation.y = this.currentHead.x;
    rig.headGroup.rotation.z = Math.sin(time * 6) * 0.08;

    // Both cute arms pumped high in celebration!
    rig.leftArmGroup.rotation.x = -0.1;
    rig.leftArmGroup.rotation.z = 2.4 + armPump * 0.2;

    rig.rightArmGroup.rotation.x = -0.1;
    rig.rightArmGroup.rotation.z = -2.4 - armPump * 0.2;

    rig.leftLegGroup.rotation.x = jump * 0.3;
    rig.rightLegGroup.rotation.x = jump * 0.3;
    rig.leftLegGroup.position.y = 0.32 + jump * 0.25;
    rig.rightLegGroup.position.y = 0.32 + jump * 0.25;
  }

  private animateSit(time: number) {
    const rig = this.rig;
    const breathe = Math.sin(time * 2.0);

    // Sitting relaxedly
    rig.bodyGroup.position.y = -0.15 + breathe * 0.02;
    rig.bodyGroup.rotation.x = 0.04;

    rig.headGroup.rotation.y = this.currentHead.x;
    rig.headGroup.rotation.x = this.currentHead.y + 0.04;
    rig.headGroup.rotation.z = Math.sin(time * 1.2) * 0.03;

    // Hands resting on knees
    rig.leftArmGroup.rotation.x = -0.8;
    rig.leftArmGroup.rotation.z = 0.18;

    rig.rightArmGroup.rotation.x = -0.8;
    rig.rightArmGroup.rotation.z = -0.18;

    // Stubby legs bent forward sitting
    rig.leftLegGroup.position.y = 0.16;
    rig.leftLegGroup.rotation.x = -1.45;
    rig.leftLegGroup.rotation.y = -0.12;

    rig.rightLegGroup.position.y = 0.16;
    rig.rightLegGroup.rotation.x = -1.45;
    rig.rightLegGroup.rotation.y = 0.12;
  }
}
