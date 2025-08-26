import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const BladeMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.3, 0.6, 0.3), // darker green for uniform reference
  },
  // Vertex Shader
  `
 uniform float time;
varying vec2 vUv;
varying vec3 vNormal;

// Noise helpers
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vUv = uv;
  vNormal = normal;
  vec3 newPosition = position;

  float bulge = sin(uv.y * 3.1415) * 0.005;
  newPosition.z += bulge;
  float speed = 1.5;
  float amplitude = 0.5;

  vec4 worldPos = instanceMatrix * vec4(position, 1.0);
  float windFreq = 0.2;
  vec2 windDir = vec2(1.0, 0.3);
  float noiseValue = noise(worldPos.xz * windFreq + windDir * time * 1.0);
  float sway = (noiseValue - 0.5) * amplitude * uv.y * 2.0;
  newPosition.x += sway;
  float curve = sin(uv.y * 3.14) * 0.01;
  float twist = cos(uv.y * 3.14) * 0.005;
  newPosition.x += curve;
  newPosition.z += twist;
  vec4 worldPosition = instanceMatrix * vec4(newPosition, 1.0);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}


  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec3 baseColor = mix(vec3(0.2, 0.4, 0.2), vec3(0.3, 0.6, 0.3), vUv.y);

      vec3 lightDir = normalize(vec3(0.5, 1.0, 0.75));
      float light = dot(normalize(vNormal), lightDir);
      light = clamp(light, 0.3, 1.0);

      vec3 greenLightTint = vec3(0.6, 0.85, 0.6); 
      vec3 finalColor = baseColor * light * greenLightTint;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

export default BladeMaterial;
