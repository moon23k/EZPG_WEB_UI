import type { ReactNode } from "react";
import type { TemplateDesign } from "../templates/types";
import type { Design } from "../types";
import { applyTemplate, designVars, fontHref } from "./tokens";

// Variables go on :root so portaled content (Dialog, Sheet) gets the theme too.
export function ThemeRoot({
  design: brand,
  template,
  children,
}: {
  design?: Design | null;
  template?: TemplateDesign | null;
  children: ReactNode;
}) {
  const design = applyTemplate(brand, template);
  const css = `:root{${Object.entries(designVars(design))
    .map(([name, value]) => `${name}:${value.replace(/[<>{};]/g, "")}`)
    .join(";")}}`;
  const href = fontHref(design);
  return (
    <>
      {href && <link rel="stylesheet" href={href} precedence="default" />}
      <style>{css}</style>
      <div className="ez-root" data-template={template?.id}>{children}</div>
    </>
  );
}
