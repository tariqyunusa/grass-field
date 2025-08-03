"use client";

import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import GrassField from "./GrassField";


const ColorCubeBackground = () => {
  const materials = useMemo(() => (
    [
      "#87ceeb",
      "#87ceeb",
      "#87ceeb",
      "#000000",
      "#87ceeb",
      "#87ceeb",
    ].map((color, i) => (
      <meshBasicMaterial
        key={i}
        attach={`material-${i}`}
        color={color}
        side={THREE.BackSide}
      />
    ))
  ), []);

  return (
    <mesh position={[0, -50, 0]}>
      <boxGeometry args={[50, 200, 10]} />
      {materials}
    </mesh>
  );
};


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
      <Canvas shadows={false} camera={{ position: [-1, 4.5, 20.8], fov: 50 }}>
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
        {/* <ColorCubeBackground /> */}
        <color attach="background" args={["#87ceeb"]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow={false}>
          <planeGeometry args={[50, 30]} />
          <meshStandardMaterial color="#1a0d07ff" />
        </mesh>
        <OrbitControls />
        <GrassField count={30000} spread={{ x: 50, z: 30 }} />
      </Canvas>
    </section>
  );
}
