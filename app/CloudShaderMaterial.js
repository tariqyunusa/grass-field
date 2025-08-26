import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// GLSL 2D Noise Function (Simplex-inspired)
const noise = `
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1,311.7)),
           dot(p, vec2(269.5,183.3)));
  return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise(in vec2 p) {
  const float K1 = 0.366025404; // (sqrt(3)-1)/2
  const float K2 = 0.211324865; // (3-sqrt(3))/6
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  vec2 o = step(a.yx, a.xy);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0*K2;
  vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
  vec3 n = h*h*h*h*vec3(dot(hash(i),a), dot(hash(i + o),b), dot(hash(i + 1.0),c));
  return dot(n, vec3(70.0));
}
`;

const CloudShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color("#e7e7e7ff"),
  },
  // Vertex Shader
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
uniform float time;
uniform vec3 color;
varying vec2 vUv;

${noise}

void main() {
    // Blend multiple scales of noise for more shapeless/wispy feel
       float n1 = noise(vUv * 1.2 + vec2(time * 0.05, 0.0));
    float n2 = noise(vUv * 3.5 + vec2(time * 0.025, 5.0));
    float n3 = noise(vUv * 8.0 + vec2(time * 0.01, 10.0));

    float n = (n1 * 0.6 + n2 * 0.3 + n3 * 0.1);

    // Clamp noise so it's not too flat
    n = clamp(n, 0.0, 1.0);

    // Softer but still visible
    float cloud = smoothstep(0.25, 0.75, n);

    // Vertical mask (keeps clouds within band)
    float verticalMask = smoothstep(0.3, 0.35, vUv.y) * (1.0 - smoothstep(0.9, 0.95, vUv.y));
    cloud *= verticalMask;

    // Final softer opacity (raised to 0.6 so it's visible again)
    gl_FragColor = vec4(color, cloud * 0.6);
}
  `
);

export default CloudShaderMaterial;
