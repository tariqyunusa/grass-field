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

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 newPosition = position;
      float bulge = sin(uv.y * 3.1415) * 0.005;
      newPosition.z += bulge;
      vec4 worldPos = instanceMatrix * vec4(position, 1.0);

      float speed = 1.5;
      float frequency = 2.5;
      float amplitude = 0.2;

      float offset = worldPos.z * 0.5;
      float sway = sin(time * speed + worldPos.x * frequency + offset) * amplitude;
      sway *= uv.y * 2.0;
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
      // Dark green gradient from base to tip
      vec3 baseColor = mix(vec3(0.2, 0.4, 0.2), vec3(0.3, 0.6, 0.3), vUv.y);

      vec3 lightDir = normalize(vec3(0.5, 1.0, 0.75));
      float light = dot(normalize(vNormal), lightDir);
      light = clamp(light, 0.3, 1.0);

      vec3 greenLightTint = vec3(0.6, 0.85, 0.6); // subtle green tint with darker tone

      vec3 finalColor = baseColor * light * greenLightTint;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

export default BladeMaterial;
