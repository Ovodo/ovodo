"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Mesh, TextureLoader } from "three";

type Props = { textureUrl: string; index: number };

// RotatingSphere Component
const RotatingSphere = ({ textureUrl, index }: Props) => {
  const sphereRef = useRef<Mesh>(null);

  // Rotate the sphere slightly left and right
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      const time = clock.getElapsedTime() + index; // Offset by index for domino effect
      sphereRef.current.rotation.y = Math.sin(time) * 1.7; // Oscillate around the Y-axis
    }
  });

  return (
    <mesh ref={sphereRef}>
      {/* Sphere Geometry */}
      <sphereGeometry args={[3, 32, 32]} />
      {/* Material with texture */}
      <meshStandardMaterial map={new TextureLoader().load(textureUrl)} />
    </mesh>
  );
};

export default function ViewCanvas({ textureUrl, index }: Props) {
  return (
    <Canvas>
      {/* Orbit controls for interactivity */}
      <OrbitControls />
      {/* Rotating Sphere */}
      <RotatingSphere index={index} textureUrl={textureUrl} />
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </Canvas>
  );
}
