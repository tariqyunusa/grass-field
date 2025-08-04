"use client";

import { useRef, useMemo, useEffect } from "react";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import BladeMaterial from "./blade";

extend({ BladeMaterial });

const createBladeGeometry = () => {
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
};

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
