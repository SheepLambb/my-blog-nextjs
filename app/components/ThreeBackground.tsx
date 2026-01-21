"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- Helper Functions ---

/**
 * Generate irregular galaxy/nebula points with Gradient Colors
 * Creates a warped disk/spiral shape with tech-style gradient
 */
function generateGradientGalaxyPoints(count: number, radius: number, colors: { inside: string, outside: string }) {
  const positions = new Float32Array(count * 3);
  const colorArray = new Float32Array(count * 3);
  
  const colorInside = new THREE.Color(colors.inside);
  const colorOutside = new THREE.Color(colors.outside);
  const tempColor = new THREE.Color();

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

    // Color Gradient Logic based on radius (normalized)
    // Normalize r roughly between 0 and radius*1.5
    const t = Math.min(1, Math.max(0, (r - radius * 0.2) / (radius * 1.2)));
    
    // Lerp color
    tempColor.copy(colorInside).lerp(colorOutside, t);
    
    // Add some random variation to color lightness
    tempColor.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);

    colorArray[i * 3] = tempColor.r;
    colorArray[i * 3 + 1] = tempColor.g;
    colorArray[i * 3 + 2] = tempColor.b;
  }
  
  return { positions, colors: colorArray };
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
  
  // Generate data once with Tech Gradient (Cyan -> Purple)
  const { positions, colors } = useMemo(() => generateGradientGalaxyPoints(count, radius, {
      inside: "#00f3ff", // Bright Cyan
      outside: "#bc00dd" // Deep Neon Purple
  }), [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Rotate the entire galaxy slowly
    pointsRef.current.rotation.z += 0.0008;
    // Slight wobble
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors // Enable vertex colors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NebulaMist({ count = 4000, radius = 15 }: { count?: number; radius?: number }) {
    const pointsRef = useRef<THREE.Points>(null!);
    
    // Wider, more scattered points for "mist" effect with softer gradient
    const { positions, colors } = useMemo(() => generateGradientGalaxyPoints(count, radius * 1.2, {
        inside: "#4facfe", // Light Blue
        outside: "#00f2fe" // Cyan
    }), [count, radius]);
  
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
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          vertexColors
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

// Interaction Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InteractiveCameraRig({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null!);
    
    useFrame((state) => {
        if (!group.current) return;
        
        // Smooth mouse parallax
        // state.pointer.x/y are normalized (-1 to 1)
        const targetX = state.pointer.x * 0.2; // Max rotation X
        const targetY = state.pointer.y * 0.2; // Max rotation Y
        
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
    });

    return <group ref={group}>{children}</group>;
}


// --- Main Component ---

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none" 
         style={{ 
           background: '#030508', // Even deeper, tech-black
         }}>
      
      {/* 
        Full page particle system 
      */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 18], fov: 35 }} // Narrower FOV for more cinematic look
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: false }}
        >
          <color attach="background" args={["#030508"]} />
          
          <InteractiveCameraRig>
            <group rotation={[0, 0, Math.PI / 4]}> {/* Tilt the whole galaxy system */}
                <WarpedGalaxy count={7000} radius={10} />
                <NebulaMist count={3000} radius={14} />
            </group>
          </InteractiveCameraRig>
          
          <DeepSpaceStars count={4000} range={80} />
          
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>
      
      {/* 
        Vignette & Gradient Overlay 
        Enhanced for tech feel
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030508_95%)] opacity-90" />
      
      {/* Subtle Scanline or Mesh Overlay for Tech feel (Optional) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />
    </div>
  );
}
