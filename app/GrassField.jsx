"use client";

import { useRef, useMemo, useEffect } from "react";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import BladeMaterial from "./blade";
import { createBladeGeometry } from "./helpers";

extend({ BladeMaterial });

const bladeGeometry = createBladeGeometry();
const bladeMaterial = new BladeMaterial();
bladeMaterial.side = THREE.DoubleSide;

export default function GrassField({ count = 10000, spread = 200, position=[0, 0, 15]}) {
  const meshRef = useRef();
  const materialRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;

    meshRef.current.matrixAutoUpdate = false;

    const spreadX = spread?.x ?? spread;
    const spreadZ = spread?.z ?? spread;

    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * spreadX,
        0,
        (Math.random() + 0.3) * spreadZ
      );
      dummy.rotation.y = Math.random() * Math.PI;

      const height = 0.3 + Math.random();
      dummy.scale.set(1, height, 1);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []); 

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
    }
  });

  return (
    <group position={position}>
      <instancedMesh
      ref={meshRef}
      args={[bladeGeometry, null, count]}
    
    >
      <primitive object={bladeMaterial} attach="material" ref={materialRef} />
    </instancedMesh>
    </group>
  );
}
