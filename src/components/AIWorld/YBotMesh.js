import * as THREE from 'three';

/**
 * Creates the complete procedural 3D Y-BOT model
 * Futuristic, minimal, humanoid AI assistant with glowing chest core & Y insignia
 */
export function createYBot() {
  const root = new THREE.Group();

  // --- Premium Metallic & Glowing Materials ---
  const armorMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.88,
    roughness: 0.22,
  });

  const darkJointMat = new THREE.MeshStandardMaterial({
    color: 0x07090e,
    metalness: 0.95,
    roughness: 0.4,
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xcfd8dc,
    metalness: 0.98,
    roughness: 0.12,
  });

  const cyanEmissiveMat = new THREE.MeshStandardMaterial({
    color: 0x00f5d4,
    emissive: 0x00f5d4,
    emissiveIntensity: 2.2,
    roughness: 0.1,
  });

  const eyeEmissiveMat = new THREE.MeshStandardMaterial({
    color: 0x00f5d4,
    emissive: 0x00f5d4,
    emissiveIntensity: 2.8,
    roughness: 0.1,
  });

  const purpleEmissiveMat = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    emissive: 0xa855f7,
    emissiveIntensity: 2.0,
    roughness: 0.1,
  });

  const visorMat = new THREE.MeshStandardMaterial({
    color: 0x050811,
    roughness: 0.08,
    metalness: 0.9,
  });

  // --- Robot Main Pivot Group (for floating & breathing) ---
  const botBody = new THREE.Group();
  root.add(botBody);

  // ==========================================
  // 1. TORSO & CHEST CHASSIS
  // ==========================================
  const torsoGroup = new THREE.Group();
  botBody.add(torsoGroup);

  // Upper Chest Plate (Tapered futuristic armor)
  const chestGeo = new THREE.CylinderGeometry(0.72, 0.52, 0.9, 6);
  const chestMesh = new THREE.Mesh(chestGeo, armorMat);
  chestMesh.position.y = 1.25;
  chestMesh.rotation.y = Math.PI / 6;
  torsoGroup.add(chestMesh);

  // Mid Torso Core Inset
  const midTorsoGeo = new THREE.CylinderGeometry(0.5, 0.42, 0.5, 6);
  const midTorsoMesh = new THREE.Mesh(midTorsoGeo, darkJointMat);
  midTorsoMesh.position.y = 0.65;
  midTorsoMesh.rotation.y = Math.PI / 6;
  torsoGroup.add(midTorsoMesh);

  // Lower Abdominal Spine Segments
  for (let i = 0; i < 3; i++) {
    const abGeo = new THREE.BoxGeometry(0.55 - i * 0.05, 0.12, 0.35);
    const abMesh = new THREE.Mesh(abGeo, armorMat);
    abMesh.position.set(0, 0.32 - i * 0.16, 0.05);
    torsoGroup.add(abMesh);
  }

  // Collar / Neck Base Trim
  const collarGeo = new THREE.TorusGeometry(0.35, 0.05, 8, 24);
  const collarMesh = new THREE.Mesh(collarGeo, chromeMat);
  collarMesh.rotation.x = Math.PI / 2;
  collarMesh.position.y = 1.72;
  torsoGroup.add(collarMesh);

  // ==========================================
  // 2. AI CORE WITH "Y" INSIGNIA & ORBITAL RINGS
  // ==========================================
  const coreGroup = new THREE.Group();
  coreGroup.position.set(0, 1.28, 0.38);
  torsoGroup.add(coreGroup);

  // Core Housing Rim
  const coreRimGeo = new THREE.TorusGeometry(0.24, 0.035, 12, 32);
  const coreRimMesh = new THREE.Mesh(coreRimGeo, chromeMat);
  coreGroup.add(coreRimMesh);

  // Glowing Core Sphere
  const coreSphereGeo = new THREE.SphereGeometry(0.14, 24, 24);
  const coreSphere = new THREE.Mesh(coreSphereGeo, cyanEmissiveMat);
  coreGroup.add(coreSphere);

  // Dynamic Point Light emitted by the Core
  const coreLight = new THREE.PointLight(0x00f5d4, 2.5, 5);
  coreGroup.add(coreLight);

  // Concentric Orbital Gyro Rings
  const ring1Geo = new THREE.TorusGeometry(0.19, 0.012, 8, 32);
  const coreRing1 = new THREE.Mesh(ring1Geo, purpleEmissiveMat);
  coreGroup.add(coreRing1);

  const ring2Geo = new THREE.TorusGeometry(0.16, 0.01, 8, 32);
  const coreRing2 = new THREE.Mesh(ring2Geo, cyanEmissiveMat);
  coreGroup.add(coreRing2);

  // Geometric "Y" Symbol Plate overlaid across Core Aperture
  const ySymbolGroup = new THREE.Group();
  ySymbolGroup.position.z = 0.05;

  const yStemGeo = new THREE.BoxGeometry(0.024, 0.11, 0.02);
  const yStem = new THREE.Mesh(yStemGeo, chromeMat);
  yStem.position.y = -0.045;
  ySymbolGroup.add(yStem);

  const yBranchLeftGeo = new THREE.BoxGeometry(0.022, 0.1, 0.02);
  const yBranchLeft = new THREE.Mesh(yBranchLeftGeo, chromeMat);
  yBranchLeft.position.set(-0.042, 0.042, 0);
  yBranchLeft.rotation.z = Math.PI / 4;
  ySymbolGroup.add(yBranchLeft);

  const yBranchRightGeo = new THREE.BoxGeometry(0.022, 0.1, 0.02);
  const yBranchRight = new THREE.Mesh(yBranchRightGeo, chromeMat);
  yBranchRight.position.set(0.042, 0.042, 0);
  yBranchRight.rotation.z = -Math.PI / 4;
  ySymbolGroup.add(yBranchRight);

  coreGroup.add(ySymbolGroup);

  // ==========================================
  // 3. HEAD & SLEEK VISOR WITH BLINKING LED EYES
  // ==========================================
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 2.12, 0.02);
  torsoGroup.add(headGroup);

  // Neck Hydraulic Column
  const neckGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.28, 16);
  const neckMesh = new THREE.Mesh(neckGeo, darkJointMat);
  neckMesh.position.y = -0.22;
  headGroup.add(neckMesh);

  // Helmet Cranium (Futuristic streamlined shell)
  const helmetGeo = new THREE.SphereGeometry(0.38, 24, 24);
  helmetGeo.scale(1, 1.15, 1.1);
  const helmetMesh = new THREE.Mesh(helmetGeo, armorMat);
  headGroup.add(helmetMesh);

  // Visor Faceplate (Dark glossy curved glass)
  const visorGeo = new THREE.SphereGeometry(0.375, 24, 24, 0, Math.PI);
  visorGeo.scale(0.96, 0.65, 0.95);
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  visorMesh.rotation.y = -Math.PI / 2;
  visorMesh.position.set(0, 0.02, 0.06);
  headGroup.add(visorMesh);

  // Dual Expressive LED Eyes (Optical slits)
  const eyesGroup = new THREE.Group();
  eyesGroup.position.set(0, 0.04, 0.4);
  headGroup.add(eyesGroup);

  const eyeGeo = new THREE.BoxGeometry(0.11, 0.028, 0.02);
  const leftEye = new THREE.Mesh(eyeGeo, eyeEmissiveMat);
  leftEye.position.x = -0.13;
  eyesGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, eyeEmissiveMat);
  rightEye.position.x = 0.13;
  eyesGroup.add(rightEye);

  // Temple Audio / Sensor Fins
  const finGeo = new THREE.BoxGeometry(0.04, 0.22, 0.16);
  const leftFin = new THREE.Mesh(finGeo, chromeMat);
  leftFin.position.set(-0.41, 0.05, -0.05);
  headGroup.add(leftFin);

  const rightFin = new THREE.Mesh(finGeo, chromeMat);
  rightFin.position.set(0.41, 0.05, -0.05);
  headGroup.add(rightFin);

  // Subtle Temple Telemetry Light Dots
  const templeLightL = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), purpleEmissiveMat);
  templeLightL.position.set(-0.43, 0.12, 0.01);
  headGroup.add(templeLightL);

  const templeLightR = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), purpleEmissiveMat);
  templeLightR.position.set(0.43, 0.12, 0.01);
  headGroup.add(templeLightR);

  // ==========================================
  // 4. FLOATING MAGNETIC SHOULDERS & ARMS
  // ==========================================
  const createArm = (isLeft) => {
    const side = isLeft ? -1 : 1;
    const armGroup = new THREE.Group();
    armGroup.position.set(side * 0.82, 1.4, 0);

    // Floating Shoulder Pauldron
    const pauldronGeo = new THREE.SphereGeometry(0.28, 16, 16);
    pauldronGeo.scale(1.1, 0.85, 0.95);
    const pauldron = new THREE.Mesh(pauldronGeo, armorMat);
    armGroup.add(pauldron);

    // Shoulder Neon Accent Ring
    const shoulderRingGeo = new THREE.TorusGeometry(0.22, 0.015, 8, 24);
    const shoulderRing = new THREE.Mesh(shoulderRingGeo, isLeft ? cyanEmissiveMat : purpleEmissiveMat);
    shoulderRing.rotation.y = Math.PI / 2;
    armGroup.add(shoulderRing);

    // Upper Arm Conduit
    const bicepGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.5, 12);
    const bicep = new THREE.Mesh(bicepGeo, darkJointMat);
    bicep.position.set(0, -0.38, 0);
    armGroup.add(bicep);

    // Elbow Pivot Sphere
    const elbowGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const elbow = new THREE.Mesh(elbowGeo, chromeMat);
    elbow.position.set(0, -0.66, 0);
    armGroup.add(elbow);

    // Forearm
    const forearmGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.55, 12);
    const forearm = new THREE.Mesh(forearmGeo, armorMat);
    forearm.position.set(0, -0.98, 0.05);
    forearm.rotation.x = -0.2;
    armGroup.add(forearm);

    return armGroup;
  };

  const leftArm = createArm(true);
  const rightArm = createArm(false);
  torsoGroup.add(leftArm);
  torsoGroup.add(rightArm);

  // ==========================================
  // 5. BACK SPINE CONDUITS
  // ==========================================
  for (let i = 0; i < 4; i++) {
    const spineNode = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.08), chromeMat);
    spineNode.position.set(0, 1.55 - i * 0.22, -0.36);
    torsoGroup.add(spineNode);
  }

  // Floating Holographic Telemetry Halo Ring
  const haloGeo = new THREE.TorusGeometry(0.85, 0.008, 6, 48);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0x00f5d4,
    transparent: true,
    opacity: 0.3,
    wireframe: true,
  });
  const haloRing = new THREE.Mesh(haloGeo, haloMat);
  haloRing.position.set(0, 1.82, -0.12);
  haloRing.rotation.x = Math.PI / 3;
  torsoGroup.add(haloRing);

  return {
    group: root,
    botBody,
    torsoGroup,
    headGroup,
    eyesGroup,
    leftEye,
    rightEye,
    coreGroup,
    coreSphere,
    coreRing1,
    coreRing2,
    coreLight,
    leftArm,
    rightArm,
    haloRing,
    eyeEmissiveMat,
    cyanEmissiveMat,
    purpleEmissiveMat
  };
}
