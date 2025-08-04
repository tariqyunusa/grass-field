"use client";

import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import GrassField from "./GrassField";
import CloudPlane from "./CloudPlane";



export default function Home() {
  const ambientLightRef = useRef();
  const dirLightRef = useRef();

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Canvas shadows={false} camera={{ position: [0, 10, 20], fov: 50,near: 0.1, far: 1000}}>
        <ambientLight
          ref={ambientLightRef}
          intensity={0.5}
          color={"#c2a07d"}
        />
        <directionalLight
          ref={dirLightRef}
          position={[-1, 20, 5]}
          intensity={1}
          color={"#c2a07d"}
        />       
        <color attach="background" args={["#87CEFA"]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 8]} receiveShadow={false}>
          <planeGeometry args={[50, 10]} />
          <meshStandardMaterial color="#1a0d07ff" />
        </mesh>
        {/* <OrbitControls /> */}
        <CloudPlane />
        <GrassField count={40000} spread={{ x: 50, z: 10 }} position={[0, -0.01, 2.2]} />
      </Canvas>
    </section>
  );
}
