import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { rich } from "@/components/ui/rich";
import { DepthSequence } from "@/components/patterns/depth-sequence";
import { DepthStep } from "@/components/patterns/depth-step";

export interface MethodStep {
  title: string;
  description: string;
}

/** Home: the method as a journey in depth through the four steps. */
export function MethodDepth({ steps, eyebrow, title }: { steps: MethodStep[]; eyebrow: string; title: string }) {
  return (
    <DepthSequence
      heading={
        <>
          <span className="mb-6 flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </span>
          <h2 className="text-display">{rich(title, "text-[var(--accent)]")}</h2>
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
