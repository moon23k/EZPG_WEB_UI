import type { CSSProperties, ReactNode } from "react";
import type { Design } from "../types";
import { designVars } from "./tokens";

export function ThemeRoot({ design, children }: { design?: Design | null; children: ReactNode }) {
  return (
    <div className="ez-root" style={designVars(design) as CSSProperties}>
      {children}
    </div>
  );
}
