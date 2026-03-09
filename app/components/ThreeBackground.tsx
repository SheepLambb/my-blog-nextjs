"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- Helper Functions ---

/**
 * Generate irregular galaxy/nebula points with Gradient Colors
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
    const r = radius * (Math.random() * 0.5 + 0.5) + (Math.random() - 0.5) * 2;
    
    // Warping logic
    const warp = Math.sin(angle * 3) * 1.5 + Math.cos(angle * 5) * 0.5;
    
    const x = (r + warp) * Math.cos(angle);
    const y = (r + warp) * Math.sin(angle) * 0.8;
    const z = (Math.random() - 0.5) * (r * 0.4);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Color Gradient Logic
    const t = Math.min(1, Math.max(0, (r - radius * 0.2) / (radius * 1.2)));
    
    tempColor.copy(colorInside).lerp(colorOutside, t);
    tempColor.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);

    colorArray[i * 3] = tempColor.r;
    colorArray[i * 3 + 1] = tempColor.g;
    colorArray[i * 3 + 2] = tempColor.b;
  }
  
  return { positions, colors: colorArray };
}

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

function WarpedGalaxy({ count = 8000, radius = 12, isDark = true }: { count?: number; radius?: number, isDark?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  
  // Tech Gradient: Dark Mode (Cyan -> Purple), Light Mode (Deep Blue -> Violet)
  const colors = useMemo(() => (
    isDark 
      ? { inside: "#00f3ff", outside: "#bc00dd" }
      : { inside: "#0052D4", outside: "#65C7F7" }
  ), [isDark]);

  const { positions, colors: colorArr } = useMemo(() => generateGradientGalaxyPoints(count, radius, colors), [count, radius, colors]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.z += 0.0008;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" count={count} args={[colorArr, 3]} />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={isDark ? 0.8 : 0.6}
      />
    </Points>
  );
}

function NebulaMist({ count = 4000, radius = 15, isDark = true }: { count?: number; radius?: number, isDark?: boolean }) {
    const pointsRef = useRef<THREE.Points>(null!);
    
    // Mist Colors: Dark Mode (Light Blue -> Cyan), Light Mode (Slate -> Blue)
    const colors = useMemo(() => (
      isDark 
        ? { inside: "#4facfe", outside: "#00f2fe" }
        : { inside: "#606c88", outside: "#3f4c6b" }
    ), [isDark]);

    const { positions, colors: colorArr } = useMemo(() => generateGradientGalaxyPoints(count, radius * 1.2, colors), [count, radius, colors]);
  
    useFrame(() => {
      if (!pointsRef.current) return;
      pointsRef.current.rotation.z -= 0.0005;
    });
  
    return (
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" count={count} args={[colorArr, 3]} />
        </bufferGeometry>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.3}
        />
      </Points>
    );
  }

function FallingStars({ count = 2000, range = 80, isDark = true }: { count?: number; range?: number, isDark?: boolean }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const posArray = useMemo(() => generateDeepSpacePoints(count, range), [count, range]);
    
    // Speeds
    const speeds = useMemo(() => {
        const arr = new Float32Array(count);
        for(let i=0; i<count; i++) arr[i] = 0.02 + Math.random() * 0.05;
        return arr;
    }, [count]);

    useFrame(() => {
        if (!pointsRef.current) return;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        for(let i=0; i<count; i++) {
            positions[i*3 + 1] -= speeds[i];
            if (positions[i*3 + 1] < -range/2) {
                positions[i*3 + 1] = range/2;
                positions[i*3] = (Math.random() - 0.5) * range;
                positions[i*3 + 2] = (Math.random() - 0.5) * range;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} args={[posArray, 3]} />
            </bufferGeometry>
            <PointMaterial
                transparent
                color={isDark ? "#a0c4ff" : "#1a2a6c"} // Light blue vs Dark Blue
                size={0.1}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={isDark ? 0.6 : 0.4}
            />
        </Points>
    );
}

function MeteorSystem({ count = 8, isDark = true }: { count?: number, isDark?: boolean }) {
    const lines = useMemo(() => new Array(count).fill(0).map(() => ({
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60,
        z: (Math.random() - 0.5) * 40,
        speed: 0.4 + Math.random() * 0.5,
        offset: Math.random() * 1000
    })), [count]);

    const group = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!group.current) return;
        group.current.children.forEach((mesh, i) => {
            const data = lines[i];
            const time = state.clock.elapsedTime * data.speed;
            mesh.position.x = 40 - ((time * 20 + data.offset) % 100); 
            mesh.position.y = 30 - ((time * 10 + data.offset) % 80);
        });
    });

    return (
        <group ref={group} rotation={[0, 0, Math.PI / 6]}>
             {lines.map((_, i) => (
                 <mesh key={i}>
                     <cylinderGeometry args={[0.02, 0.0, 6, 4]} />
                     <meshBasicMaterial 
                        color={isDark ? "#ffffff" : "#000000"} 
                        transparent 
                        opacity={isDark ? 0.6 : 0.3} 
                        blending={THREE.AdditiveBlending} 
                     />
                     <group rotation={[0, 0, Math.PI / 2]}></group>
                 </mesh>
             ))}
        </group>
    )
}

function InteractiveCameraRig({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null!);
    useFrame((state) => {
        if (!group.current) return;
        const targetX = state.pointer.x * 0.2;
        const targetY = state.pointer.y * 0.2;
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
    });
    return <group ref={group}>{children}</group>;
}

// --- Main Component ---

export default function ThreeBackground() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Initial check
    const checkTheme = () => {
      const t = document.documentElement.dataset.theme || "dark";
      setTheme(t);
    };
    checkTheme();

    // Observe attribute changes on html element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none" 
         style={{ 
           // Cyberpunk Deep Space Gradient (Dark) vs Clean Tech Gradient (Light)
           background: isDark 
             ? 'linear-gradient(to bottom, #02010a 0%, #040820 40%, #0d0c2d 100%)'
             : 'linear-gradient(to bottom, #f5f7fa 0%, #c3cfe2 100%)',
           transition: 'background 1s ease'
         }}>
      
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 18], fov: 35 }}
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: true }} // alpha true to let CSS bg show
        >
          <InteractiveCameraRig>
            <group rotation={[0, 0, Math.PI / 4]}>
                <WarpedGalaxy count={7000} radius={10} isDark={isDark} />
                <NebulaMist count={3000} radius={14} isDark={isDark} />
            </group>
          </InteractiveCameraRig>
          
          <FallingStars count={2000} range={60} isDark={isDark} />
          <MeteorSystem count={12} isDark={isDark} />
          
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>
      
      {/* Vignette Overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
            background: isDark 
                ? 'radial-gradient(circle at center,transparent 0%,#000000 100%)' 
                : 'radial-gradient(circle at center,transparent 0%,#ffffff 100%)',
            opacity: isDark ? 0.7 : 0.4
        }} 
      />
      
      {/* Scanline Overlay (Less visible in light mode) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
               background: "linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))",
               backgroundSize: "100% 2px, 3px 100%",
               mixBlendMode: isDark ? 'normal' : 'multiply'
           }} 
      />
    </div>
  );
}
