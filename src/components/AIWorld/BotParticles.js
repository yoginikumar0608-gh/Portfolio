import * as THREE from 'three';

/**
 * Creates floating ambient data particles surrounding Y-BOT
 */
export function createBotParticles(count = 220) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const radiuses = new Float32Array(count);
  const angles = new Float32Array(count);

  const cyan = new THREE.Color(0x00f5d4);
  const violet = new THREE.Color(0xa855f7);
  const blue = new THREE.Color(0x38bdf8);

  for (let i = 0; i < count; i++) {
    const r = 1.2 + Math.random() * 3.8;
    const theta = Math.random() * Math.PI * 2;
    const y = -1.2 + Math.random() * 4.4;

    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * r;

    radiuses[i] = r;
    angles[i] = theta;
    speeds[i] = (0.2 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1);

    const chosenColor = Math.random() > 0.5 ? cyan : (Math.random() > 0.5 ? violet : blue);
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Circular glowing soft particle texture
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(0, 245, 212, 0.8)');
  gradient.addColorStop(0.7, 'rgba(168, 85, 247, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    map: texture,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);

  function update(time, activityBoost = 1.0) {
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      angles[i] += speeds[i] * 0.005 * activityBoost;
      const r = radiuses[i];
      pos[i * 3] = Math.cos(angles[i]) * r;
      pos[i * 3 + 1] += Math.sin(time * 0.8 + i) * 0.003;
      pos[i * 3 + 2] = Math.sin(angles[i]) * r;

      if (pos[i * 3 + 1] > 3.8) pos[i * 3 + 1] = -1.2;
      if (pos[i * 3 + 1] < -1.2) pos[i * 3 + 1] = 3.8;
    }
    geometry.attributes.position.needsUpdate = true;
  }

  return { points, update };
}
