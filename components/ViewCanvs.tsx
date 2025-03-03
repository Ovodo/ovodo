"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Mesh, TextureLoader } from "three";

type Props = { textureUrl: string };

// RotatingCube Component
const RotatingCube = ({ textureUrl }: Props) => {
  const cubeRef = useRef<Mesh>(null);

  // Rotate the cube automatically
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.01; // Rotate around the Y-axis
      cubeRef.current.rotation.z += 0.01; // Rotate around the Z-axis
      cubeRef.current.rotation.x += 0.01; // Rotate around the X-axis
    }
  });

  return (
    <mesh ref={cubeRef}>
      {/* Cube Geometry */}
      <boxGeometry args={[3, 3, 3]} />
      {/* Material with texture */}
      <meshStandardMaterial map={new TextureLoader().load(textureUrl)} />
    </mesh>
  );
};

export default function ViewCanvas({ textureUrl }: Props) {
  return (
    <Canvas>
      {/* Orbit controls for interactivity */}
      <OrbitControls />
      {/* Rotating Cube */}
      <RotatingCube textureUrl={textureUrl} />
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </Canvas>
  );
}
