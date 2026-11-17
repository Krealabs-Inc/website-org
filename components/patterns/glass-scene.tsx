"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import type { MotionValue } from "motion/react";

/** One glass shape per page family, so each service has its own object. */
export type GlassShape = "knot" | "torus" | "icosahedron" | "phone" | "sphere" | "octahedron";

/**
 * travel: the object crosses the screen as the section scrolls (home hero).
 * aside: the object stays on the right and turns with scroll (inner pages).
 * center: the object stands centred under a centred headline and turns
 * toward the viewer as you scroll (mobile apps hero).
 */
export type GlassLayout = "travel" | "aside" | "center";

export interface GlassSceneProps {
  shape: GlassShape;
  layout: GlassLayout;
  progress: MotionValue<number>;
  reduced: boolean;
  active: boolean;
  onReady: () => void;
}

function Geometry({ shape }: { shape: GlassShape }) {
  switch (shape) {
    case "knot":
      return <torusKnotGeometry args={[1, 0.34, 220, 36]} />;
    case "torus":
      return <torusGeometry args={[1, 0.42, 64, 160]} />;
    case "icosahedron":
      return <icosahedronGeometry args={[1.3, 0]} />;
    case "sphere":
      return <sphereGeometry args={[1.25, 96, 96]} />;
    case "octahedron":
      return <octahedronGeometry args={[1.35, 0]} />;
    default:
      return null;
  }
}

function GlassObject({ shape, layout, progress, reduced }: Omit<GlassSceneProps, "active" | "onReady">) {
  const ref = useRef<THREE.Group>(null);
  const { viewport, pointer, size } = useThree();
  // Layout switch in CSS pixels: viewport units depend on the aspect ratio.
  const wide = size.width >= 1024;

  const start: [number, number, number] =
    layout === "travel"
      ? [wide ? viewport.width * 0.2 : 0, wide ? 0 : 0.9, 0]
      : layout === "center"
        ? [0, -1.35, 0]
        : [wide ? viewport.width * 0.24 : 0, wide ? 0 : 1, 0];

  // Damped toward its target every frame, so a fast flick never snaps it.
  useFrame((state, delta) => {
    const obj = ref.current;
    if (!obj) return;
    const p = progress.get();
    const idle = reduced ? 0 : state.clock.elapsedTime * 0.12;
    const px = reduced ? 0 : pointer.x;
    const py = reduced ? 0 : pointer.y;

    let x: number, y: number, scale: number;
    if (layout === "travel") {
      x = wide ? THREE.MathUtils.lerp(viewport.width * 0.2, -viewport.width * 0.2, p) : 0;
      y = wide ? 0 : THREE.MathUtils.lerp(0.9, 0.2, p);
      scale = (wide ? 0.82 : 0.6) * THREE.MathUtils.lerp(1, 0.85, p);
    } else if (layout === "center") {
      x = 0;
      y = -1.35 + p * 1.1;
      scale = (wide ? 0.78 : 0.6) * THREE.MathUtils.lerp(1, 1.1, p);
    } else {
      x = wide ? viewport.width * 0.24 : 0;
      y = (wide ? 0 : 1) + p * 0.8;
      scale = (wide ? 0.78 : 0.5) * THREE.MathUtils.lerp(1, 0.9, p);
    }

    obj.position.x = THREE.MathUtils.damp(obj.position.x, x, 5, delta);
    obj.position.y = THREE.MathUtils.damp(obj.position.y, y, 5, delta);
    // A flat face reflects almost nothing head-on: the centred phone is
    // shown three-quarters, then turns to face you as you scroll.
    const spinY = layout === "center" ? 0.6 + idle * 0.5 - p * 0.6 + px * 0.2 : idle + p * Math.PI * 1.25 + px * 0.25;
    const tiltX = layout === "center" ? 0.18 - p * 0.18 - py * 0.1 : 0.35 + p * 0.9 - py * 0.2;
    obj.rotation.y = THREE.MathUtils.damp(obj.rotation.y, spinY, 5, delta);
    obj.rotation.x = THREE.MathUtils.damp(obj.rotation.x, tiltX, 5, delta);
    obj.scale.setScalar(THREE.MathUtils.damp(obj.scale.x, scale, 5, delta));
  });

  const material = (
    <MeshTransmissionMaterial
      backside
      // Phones and small laptops get a cheaper glass pass.
      samples={wide ? 4 : 2}
      resolution={wide ? 256 : 128}
      transmission={1}
      thickness={0.7}
      roughness={0.12}
      ior={1.35}
      chromaticAberration={0.06}
      anisotropicBlur={0.1}
      distortion={shape === "sphere" ? 0.6 : 0.2}
      distortionScale={0.4}
      temporalDistortion={0}
      color="#cfd4fb"
    />
  );

  return (
    <group ref={ref} position={start}>
      {shape === "phone" ? (
        <RoundedBox args={[1.25, 2.4, 0.22]} radius={0.16} smoothness={6}>
          {material}
        </RoundedBox>
      ) : (
        <mesh>
          <Geometry shape={shape} />
          {material}
        </mesh>
      )}
    </group>
  );
}

export default function GlassScene({ active, onReady, ...object }: GlassSceneProps) {
  return (
    <Canvas
      // Stop rendering entirely once the section is off screen.
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={onReady}
      // Listen on the page, not the canvas: the canvas can then let clicks
      // through to the text in front of it and still follow the pointer.
      eventSource={document.body}
      eventPrefix="client"
    >
      <GlassObject {...object} />
      {/* Studio light built from shapes: no HDR file to download. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#8f99ed" position={[-4, 2, -3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[4, -1, 2]} scale={[4, 4, 1]} />
        <Lightformer form="ring" intensity={4} color="#b8bff5" position={[0, 3, -6]} scale={3} />
      </Environment>
    </Canvas>
  );
}
