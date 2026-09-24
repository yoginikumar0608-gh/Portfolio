import * as THREE from 'three';

/**
 * Creates cinematic lighting, soft atmospheric fog, and futuristic digital grid floor
 */
export function setupAIWorldLighting(scene) {
  // Ambient fill
  const ambientLight = new THREE.AmbientLight(0x0a101d, 1.2);
  scene.add(ambientLight);

  // Key light (Cyan neon front-left)
  const keyLight = new THREE.DirectionalLight(0x00f5d4, 2.2);
  keyLight.position.set(-3, 4, 4);
  scene.add(keyLight);

  // Rim / Edge light (Deep violet back-right for silhouette pop)
  const rimLight = new THREE.DirectionalLight(0xa855f7, 3.2);
  rimLight.position.set(4, 3, -3);
  scene.add(rimLight);

  // Top soft hair light
  const topLight = new THREE.PointLight(0x38bdf8, 1.5, 10);
  topLight.position.set(0, 5, 1);
  scene.add(topLight);

  // Volumetric atmospheric fog
  scene.fog = new THREE.FogExp2(0x05070d, 0.055);

  // Subtle digital grid floor
  const gridHelper = new THREE.GridHelper(30, 40, 0x00f5d4, 0x1e293b);
  gridHelper.position.y = -1.2;
  gridHelper.material.opacity = 0.18;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  return { ambientLight, keyLight, rimLight, topLight, gridHelper };
}
