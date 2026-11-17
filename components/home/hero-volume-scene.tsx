"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import type { MotionValue } from "motion/react";

interface SceneProps {
  progress: MotionValue<number>;
  reduced: boolean;
  active: boolean;
  onReady: () => void;
}

// Glass knot that the scroll turns and carries from right to left.
// Damped toward its target every frame, so a fast flick never snaps it.
function Knot({ progress, reduced }: Pick<SceneProps, "progress" | "reduced">) {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport, pointer, size } = useThree();
  // Layout switch in CSS pixels: viewport units depend on the aspect ratio.
  const wide = size.width >= 1024;

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const p = progress.get();
    const idle = reduced ? 0 : state.clock.elapsedTime * 0.12;
    const px = reduced ? 0 : pointer.x;
    const py = reduced ? 0 : pointer.y;

    const targetX = wide ? THREE.MathUtils.lerp(viewport.width * 0.2, -viewport.width * 0.2, p) : 0;
    const targetY = wide ? 0 : THREE.MathUtils.lerp(0.9, 0.2, p);
    mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetX, 5, delta);
    mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, 5, delta);
    mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, idle + p * Math.PI * 1.25 + px * 0.25, 5, delta);
    mesh.rotation.x = THREE.MathUtils.damp(mesh.rotation.x, 0.35 + p * 0.9 - py * 0.2, 5, delta);
    const scale = (wide ? 0.82 : 0.6) * THREE.MathUtils.lerp(1, 0.85, p);
    mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, scale, 5, delta));
  });

  return (
    <mesh ref={ref} position={[wide ? viewport.width * 0.2 : 0, wide ? 0 : 0.9, 0]}>
      <torusKnotGeometry args={[1, 0.34, 220, 36]} />
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
        distortion={0.2}
        distortionScale={0.4}
        temporalDistortion={0}
        color="#cfd4fb"
      />
    </mesh>
  );
}

export default function VolumeScene({ progress, reduced, active, onReady }: SceneProps) {
  return (
    <Canvas
      // Stop rendering entirely once the hero is off screen.
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={onReady}
    >
      <Knot progress={progress} reduced={reduced} />
      {/* Studio light built from shapes: no HDR file to download. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#8f99ed" position={[-4, 2, -3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[4, -1, 2]} scale={[4, 4, 1]} />
        <Lightformer form="ring" intensity={4} color="#b8bff5" position={[0, 3, -6]} scale={3} />
      </Environment>
    </Canvas>
  );
}
