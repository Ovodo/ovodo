"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Mesh, TextureLoader } from "three";

type Props = { textureUrl: string };

// RotatingSphere Component
const RotatingSphere = ({ textureUrl }: Props) => {
  const sphereRef = useRef<Mesh>(null);

  // Rotate the sphere automatically
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01; // Rotate around the Y-axis
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

export default function ViewCanvas({ textureUrl }: Props) {
  return (
    <Canvas>
      {/* Orbit controls for interactivity */}
      <OrbitControls />
      {/* Rotating Sphere */}
      <RotatingSphere textureUrl={textureUrl} />
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </Canvas>
  );
}
