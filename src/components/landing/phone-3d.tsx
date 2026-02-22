"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshTransmissionMaterial,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

// Custom rounded rect geometry
class RoundedRectGeometry extends THREE.BufferGeometry {
  constructor(width = 1, height = 1, radius = 0.1) {
    super();
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
    );
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    const geometry = new THREE.ShapeGeometry(shape);
    this.setAttribute("position", geometry.getAttribute("position"));
    this.setAttribute("uv", geometry.getAttribute("uv"));
    this.setIndex(geometry.getIndex());
  }
}

// Register the geometry with React Three Fiber
extend({ RoundedRectGeometry });

// Declare module augmentation for the custom geometry
declare module "@react-three/fiber" {
  interface ThreeElements {
    roundedRectGeometry: {
      args?: [number?, number?, number?];
      attach?: string;
    };
  }
}

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function Phone({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const phoneRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!phoneRef.current) return;

    // Smooth follow mouse with some delay
    const targetRotationY = mousePosition.x * 0.3;
    const targetRotationX = -mousePosition.y * 0.2;

    phoneRef.current.rotation.y = THREE.MathUtils.lerp(
      phoneRef.current.rotation.y,
      targetRotationY,
      0.05,
    );
    phoneRef.current.rotation.x = THREE.MathUtils.lerp(
      phoneRef.current.rotation.x,
      targetRotationX,
      0.05,
    );

    // Add subtle floating animation
    phoneRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // Screen glow animation
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity =
          0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={phoneRef}>
        {/* Phone Body */}
        <RoundedBox args={[2.2, 4.4, 0.25]} radius={0.15} smoothness={4}>
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.13]}>
          <roundedRectGeometry args={[2, 4.1, 0.1]} />
          <meshStandardMaterial
            color="#99E7F1"
            emissive="#1890FF"
            emissiveIntensity={0.3}
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>

        {/* Screen Content - AI Interface */}
        <group position={[0, 0, 0.14]}>
          {/* Top Status Bar */}
          <mesh position={[0, 1.8, 0]}>
            <planeGeometry args={[1.8, 0.15]} />
            <meshBasicMaterial color="#ffffff" opacity={0.9} transparent />
          </mesh>

          {/* AI Chat Bubbles */}
          <mesh position={[-0.3, 1.0, 0]}>
            <roundedRectGeometry args={[1.2, 0.35, 0.05]} />
            <meshBasicMaterial color="#ffffff" opacity={0.95} transparent />
          </mesh>
          <mesh position={[0.3, 0.5, 0]}>
            <roundedRectGeometry args={[1.0, 0.35, 0.05]} />
            <meshBasicMaterial color="#1890FF" />
          </mesh>
          <mesh position={[-0.2, 0, 0]}>
            <roundedRectGeometry args={[1.4, 0.35, 0.05]} />
            <meshBasicMaterial color="#ffffff" opacity={0.95} transparent />
          </mesh>

          {/* AI Processing Indicator */}
          <mesh position={[0, -0.6, 0]}>
            <ringGeometry args={[0.15, 0.2, 32]} />
            <meshBasicMaterial color="#FF6B00" />
          </mesh>

          {/* Bottom Nav */}
          <mesh position={[0, -1.7, 0]}>
            <planeGeometry args={[1.8, 0.3]} />
            <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />
          </mesh>
        </group>

        {/* Camera Notch */}
        <group position={[0, 1.95, 0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
            <meshStandardMaterial
              color="#333333"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Side Buttons */}
        <mesh position={[1.15, 0.5, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.1]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[1.15, -0.2, 0]}>
          <boxGeometry args={[0.05, 0.5, 0.1]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function AIParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  // Use useMemo to generate particle data once
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Use seeded random for deterministic values
      const theta = seededRandom(i * 3) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1);
      const radius = 3 + seededRandom(i * 3 + 2) * 4;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Colors - mix of brand colors
      const colorChoice = seededRandom(i * 7);
      if (colorChoice < 0.33) {
        // Blizzard Blue
        col[i * 3] = 0.6;
        col[i * 3 + 1] = 0.9;
        col[i * 3 + 2] = 0.95;
      } else if (colorChoice < 0.66) {
        // Info Blue
        col[i * 3] = 0.09;
        col[i * 3 + 1] = 0.56;
        col[i * 3 + 2] = 1;
      } else {
        // CTA Orange
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.42;
        col[i * 3 + 2] = 0;
      }
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    particlesRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  const positionAttr = useMemo(
    () => new THREE.BufferAttribute(positions, 3),
    [positions],
  );
  const colorAttr = useMemo(
    () => new THREE.BufferAttribute(colors, 3),
    [colors],
  );

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttr} />
        <primitive attach="attributes-color" object={colorAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function NeuralNetwork() {
  const linesRef = useRef<THREE.Group>(null);

  // Generate nodes with useMemo
  const nodes = useMemo(() => {
    const nodeCount = 20;
    const result: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      result.push(
        new THREE.Vector3(
          (seededRandom(i * 5) - 0.5) * 8,
          (seededRandom(i * 5 + 1) - 0.5) * 6,
          (seededRandom(i * 5 + 2) - 0.5) * 4 - 2,
        ),
      );
    }
    return result;
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={linesRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#1890FF" transparent opacity={0.6} />
        </mesh>
      ))}
      {nodes.map((node, i) =>
        nodes
          .slice(i + 1, i + 4)
          .map((target, j) => (
            <NetworkLine key={`${i}-${j}`} start={node} end={target} />
          )),
      )}
    </group>
  );
}

function NetworkLine({
  start,
  end,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
}) {
  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array([
      start.x,
      start.y,
      start.z,
      end.x,
      end.y,
      end.z,
    ]);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({
      color: "#99E7F1",
      transparent: true,
      opacity: 0.2,
    });
    return new THREE.Line(geometry, material);
  }, [start, end]);

  return <primitive object={line} />;
}

function GlowingOrb({
  position,
  color,
  size = 0.3,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) return;
    orbRef.current.scale.setScalar(
      size + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05,
    );
  });

  return (
    <mesh ref={orbRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        chromaticAberration={0.2}
        anisotropy={0.3}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.1}
        color={color}
        transmission={0.9}
      />
    </mesh>
  );
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      {/* Background is handled by the container div */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FF6B00" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#99E7F1"
      />

      <Phone mousePosition={mousePosition} />
      <AIParticles />
      <NeuralNetwork />

      {/* Glowing orbs */}
      <GlowingOrb position={[-3, 2, -2]} color="#99E7F1" size={0.4} />
      <GlowingOrb position={[3.5, -1, -1]} color="#1890FF" size={0.3} />
      <GlowingOrb position={[-2, -2, -3]} color="#FF6B00" size={0.25} />

      <Environment preset="city" />
    </>
  );
}

export function Phone3DScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePosition({ x, y });
  };

  return (
    <div className="relative">
      {/* Window Frame */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 backdrop-blur-sm">
        {/* Window Title Bar */}
        <div className="bg-gradient-to-r from-[#1890FF]/90 to-[#99E7F1]/90 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-white/20">
          {/* Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-green-400 shadow-inner" />
          </div>
          {/* Title */}
          <div className="flex-1 text-center">
            <span className="text-sm font-medium text-white/90 tracking-wide">
              Modern, Stylish - Comfy!
            </span>
          </div>
          {/* Spacer for symmetry */}
          <div className="w-14" />
        </div>

        {/* 3D Canvas Container */}
        <div
          className="h-[550px] w-full cursor-grab active:cursor-grabbing relative"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1929 100%)",
          }}
          onMouseMove={handleMouseMove}
        >
          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Gradient Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1890FF]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#99E7F1]/10 rounded-full blur-3xl pointer-events-none" />

          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <Scene mousePosition={mousePosition} />
          </Canvas>
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] px-4 py-2 flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/60">WebGL Active</span>
          </div>
          <span className="text-xs text-white/40">Powered by Three.js</span>
        </div>
      </div>
    </div>
  );
}
