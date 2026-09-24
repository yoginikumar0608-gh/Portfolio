import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createYBot } from './YBotMesh';
import { createBotParticles } from './BotParticles';
import { setupAIWorldLighting } from './AIWorldLighting';

/**
 * AIWorld: Continuously looping 3D personalized AI robot background environment.
 * The robot (Y-BOT) remains continuously alive in real time with seamless idle motion:
 * - Breathing and subtle torso expansion
 * - Smooth levitation and body oscillation
 * - Figure-8 ambient head scanning & cursor tracking
 * - Realistic occasional eye blinking & glow pulsation
 * - AI core gyro rings rotating & core pulsing
 * - Surrounding floating ambient data particles
 * - Shoulder pauldron micro-movements
 * - Zero restarts or freezing when navigating portfolio sections
 */
export default function AIWorld({ currentSectionIndex = 0 }) {
  const mountRef = useRef(null);
  const sectionRef = useRef(currentSectionIndex);

  // Keep sectionRef in sync without resetting Three.js loop
  useEffect(() => {
    sectionRef.current = currentSectionIndex;
  }, [currentSectionIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- 1. Scene & Camera Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    // Base camera framing
    camera.position.set(0.2, 1.25, 5.0);

    // Detect device capabilities
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 2. WebGL Renderer ---
    const isMobileInit = width < 768;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobileInit,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileInit ? 1.5 : 2));
    if (THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- 3. Cinematic Scene Lighting & Fog ---
    const lighting = setupAIWorldLighting(scene);

    // --- 4. Y-BOT Procedural 3D Mesh ---
    const bot = createYBot();
    scene.add(bot.group);

    // --- 5. Floating Ambient Data Particles (Reduced count on mobile) ---
    const particleCount = isMobileInit ? 85 : (width < 1024 ? 135 : 220);
    const particles = createBotParticles(particleCount);
    scene.add(particles.points);

    // Initial responsive positioning (Visible but smaller on mobile)
    const isDesktop = width >= 1024;
    const botScale = isDesktop ? 1.0 : (isMobileInit ? 0.72 : 0.85);
    bot.group.scale.set(botScale, botScale, botScale);

    const targetBotPos = {
      x: isDesktop ? 1.45 : (width >= 768 ? 0.8 : 0),
      y: isDesktop ? -0.32 : (isMobileInit ? 0.25 : -0.48),
      z: isDesktop ? 0 : (isMobileInit ? -1.15 : -0.7),
    };
    bot.group.position.set(targetBotPos.x, targetBotPos.y, targetBotPos.z);
    bot.group.rotation.y = isDesktop ? -0.22 : 0;

    // --- 6. Smooth Mouse Parallax Tracking ---
    const mouse = { x: 0, y: 0 };
    const mouseSmooth = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      if (isTouch) return;
      const clientX = e.clientX || 0;
      const clientY = e.clientY || 0;
      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    };
    if (!isTouch) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    // --- 7. Window Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      const isMobileNow = width < 768;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileNow ? 1.5 : 2));

      const desktopNow = width >= 1024;
      const tabletNow = width >= 768 && width < 1024;
      const currentScale = desktopNow ? 1.0 : (isMobileNow ? 0.72 : 0.85);
      bot.group.scale.set(currentScale, currentScale, currentScale);

      targetBotPos.x = desktopNow ? 1.45 : (tabletNow ? 0.8 : 0);
      targetBotPos.y = desktopNow ? -0.32 : (isMobileNow ? 0.25 : -0.48);
      targetBotPos.z = desktopNow ? 0 : (isMobileNow ? -1.15 : -0.7);
    };
    window.addEventListener('resize', handleResize);

    // --- 8. Continuous Seamless Animation Loop with Section-Reactive Interpolation ---
    let animationFrameId;
    const startTime = performance.now();

    // Accumulated gyro angles for smooth speed transitions without phase jumps
    let gyroAngle1 = 0;
    let gyroAngle2 = 0;
    let transitionBurst = 0;
    let lastSectionTracked = sectionRef.current;

    // Smoothly interpolated section state parameters
    const sectionState = {
      bodyRotY: isDesktop ? -0.15 : 0,
      headOffsetY: 0,
      headOffsetX: 0,
      coreSpeed: 1.0,
      coreIntensity: 1.0,
      scanning: 0.0,
      summonGesture: 0.0,
      particleBoost: 1.0,
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Continuous monotonic time (seconds)
      const now = performance.now();
      const time = (now - startTime) * 0.001;

      // Smooth mouse interpolation
      mouseSmooth.x += (mouse.x - mouseSmooth.x) * 0.04;
      mouseSmooth.y += (mouse.y - mouseSmooth.y) * 0.04;

      // ==========================================
      // SECTION REACTION TARGETS & TRANSITION BURST
      // 0: HOME | 1: ABOUT | 2: SKILLS | 3: PROJECTS | 4: EDUCATION | 5: RESUME | 6: CONTACT
      // ==========================================
      const sec = sectionRef.current;
      if (sec !== lastSectionTracked) {
        lastSectionTracked = sec;
        transitionBurst = 1.0;
      }
      if (transitionBurst > 0.01) {
        transitionBurst *= 0.95;
      } else {
        transitionBurst = 0;
      }

      const desktop = container ? (container.clientWidth || window.innerWidth) >= 1024 : isDesktop;

      let targetBodyRotY = desktop ? -0.15 : 0;
      let targetHeadOffsetY = 0;
      let targetHeadOffsetX = 0;
      let targetCoreSpeed = 1.0;
      let targetCoreIntensity = 1.0;
      let targetScanning = 0.0;
      let targetSummonGesture = 0.0;
      let targetParticleBoost = 1.0;

      switch (sec) {
        case 0:
          // HOME: Robot faces the user with calm idle animation
          targetBodyRotY = desktop ? -0.15 : 0;
          targetHeadOffsetY = 0;
          targetHeadOffsetX = 0;
          targetCoreSpeed = 1.0;
          targetCoreIntensity = 1.0;
          targetScanning = 0.0;
          targetSummonGesture = 0.0;
          targetParticleBoost = 1.0;
          break;

        case 1:
          // ABOUT: Robot subtly turns toward the content on the left/center
          targetBodyRotY = desktop ? -0.42 : -0.22;
          targetHeadOffsetY = -0.18;
          targetHeadOffsetX = 0.03;
          targetCoreSpeed = 1.0;
          targetCoreIntensity = 1.0;
          targetScanning = 0.0;
          targetSummonGesture = 0.0;
          targetParticleBoost = 1.0;
          break;

        case 2:
          // SKILLS: AI core becomes slightly more active
          targetBodyRotY = desktop ? -0.20 : 0;
          targetHeadOffsetY = -0.06;
          targetHeadOffsetX = 0;
          targetCoreSpeed = 2.1;
          targetCoreIntensity = 1.65;
          targetScanning = 0.0;
          targetSummonGesture = 0.0;
          targetParticleBoost = 1.5;
          break;

        case 3:
          // PROJECTS: Robot enters a subtle scanning/analysis state
          targetBodyRotY = desktop ? -0.32 : -0.12;
          targetHeadOffsetY = -0.10;
          targetHeadOffsetX = 0.02;
          targetCoreSpeed = 1.25;
          targetCoreIntensity = 1.2;
          targetScanning = 1.0;
          targetSummonGesture = 0.0;
          targetParticleBoost = 1.35;
          break;

        case 4:
          // EDUCATION: Robot returns to a calm state
          targetBodyRotY = desktop ? -0.22 : 0;
          targetHeadOffsetY = -0.06;
          targetHeadOffsetX = 0.02;
          targetCoreSpeed = 0.95;
          targetCoreIntensity = 1.0;
          targetScanning = 0.0;
          targetSummonGesture = 0.0;
          targetParticleBoost = 1.0;
          break;

        case 5:
          // RESUME: Robot makes a subtle gesture & lighting response suggesting resume summon
          targetBodyRotY = desktop ? -0.28 : -0.08;
          targetHeadOffsetY = -0.08;
          targetHeadOffsetX = 0.01;
          targetCoreSpeed = 1.5;
          targetCoreIntensity = 1.85;
          targetScanning = 0.0;
          targetSummonGesture = 1.0;
          targetParticleBoost = 1.6;
          break;

        case 6:
          // CONTACT: Robot subtly turns toward the contact area
          targetBodyRotY = desktop ? -0.38 : -0.18;
          targetHeadOffsetY = -0.16;
          targetHeadOffsetX = 0.04;
          targetCoreSpeed = 1.1;
          targetCoreIntensity = 1.15;
          targetScanning = 0.0;
          targetSummonGesture = 0.0;
          targetParticleBoost = 1.05;
          break;

        default:
          break;
      }

      // Smooth continuous interpolation (lerp) — guarantees silky-smooth transitions with no jumps
      const lerpFactor = 0.038;
      sectionState.bodyRotY += (targetBodyRotY - sectionState.bodyRotY) * lerpFactor;
      sectionState.headOffsetY += (targetHeadOffsetY - sectionState.headOffsetY) * lerpFactor;
      sectionState.headOffsetX += (targetHeadOffsetX - sectionState.headOffsetX) * lerpFactor;
      sectionState.coreSpeed += (targetCoreSpeed - sectionState.coreSpeed) * lerpFactor;
      sectionState.coreIntensity += (targetCoreIntensity - sectionState.coreIntensity) * lerpFactor;
      sectionState.scanning += (targetScanning - sectionState.scanning) * lerpFactor;
      sectionState.summonGesture += (targetSummonGesture - sectionState.summonGesture) * lerpFactor;
      sectionState.particleBoost += (targetParticleBoost - sectionState.particleBoost) * lerpFactor;

      // Position smooth lerping (for responsive viewport adjustments)
      bot.group.position.x += (targetBotPos.x - bot.group.position.x) * 0.05;
      bot.group.position.y += (targetBotPos.y - bot.group.position.y) * 0.05;
      bot.group.position.z += (targetBotPos.z - bot.group.position.z) * 0.05;
      bot.group.rotation.y = sectionState.bodyRotY;

      // Subtle camera parallax (gentle and smooth, disabled on mobile touch)
      const camParallaxX = isTouch ? 0 : mouseSmooth.x * 0.12;
      const camParallaxY = isTouch ? 0 : mouseSmooth.y * 0.08;
      camera.position.x = 0.2 + camParallaxX;
      camera.position.y = 1.25 + camParallaxY;

      // ==========================================
      // A. CONTINUOUS BREATHING & LEVITATION
      // ==========================================
      // Smooth vertical levitation (respecting reduced motion)
      const levitateAmp = prefersReducedMotion ? 0.025 : 0.075;
      const floatY = Math.sin(time * 0.85) * levitateAmp;
      bot.botBody.position.y = floatY;

      // Torso breathing expansion & contraction
      const breathPhase = Math.sin(time * 1.55);
      bot.torsoGroup.position.y = breathPhase * 0.02;
      const breathScale = 1 + breathPhase * 0.015;
      bot.torsoGroup.scale.set(breathScale, 1 + breathPhase * 0.01, breathScale);

      // Subtle whole-body organic roll & pitch
      bot.botBody.rotation.z = Math.sin(time * 0.55) * 0.018;
      bot.botBody.rotation.x = Math.sin(time * 0.72) * 0.014;

      // ==========================================
      // B. INTELLIGENT HEAD MICRO-LOOK, SCANNING & CURSOR TRACKING
      // ==========================================
      // Organic figure-8 ambient idle scanning
      const idleLookX = Math.sin(time * 0.45) * 0.065 + Math.cos(time * 0.22) * 0.035;
      const idleLookY = Math.sin(time * 0.65) * 0.04 + 0.015;
      const idleLookZ = Math.sin(time * 0.35) * 0.018;

      // Subtle horizontal scanning sweep in Projects section
      const projectScanSweep = Math.sin(time * 1.2) * 0.14 * sectionState.scanning;

      // Mouse influence clamped to subtle natural range (disabled on touch)
      const mouseLookX = isTouch ? 0 : mouseSmooth.x * 0.16;
      const mouseLookY = isTouch ? 0 : mouseSmooth.y * 0.12;

      bot.headGroup.rotation.y = idleLookX + mouseLookX + sectionState.headOffsetY + projectScanSweep;
      bot.headGroup.rotation.x = idleLookY - mouseLookY + sectionState.headOffsetX;
      bot.headGroup.rotation.z = idleLookZ;

      // ==========================================
      // C. ORGANIC EYE BLINKING & GLOW MODULATION
      // ==========================================
      // Natural human/AI blink cycle every 4.8 seconds + occasional micro-double-blink
      const blinkPeriod = 4.8;
      const cycleTime = time % blinkPeriod;
      let eyeScaleY = 1.0;

      // Primary blink around 4.1s
      if (cycleTime > 4.1 && cycleTime < 4.28) {
        const progress = (cycleTime - 4.1) / 0.18;
        eyeScaleY = Math.max(0.06, 1.0 - Math.sin(progress * Math.PI) * 0.94);
      }
      // Occasional double-blink
      else if (Math.floor(time / blinkPeriod) % 2 === 0 && cycleTime > 4.42 && cycleTime < 4.56) {
        const progress = (cycleTime - 4.42) / 0.14;
        eyeScaleY = Math.max(0.08, 1.0 - Math.sin(progress * Math.PI) * 0.92);
      }
      bot.eyesGroup.scale.y = eyeScaleY;

      // Subtle dynamic eye glow intensity oscillation + scanning cadence
      if (bot.eyeEmissiveMat) {
        const scanFlicker = Math.sin(time * 10.0) * 0.25 * sectionState.scanning;
        const eyeGlow = (2.4 + Math.sin(time * 2.8) * 0.65 + Math.cos(time * 1.1) * 0.35 + scanFlicker) * Math.max(1.0, sectionState.coreIntensity * 0.9);
        // Dims during blink
        bot.eyeEmissiveMat.emissiveIntensity = eyeGlow * Math.max(0.2, eyeScaleY);
      }

      // ==========================================
      // D. AI CORE PULSE & ACCELERATION
      // ==========================================
      // Gyro rings perpetual rotation with smooth speed modulation and transition burst
      const motionRate = prefersReducedMotion ? 0.4 : 1.0;
      gyroAngle1 += 0.015 * (sectionState.coreSpeed + transitionBurst * 1.2) * motionRate;
      gyroAngle2 += 0.019 * (sectionState.coreSpeed + transitionBurst * 1.2) * motionRate;
      bot.coreRing1.rotation.x = gyroAngle1;
      bot.coreRing1.rotation.y = gyroAngle1 * 0.72;
      bot.coreRing2.rotation.y = -gyroAngle2;
      bot.coreRing2.rotation.z = gyroAngle2 * 0.54;

      // AI Core sphere rhythmic heartbeat pulse
      const pulseSpeed = 3.4 * Math.sqrt(sectionState.coreSpeed);
      const corePulse = 1.0 + Math.sin(time * pulseSpeed) * 0.12 * sectionState.coreIntensity + Math.sin(time * pulseSpeed * 2) * 0.035;
      bot.coreSphere.scale.set(corePulse, corePulse, corePulse);

      // Core point light dynamic radiance
      bot.coreLight.intensity = (2.5 + Math.sin(time * pulseSpeed) * 1.2) * sectionState.coreIntensity;
      bot.coreLight.distance = 4.8 + Math.sin(time * 1.7) * 0.8;

      // Core emissive material pulsation
      if (bot.cyanEmissiveMat) {
        bot.cyanEmissiveMat.emissiveIntensity = (2.2 + Math.sin(time * pulseSpeed) * 0.7) * sectionState.coreIntensity;
      }

      // Resume summon holographic halo & purple glow resonance
      if (bot.purpleEmissiveMat) {
        bot.purpleEmissiveMat.emissiveIntensity = 2.0 + 1.8 * sectionState.summonGesture;
      }
      if (bot.haloRing) {
        bot.haloRing.material.opacity = 0.25 + 0.5 * sectionState.summonGesture;
        bot.haloRing.rotation.z += 0.003 * (1 + 2.5 * sectionState.summonGesture);
      }

      // ==========================================
      // E. FLOATING PAULDRONS, ARMS & SUMMON GESTURE
      // ==========================================
      // Left arm stays in relaxed floating idle
      const leftArmIdleZ = -0.04 + Math.sin(time * 1.15) * 0.022;
      bot.leftArm.rotation.z = leftArmIdleZ;
      bot.leftArm.rotation.x = Math.sin(time * 0.75) * 0.02;

      // Right arm smoothly transitions to subtle holographic summon gesture in Resume section
      const rightArmIdleZ = 0.04 - Math.sin(time * 1.15) * 0.022;
      const rightArmIdleX = -Math.sin(time * 0.75) * 0.02;

      bot.rightArm.rotation.z = THREE.MathUtils.lerp(rightArmIdleZ, 0.22, sectionState.summonGesture);
      bot.rightArm.rotation.x = THREE.MathUtils.lerp(rightArmIdleX, -0.46, sectionState.summonGesture);
      bot.rightArm.rotation.y = THREE.MathUtils.lerp(0, 0.32, sectionState.summonGesture);
      bot.rightArm.position.y = THREE.MathUtils.lerp(1.4, 1.48, sectionState.summonGesture);
      bot.rightArm.position.z = THREE.MathUtils.lerp(0, 0.16, sectionState.summonGesture);

      // ==========================================
      // F. AMBIENT PARTICLES CONTINUOUS UPDATE
      // ==========================================
      const totalParticleBoost = (sectionState.particleBoost + transitionBurst * 1.5) * motionRate;
      particles.update(time, totalParticleBoost);

      // Floor grid subtle cybernetic scroll
      if (lighting.gridHelper) {
        lighting.gridHelper.position.z = (time * 0.15) % 0.75;
      }

      // Render frame
      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup on Unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();

      // Dispose geometries & materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ overflow: 'hidden' }}
    />
  );
}
