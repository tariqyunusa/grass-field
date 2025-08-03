import * as THREE from "three";

export function generateNoiseTexture(size = 256) {
  const data = new Uint8Array(size * size);
  for (let i = 0; i < size * size; i++) {
    data[i] = Math.floor(Math.random() * 256);
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

export function createBladeGeometry() {
  const width = 0.1;
  const height = 1;
  const segments = 20;
  const offset = 0.02;

  const positions = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= segments; i++) {
    const y = (i / segments) * height;
    const t = i / segments;

    const factor = 1 - t;
    const curveX = Math.sin(t * Math.PI) * 0.05;
    const curveZ = Math.sin(t * Math.PI) * 0.01;

    const leftBack = [-width * 0.5 * factor + curveX, y, -offset + curveZ];
    const rightBack = [width * 0.5 * factor + curveX, y, -offset + curveZ];
    const leftFront = [-width * 0.5 * factor + curveX, y, offset - curveZ];
    const rightFront = [width * 0.5 * factor + curveX, y, offset - curveZ];

    positions.push(...leftBack, ...rightBack, ...leftFront, ...rightFront);
    uvs.push(0, t, 1, t, 0, t, 1, t);
  }

  for (let i = 0; i < segments; i++) {
    const stride = 4;
    const base = i * stride;

    indices.push(base, base + 4, base + 1);
    indices.push(base + 1, base + 4, base + 5);
    indices.push(base + 2, base + 3, base + 6);
    indices.push(base + 3, base + 7, base + 6);
    indices.push(base, base + 2, base + 4);
    indices.push(base + 2, base + 6, base + 4);
    indices.push(base + 1, base + 5, base + 3);
    indices.push(base + 3, base + 5, base + 7);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}
