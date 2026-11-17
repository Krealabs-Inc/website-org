import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { DepthSequence } from "@/components/patterns/depth-sequence";
import { DepthStep } from "@/components/patterns/depth-step";

export interface MethodStep {
  title: string;
  description: string;
}

/** Home: the method as a journey in depth through the four steps. */
export function MethodDepth({ steps }: { steps: MethodStep[] }) {
  return (
    <DepthSequence
      heading={
        <>
          <span className="mb-6 flex justify-center">
            <Eyebrow>Votre projet, étape par étape</Eyebrow>
          </span>
          <h2 className="text-display">
            Vous savez toujours
            <br />
            <em className="text-[var(--accent)]">où l’on en est.</em>
          </h2>
        </>
      }
    >
      {steps.map((step, i) => (
        <DepthStep key={step.title} index={i + 1} total={steps.length} title={step.title}>
          <p>{step.description}</p>
          {i === steps.length - 1 && (
            <Link href="/expertise" className="home-text-link mt-8">
              Comment se passe votre projet
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </DepthStep>
      ))}
    </DepthSequence>
  );
}
