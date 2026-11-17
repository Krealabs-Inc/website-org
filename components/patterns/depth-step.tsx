import type { ReactNode } from "react";

/**
 * One step of a DepthSequence. Its size comes from CSS: large on a depth
 * plane, compact in the reduced-motion list (globals.css, "Depth steps").
 */
export function DepthStep({
  index,
  total,
  title,
  children,
}: {
  index: number;
  total: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <span className="depth-step-number">
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <h3 className="depth-step-title">{title}</h3>
      <div className="depth-step-text">{children}</div>
    </>
  );
}
