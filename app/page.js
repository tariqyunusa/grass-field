"use client";

import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import GrassField from "./GrassField";
import CloudPlane from "./CloudPlane";
import styles from "./page.module.css"
import Image from "next/image";
import gsap from "gsap";

import Hero from "./components/Hero";

function CameraIntroAnimation({ headerRef, paragraphRef }) {
  const { camera } = useThree();

  useEffect(() => {
    const tl = gsap.timeline();

    camera.position.set(0, 50, 0);

    tl.to(camera.position, {
      delay: 0.3,
      x: 0,
      y: 8,   
      z: 18,  
      duration: 1.8,
      ease: "power2.inOut",
      // onUpdate: () => camera.lookAt(0, 0, 0),
    })
    .to(camera.position, {
      y: 10,
      z: 20,
      duration: 0.8,
      ease: "power1.out",
      // onUpdate: () => camera.lookAt(0, 0, 0),
    })
    .from(headerRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.out"
    }, "+=0.3")
    .from(paragraphRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2"); 
  }, [camera, headerRef, paragraphRef]);

  return null;
}




export default function Home() {
  const ambientLightRef = useRef();
  const dirLightRef = useRef();
  const headerRef = useRef()
  const paragraphRef = useRef()
  const soundBtnRef = useRef();

  
 


  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "relative"
      }}
    >
      <main className={styles.main_section}>
       <Hero headerRef={headerRef} paragraphRef={paragraphRef} soundBtnRef={soundBtnRef}/>
       
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
        <CameraIntroAnimation headerRef={headerRef} paragraphRef={paragraphRef} />
      </Canvas>
    </section>
  );
}
