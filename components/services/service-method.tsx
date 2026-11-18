import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { DepthSequence } from "@/components/patterns/depth-sequence";
import { DepthStep } from "@/components/patterns/depth-step";

interface ServiceMethodProps {
  eyebrow?: string;
  number?: string;
  /** Titre avec balises <em> autorisées */
  title: ReactNode;
  intro?: ReactNode;
  steps: { title: string; description: string }[];
}

/** A service's method as a journey in depth through its steps (Profondeur). */
export function ServiceMethod({ eyebrow = "Méthode", number = "02", title, intro, steps }: ServiceMethodProps) {
  return (
    <DepthSequence
      heading={
        <>
          <span className="mb-6 flex justify-center">
            <Eyebrow number={number}>{eyebrow}</Eyebrow>
          </span>
          <h2 className="text-h1">{title}</h2>
          {intro && (
            <div className="text-body-lg text-[var(--muted-foreground)] mx-auto mt-6 max-w-xl space-y-4">{intro}</div>
          )}
        </>
      }
    >
      {steps.map((step, i) => (
        <DepthStep key={step.title} index={i + 1} total={steps.length} title={step.title}>
          <p>{step.description}</p>
        </DepthStep>
      ))}
    </DepthSequence>
  );
}
