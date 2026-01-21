"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- Helper Functions ---

/**
 * Generate irregular galaxy/nebula points
 * Creates a warped disk/spiral shape
 */
function generateGalaxyPoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Random angle
    const angle = Math.random() * Math.PI * 2;
    
    // Distance from center with some irregularity
    // Mix of uniform distribution and gaussian-like concentration
    const r = radius * (Math.random() * 0.5 + 0.5) + (Math.random() - 0.5) * 2;
    
    // Warping logic to make it "irregular" and "organic"
    // Add sine waves to the radius based on angle
    const warp = Math.sin(angle * 3) * 1.5 + Math.cos(angle * 5) * 0.5;
    
    const x = (r + warp) * Math.cos(angle);
    const y = (r + warp) * Math.sin(angle) * 0.8; // Flatten slightly
    // Add some thickness in Z
    const z = (Math.random() - 0.5) * (r * 0.4);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  
  return positions;
}

/**
 * Generate deep space background stars
 */
function generateDeepSpacePoints(count: number, range: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * range;
        positions[i * 3 + 1] = (Math.random() - 0.5) * range;
        positions[i * 3 + 2] = (Math.random() - 0.5) * range;
    }
    return positions;
}


// --- Components ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WarpedGalaxy({ count = 8000, radius = 12 }: { count?: number; radius?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  
  // Generate data once
  const posArray = useMemo(() => generateGalaxyPoints(count, radius), [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Rotate the entire galaxy slowly
    pointsRef.current.rotation.z += 0.001;
    // Slight wobble
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    pointsRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[posArray, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#24D6FF" // Cyan Tech Color
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NebulaMist({ count = 4000, radius = 15 }: { count?: number; radius?: number }) {
    const pointsRef = useRef<THREE.Points>(null!);
    
    // Wider, more scattered points for "mist" effect
    const posArray = useMemo(() => generateGalaxyPoints(count, radius * 1.2), [count, radius]);
  
    useFrame(() => {
      if (!pointsRef.current) return;
      // Rotate opposite direction slowly
      pointsRef.current.rotation.z -= 0.0005;
    });
  
    return (
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            args={[posArray, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#9B5BFF" // Purple Mist
          size={0.15} // Larger, softer points
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.3}
        />
      </Points>
    );
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DeepSpaceStars({ count = 5000, range = 100 }: { count?: number; range?: number }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const posArray = useMemo(() => generateDeepSpacePoints(count, range), [count, range]);

    useFrame(() => {
        if (!pointsRef.current) return;
        // Very slow drift
        pointsRef.current.rotation.y += 0.0002;
    });

    return (
        <Points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    args={[posArray, 3]}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}


// --- Main Component ---

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none" 
         style={{ 
           background: '#05070a', // Darker, cleaner background
         }}>
      
      {/* 
        Full page particle system 
        Added 'blur' filter to container for that "dreamy/soft" look user asked for (虚化)
      */}
      <div className="absolute inset-0" style={{ filter: 'blur(0.5px)' }}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45 }} // Wide angle
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: false }}
        >
          <color attach="background" args={["#05070a"]} />
          
          <group rotation={[0, 0, Math.PI / 4]}> {/* Tilt the whole galaxy system */}
            <WarpedGalaxy count={6000} radius={10} />
            <NebulaMist count={3000} radius={12} />
          </group>
          
          <DeepSpaceStars count={4000} range={80} />
          
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>
      
      {/* 
        Vignette & Gradient Overlay 
        Helps text readability and focuses center
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#05070a_90%)] opacity-80" />
    </div>
  );
}
