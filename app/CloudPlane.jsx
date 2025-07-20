"use client";
import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import CloudShaderMaterial from "./CloudShaderMaterial";

extend({ CloudShaderMaterial });

export default function CloudPlane() {
  const materialRef = useRef();

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
    }
  });

  return (
    <mesh position={[0, 1, -10]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[70, 30]} />
      <cloudShaderMaterial ref={materialRef} transparent />
    </mesh>
  );
}
