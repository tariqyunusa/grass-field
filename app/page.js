"use client";

import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import GrassField from "./GrassField";
import CloudPlane from "./CloudPlane";
import styles from "./page.module.css"
import Image from "next/image";
import { Flower } from "lucide-react";


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
      <main className={styles.main_section}>
        <nav className={styles.nav}>
          <h1 className={styles.logo}>Serenai</h1>
          <button className={styles.cta}>Menu</button>
         <Flower className={styles.icon}/>
        </nav>

        <div className={styles.content}>
          {/* <div className={styles.headline_wrapper}> */}
            <h1  className={styles.headline}>Serenai. Where Stillness Begins.</h1>
          {/* </div> */}
          {/* <div className={styles.subheadline_wrapper}> */}
            <p className={styles.subheadline}>Your daily pause — a gentle invitation to breathe, reflect, and simply be.</p>
          {/* </div> */}
           <div>
          <button className={styles.cta__}>Enter</button>
        </div>
        </div>
       
      </main>
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
