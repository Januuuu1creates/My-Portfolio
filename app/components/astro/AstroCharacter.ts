import * as THREE from "three";

export interface AstroRig {
  rootGroup: THREE.Group;
  bodyGroup: THREE.Group;
  headGroup: THREE.Group;
  leftArmGroup: THREE.Group;
  rightArmGroup: THREE.Group;
  leftLegGroup: THREE.Group;
  rightLegGroup: THREE.Group;
  leftEyeGroup: THREE.Group;
  rightEyeGroup: THREE.Group;
  leftBlushMesh: THREE.Mesh;
  rightBlushMesh: THREE.Mesh;
  mouthMesh: THREE.Mesh;
  haloRingMesh: THREE.Mesh;
  leftAntennaGroup: THREE.Group;
  rightAntennaGroup: THREE.Group;
  antennaLight: THREE.PointLight;
  thrusterLight: THREE.PointLight;
  materials: Record<string, THREE.Material>;
  geometries: THREE.BufferGeometry[];
}

/**
 * Creates the ultra-cute chibi 3D Astro toy companion.
 * Inspired directly by collectible designer vinyl toys:
 * - Marshmallow matte-porcelain body with pastel strawberry pink & lilac accents
 * - Huge oversized chibi head with glowing warm-pink halo visor ring (from reference image)
 * - Enormous, soulful, glossy kawaii eyes with dual sparkling starlight highlights
 * - Cute concentric circular headphone ear cups
 * - Bouncy dual curved antennae with glowing starlight pearls
 * - Chubby squishy pear torso with round belly emblem
 * - Stubby little mitten arms and marshmallow boots
 */
export function createAstroCharacter(): AstroRig {
  const geometries: THREE.BufferGeometry[] = [];
  const materials: Record<string, THREE.Material> = {};

  // --- Ultra-Cute Pastel Toy Materials ---
  const marshmallowWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.22,
    metalness: 0.04,
  });
  materials.marshmallowWhite = marshmallowWhiteMat;

  const softLilacMat = new THREE.MeshStandardMaterial({
    color: 0xe9d5ff, // pastel lavender
    roughness: 0.26,
    metalness: 0.06,
  });
  materials.softLilac = softLilacMat;

  const strawberryPinkMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6, // cute blush pink
    roughness: 0.24,
    metalness: 0.05,
  });
  materials.strawberryPink = strawberryPinkMat;
  materials.pastelPink = strawberryPinkMat;

  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xfff0f5, // lavender blush / cream
    roughness: 0.2,
    metalness: 0.02,
  });
  materials.cream = creamMat;

  // Visor Faceplate (Deep glossy obsidian with soft purple undertone)
  const visorMat = new THREE.MeshStandardMaterial({
    color: 0x110e24,
    roughness: 0.08,
    metalness: 0.25,
  });
  materials.visor = visorMat;

  // Glowing Halo Ring around the Visor (Directly matching user image 2!)
  const haloMat = new THREE.MeshStandardMaterial({
    color: 0xffb5d6,
    emissive: 0xf472b6,
    emissiveIntensity: 1.6,
    roughness: 0.15,
  });
  materials.halo = haloMat;

  // Huge Kawaii Anime Eye Materials
  const eyeIrisMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8, // bright sparkling cyan-blue iris
  });
  materials.eyeIris = eyeIrisMat;
  materials.eyeBase = eyeIrisMat;

  const eyePupilMat = new THREE.MeshBasicMaterial({
    color: 0x030712, // deep dark pupil
  });
  materials.eyePupil = eyePupilMat;

  const eyeSparkleBigMat = new THREE.MeshBasicMaterial({
    color: 0xffffff, // big starlight glint
  });
  materials.eyeSparkleBig = eyeSparkleBigMat;

  const eyeSparkleSmallMat = new THREE.MeshBasicMaterial({
    color: 0xbbf7d0, // soft minty/cyan sub-reflection
  });
  materials.eyeSparkleSmall = eyeSparkleSmallMat;

  // Glowing Rosy Blush Cheeks
  const blushMat = new THREE.MeshBasicMaterial({
    color: 0xff6699,
    transparent: true,
    opacity: 0.85,
  });
  materials.blush = blushMat;

  // Cute Little Curved Smile
  const smileMat = new THREE.MeshBasicMaterial({
    color: 0xf472b6,
    side: THREE.DoubleSide,
  });
  materials.smile = smileMat;

  // Golden Starlight Pearls for Antennae
  const starPearlMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xfacc15,
    emissiveIntensity: 0.9,
    roughness: 0.15,
  });
  materials.starPearl = starPearlMat;

  // Root Container
  const rootGroup = new THREE.Group();
  rootGroup.name = "Astro_Chibi_Toy";

  // ----------------------------------------------------
  // 1. Chubby Marshmallow Body (Squishy pear shape)
  // ----------------------------------------------------
  const bodyGroup = new THREE.Group();
  bodyGroup.name = "Astro_Body";

  const torsoGeom = new THREE.SphereGeometry(0.68, 32, 28);
  torsoGeom.scale(0.96, 1.05, 0.92);
  geometries.push(torsoGeom);
  const torsoMesh = new THREE.Mesh(torsoGeom, marshmallowWhiteMat);
  torsoMesh.position.y = 0.76;
  bodyGroup.add(torsoMesh);

  // Soft Lilac / Pink Belly Patch
  const tummyGeom = new THREE.SphereGeometry(0.5, 24, 20);
  tummyGeom.scale(0.82, 0.88, 0.32);
  geometries.push(tummyGeom);
  const tummyMesh = new THREE.Mesh(tummyGeom, softLilacMat);
  tummyMesh.position.set(0, 0.74, 0.5);
  bodyGroup.add(tummyMesh);

  // Cute Rounded Belly Button Dial (from reference image)
  const bellyButtonRingGeom = new THREE.TorusGeometry(0.12, 0.025, 12, 24);
  geometries.push(bellyButtonRingGeom);
  const bellyRingMesh = new THREE.Mesh(bellyButtonRingGeom, strawberryPinkMat);
  bellyRingMesh.position.set(0, 0.74, 0.63);
  bodyGroup.add(bellyRingMesh);

  const bellyCoreGeom = new THREE.SphereGeometry(0.065, 16, 16);
  geometries.push(bellyCoreGeom);
  const bellyCoreMesh = new THREE.Mesh(bellyCoreGeom, starPearlMat);
  bellyCoreMesh.position.set(0, 0.74, 0.64);
  bodyGroup.add(bellyCoreMesh);

  // Cute Rounded Pastel Backpack
  const backpackGeom = new THREE.BoxGeometry(0.58, 0.65, 0.3);
  geometries.push(backpackGeom);
  const backpackMesh = new THREE.Mesh(backpackGeom, softLilacMat);
  backpackMesh.position.set(0, 0.78, -0.52);
  bodyGroup.add(backpackMesh);

  // Twin Rounded Pastel Thrusters
  const nozzleGeom = new THREE.CylinderGeometry(0.07, 0.1, 0.14, 16);
  geometries.push(nozzleGeom);

  const leftNozzle = new THREE.Mesh(nozzleGeom, strawberryPinkMat);
  leftNozzle.position.set(-0.17, 0.46, -0.52);
  bodyGroup.add(leftNozzle);

  const rightNozzle = new THREE.Mesh(nozzleGeom, strawberryPinkMat);
  rightNozzle.position.set(0.17, 0.46, -0.52);
  bodyGroup.add(rightNozzle);

  // Gentle Pink Thruster Light
  const thrusterLight = new THREE.PointLight(0xf472b6, 1.4, 3);
  thrusterLight.position.set(0, 0.44, -0.6);
  bodyGroup.add(thrusterLight);

  rootGroup.add(bodyGroup);

  // ----------------------------------------------------
  // 2. Extra Cute Chibi Head (Oversized, smooth, glowing halo)
  // ----------------------------------------------------
  const headGroup = new THREE.Group();
  headGroup.name = "Astro_Head";
  headGroup.position.set(0, 1.56, 0);

  // Big, soft, rounded helmet
  const headGeom = new THREE.SphereGeometry(0.94, 36, 32);
  headGeom.scale(1.15, 1.08, 1.1);
  geometries.push(headGeom);
  const headMesh = new THREE.Mesh(headGeom, marshmallowWhiteMat);
  headGroup.add(headMesh);

  // Recessed Glossy Visor Faceplate
  const visorGeom = new THREE.SphereGeometry(0.78, 32, 28);
  visorGeom.scale(1.08, 0.94, 0.78);
  geometries.push(visorGeom);
  const visorMesh = new THREE.Mesh(visorGeom, visorMat);
  visorMesh.position.set(0, -0.02, 0.42);
  headGroup.add(visorMesh);

  // GLOWING HALO RING around Visor Frame (Directly matching image 2 & 1!)
  const haloRingCurve = new THREE.TorusGeometry(0.76, 0.045, 16, 48);
  haloRingCurve.scale(1.08, 0.94, 0.7);
  geometries.push(haloRingCurve);
  const haloRingMesh = new THREE.Mesh(haloRingCurve, haloMat);
  haloRingMesh.position.set(0, -0.02, 0.62);
  headGroup.add(haloRingMesh);

  // Visor Inner Glow Light
  const visorGlowLight = new THREE.PointLight(0xf472b6, 1.8, 2.5);
  visorGlowLight.position.set(0, -0.02, 0.7);
  headGroup.add(visorGlowLight);

  // Concentric Headphone Ear-Cups (Left & Right, like image 1!)
  const earCupOuterGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.16, 24);
  earCupOuterGeom.rotateZ(Math.PI / 2);
  geometries.push(earCupOuterGeom);

  const earCupInnerGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.18, 20);
  earCupInnerGeom.rotateZ(Math.PI / 2);
  geometries.push(earCupInnerGeom);

  const earCupRingGeom = new THREE.TorusGeometry(0.26, 0.03, 12, 24);
  earCupRingGeom.rotateY(Math.PI / 2);
  geometries.push(earCupRingGeom);

  // Left Ear Cup
  const leftEarGroup = new THREE.Group();
  leftEarGroup.position.set(-1.06, 0.02, 0.08);
  const leftEarOuter = new THREE.Mesh(earCupOuterGeom, strawberryPinkMat);
  const leftEarInner = new THREE.Mesh(earCupInnerGeom, marshmallowWhiteMat);
  const leftEarRing = new THREE.Mesh(earCupRingGeom, softLilacMat);
  leftEarGroup.add(leftEarOuter, leftEarInner, leftEarRing);
  headGroup.add(leftEarGroup);

  // Right Ear Cup
  const rightEarGroup = new THREE.Group();
  rightEarGroup.position.set(1.06, 0.02, 0.08);
  const rightEarOuter = new THREE.Mesh(earCupOuterGeom, strawberryPinkMat);
  const rightEarInner = new THREE.Mesh(earCupInnerGeom, marshmallowWhiteMat);
  const rightEarRing = new THREE.Mesh(earCupRingGeom, softLilacMat);
  rightEarGroup.add(rightEarOuter, rightEarInner, rightEarRing);
  headGroup.add(rightEarGroup);

  // Dual Curved Antennae with Glowing Star Pearls (like image 1!)
  const leftAntennaGroup = new THREE.Group();
  leftAntennaGroup.position.set(-0.45, 0.98, 0.1);
  leftAntennaGroup.rotation.z = -0.35;

  const antStemCurveL = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.1, 0.22, 0),
    new THREE.Vector3(-0.18, 0.44, 0)
  );
  const antGeomL = new THREE.TubeGeometry(antStemCurveL, 16, 0.025, 8, false);
  geometries.push(antGeomL);
  const antMeshL = new THREE.Mesh(antGeomL, strawberryPinkMat);
  leftAntennaGroup.add(antMeshL);

  const starPearlGeom = new THREE.SphereGeometry(0.12, 16, 16);
  geometries.push(starPearlGeom);
  const pearlMeshL = new THREE.Mesh(starPearlGeom, starPearlMat);
  pearlMeshL.position.set(-0.18, 0.44, 0);
  leftAntennaGroup.add(pearlMeshL);
  headGroup.add(leftAntennaGroup);

  const rightAntennaGroup = new THREE.Group();
  rightAntennaGroup.position.set(0.45, 0.98, 0.1);
  rightAntennaGroup.rotation.z = 0.35;

  const antStemCurveR = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.1, 0.22, 0),
    new THREE.Vector3(0.18, 0.44, 0)
  );
  const antGeomR = new THREE.TubeGeometry(antStemCurveR, 16, 0.025, 8, false);
  geometries.push(antGeomR);
  const antMeshR = new THREE.Mesh(antGeomR, strawberryPinkMat);
  rightAntennaGroup.add(antMeshR);

  const pearlMeshR = new THREE.Mesh(starPearlGeom, starPearlMat);
  pearlMeshR.position.set(0.18, 0.44, 0);
  rightAntennaGroup.add(pearlMeshR);
  headGroup.add(rightAntennaGroup);

  const antennaLight = new THREE.PointLight(0xfde047, 1.2, 3);
  antennaLight.position.set(0, 1.4, 0.1);
  headGroup.add(antennaLight);

  // Huge Kawaii Eyes (Left & Right)
  const eyeIrisGeom = new THREE.SphereGeometry(0.27, 24, 24);
  geometries.push(eyeIrisGeom);

  const eyePupilGeom = new THREE.SphereGeometry(0.17, 20, 20);
  geometries.push(eyePupilGeom);

  const eyeSparkleBigGeom = new THREE.SphereGeometry(0.08, 14, 14);
  geometries.push(eyeSparkleBigGeom);

  const eyeSparkleSmallGeom = new THREE.SphereGeometry(0.045, 10, 10);
  geometries.push(eyeSparkleSmallGeom);

  // Left Eye
  const leftEyeGroup = new THREE.Group();
  leftEyeGroup.position.set(-0.33, 0.08, 0.98);

  const leftIris = new THREE.Mesh(eyeIrisGeom, eyeIrisMat);
  leftEyeGroup.add(leftIris);

  const leftPupil = new THREE.Mesh(eyePupilGeom, eyePupilMat);
  leftPupil.position.set(0, 0, 0.11);
  leftEyeGroup.add(leftPupil);

  const leftBigSparkle = new THREE.Mesh(eyeSparkleBigGeom, eyeSparkleBigMat);
  leftBigSparkle.position.set(0.06, 0.08, 0.22);
  leftEyeGroup.add(leftBigSparkle);

  const leftSmallSparkle = new THREE.Mesh(eyeSparkleSmallGeom, eyeSparkleSmallMat);
  leftSmallSparkle.position.set(-0.06, -0.07, 0.2);
  leftEyeGroup.add(leftSmallSparkle);

  headGroup.add(leftEyeGroup);

  // Right Eye
  const rightEyeGroup = new THREE.Group();
  rightEyeGroup.position.set(0.33, 0.08, 0.98);

  const rightIris = new THREE.Mesh(eyeIrisGeom, eyeIrisMat);
  rightEyeGroup.add(rightIris);

  const rightPupil = new THREE.Mesh(eyePupilGeom, eyePupilMat);
  rightPupil.position.set(0, 0, 0.11);
  rightEyeGroup.add(rightPupil);

  const rightBigSparkle = new THREE.Mesh(eyeSparkleBigGeom, eyeSparkleBigMat);
  rightBigSparkle.position.set(0.06, 0.08, 0.22);
  rightEyeGroup.add(rightBigSparkle);

  const rightSmallSparkle = new THREE.Mesh(eyeSparkleSmallGeom, eyeSparkleSmallMat);
  rightSmallSparkle.position.set(-0.06, -0.07, 0.2);
  rightEyeGroup.add(rightSmallSparkle);

  headGroup.add(rightEyeGroup);

  // Glowing Rosy Cheeks (Blushing Ovals)
  const blushGeom = new THREE.SphereGeometry(0.16, 16, 16);
  blushGeom.scale(1.4, 0.68, 0.2);
  geometries.push(blushGeom);

  const leftBlushMesh = new THREE.Mesh(blushGeom, blushMat);
  leftBlushMesh.position.set(-0.48, -0.15, 0.9);
  leftBlushMesh.rotation.z = -0.12;
  headGroup.add(leftBlushMesh);

  const rightBlushMesh = new THREE.Mesh(blushGeom, blushMat);
  rightBlushMesh.position.set(0.48, -0.15, 0.9);
  rightBlushMesh.rotation.z = 0.12;
  headGroup.add(rightBlushMesh);

  // Cute Little Curved Smile (w / ‿)
  const smileCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.12, -0.18, 0.97),
    new THREE.Vector3(0, -0.26, 0.99),
    new THREE.Vector3(0.12, -0.18, 0.97)
  );
  const smileGeom = new THREE.TubeGeometry(smileCurve, 16, 0.026, 8, false);
  geometries.push(smileGeom);
  const mouthMesh = new THREE.Mesh(smileGeom, smileMat);
  headGroup.add(mouthMesh);

  rootGroup.add(headGroup);

  // ----------------------------------------------------
  // 3. Stubby Little Mitten Arms (Left & Right)
  // ----------------------------------------------------
  const armGeom = new THREE.CylinderGeometry(0.11, 0.09, 0.36, 16);
  geometries.push(armGeom);

  const mittenGeom = new THREE.SphereGeometry(0.15, 16, 16);
  mittenGeom.scale(1.05, 0.92, 0.88);
  geometries.push(mittenGeom);

  // Left Arm
  const leftArmGroup = new THREE.Group();
  leftArmGroup.name = "Astro_LeftArm";
  leftArmGroup.position.set(-0.7, 0.94, 0);

  const leftShoulder = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 14, 14),
    strawberryPinkMat
  );
  leftArmGroup.add(leftShoulder);

  const leftArmMesh = new THREE.Mesh(armGeom, marshmallowWhiteMat);
  leftArmMesh.position.set(-0.04, -0.17, 0);
  leftArmGroup.add(leftArmMesh);

  const leftMitten = new THREE.Mesh(mittenGeom, strawberryPinkMat);
  leftMitten.position.set(-0.06, -0.37, 0);
  leftArmGroup.add(leftMitten);

  bodyGroup.add(leftArmGroup);

  // Right Arm
  const rightArmGroup = new THREE.Group();
  rightArmGroup.name = "Astro_RightArm";
  rightArmGroup.position.set(0.7, 0.94, 0);

  const rightShoulder = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 14, 14),
    strawberryPinkMat
  );
  rightArmGroup.add(rightShoulder);

  const rightArmMesh = new THREE.Mesh(armGeom, marshmallowWhiteMat);
  rightArmMesh.position.set(0.04, -0.17, 0);
  rightArmGroup.add(rightArmMesh);

  const rightMitten = new THREE.Mesh(mittenGeom, strawberryPinkMat);
  rightMitten.position.set(0.06, -0.37, 0);
  rightArmGroup.add(rightMitten);

  bodyGroup.add(rightArmGroup);

  // ----------------------------------------------------
  // 4. Tiny Chubby Stubby Feet (Marshmallow & Lilac Boots)
  // ----------------------------------------------------
  const legGeom = new THREE.CylinderGeometry(0.12, 0.11, 0.26, 16);
  geometries.push(legGeom);

  const chubbyFootGeom = new THREE.SphereGeometry(0.2, 16, 16);
  chubbyFootGeom.scale(0.92, 0.72, 1.25);
  geometries.push(chubbyFootGeom);

  // Left Leg
  const leftLegGroup = new THREE.Group();
  leftLegGroup.name = "Astro_LeftLeg";
  leftLegGroup.position.set(-0.31, 0.32, 0);

  const leftLegMesh = new THREE.Mesh(legGeom, marshmallowWhiteMat);
  leftLegMesh.position.set(0, -0.11, 0);
  leftLegGroup.add(leftLegMesh);

  const leftFoot = new THREE.Mesh(chubbyFootGeom, softLilacMat);
  leftFoot.position.set(0, -0.25, 0.06);
  leftLegGroup.add(leftFoot);

  rootGroup.add(leftLegGroup);

  // Right Leg
  const rightLegGroup = new THREE.Group();
  rightLegGroup.name = "Astro_RightLeg";
  rightLegGroup.position.set(0.31, 0.32, 0);

  const rightLegMesh = new THREE.Mesh(legGeom, marshmallowWhiteMat);
  rightLegMesh.position.set(0, -0.11, 0);
  rightLegGroup.add(rightLegMesh);

  const rightFoot = new THREE.Mesh(chubbyFootGeom, softLilacMat);
  rightFoot.position.set(0, -0.25, 0.06);
  rightLegGroup.add(rightFoot);

  rootGroup.add(rightLegGroup);

  return {
    rootGroup,
    bodyGroup,
    headGroup,
    leftArmGroup,
    rightArmGroup,
    leftLegGroup,
    rightLegGroup,
    leftEyeGroup,
    rightEyeGroup,
    leftBlushMesh,
    rightBlushMesh,
    mouthMesh,
    haloRingMesh,
    leftAntennaGroup,
    rightAntennaGroup,
    antennaLight,
    thrusterLight,
    materials,
    geometries,
  };
}

export function disposeAstroCharacter(rig: AstroRig) {
  rig.geometries.forEach((g) => g.dispose());
  Object.values(rig.materials).forEach((m) => m.dispose());
}
