import type { ReactNode } from "react";
import type { Design } from "../types";
import { designVars, fontHref } from "./tokens";

// Variables go on :root so portaled content (Dialog, Sheet) gets the theme too.
export function ThemeRoot({ design, children }: { design?: Design | null; children: ReactNode }) {
  const css = `:root{${Object.entries(designVars(design))
    .map(([name, value]) => `${name}:${value.replace(/[<>{};]/g, "")}`)
    .join(";")}}`;
  const href = fontHref(design);
  return (
    <>
      {href && <link rel="stylesheet" href={href} precedence="default" />}
      <style>{css}</style>
      <div className="ez-root">{children}</div>
    </>
  );
}
