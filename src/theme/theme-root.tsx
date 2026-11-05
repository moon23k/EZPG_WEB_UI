import type { ReactNode } from "react";
import type { TemplateDesign } from "../templates/types";
import type { Design } from "../types";
import { applyTemplate, designVars, fontHref } from "./tokens";

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
      {href && <FontSheet href={href} />}
      <style>{css}</style>
      <div className="ez-root" data-template={template?.id}>{children}</div>
    </>
  );
}

function FontSheet({ href }: { href: string }) {
  const load = `(function(){var l=document.createElement("link");l.rel="stylesheet";l.media="print";l.onload=function(){l.media="all"};l.href=${JSON.stringify(href).replace(/</g, "\\u003c")};document.head.appendChild(l)})()`;
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <script dangerouslySetInnerHTML={{ __html: load }} />
      <noscript>
        <link rel="stylesheet" href={href} />
      </noscript>
    </>
  );
}
