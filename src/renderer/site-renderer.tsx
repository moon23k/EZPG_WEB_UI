import type { ComponentType } from "react";
import type { TemplateDesign } from "../templates/types";
import type { Section } from "../types";
import { sections, type SectionProps, type SiteContext } from "./registry";

const isKind = (kind: string): kind is keyof typeof sections => kind in sections;

const KEEP = new Set(["free_shipping_bar", "maker_profile"]);

type Placed = Section & { variant?: string; grid?: TemplateDesign["home"][number]["grid"] };

function place(sections: Section[], template: TemplateDesign | null | undefined, arranged = false): Placed[] {
  if (!template) return sections;
  if (arranged) {
    const slots = new Map(template.home.map((slot) => [slot.kind, slot]));
    return sections.flatMap((s) => {
      const slot = slots.get(s.kind);
      if (slot) return [{ ...s, variant: slot.variant, grid: slot.grid }];
      return KEEP.has(s.kind) ? [s] : [];
    });
  }
  const byKind = new Map(sections.map((s) => [s.kind, s]));
  const placed: Placed[] = template.home.flatMap((slot) => {
    const section = byKind.get(slot.kind) ?? (slot.kind === "faq" || slot.kind === "category_menu" ? { kind: slot.kind, data: {} } : null);
    return section ? [{ ...section, variant: slot.variant, grid: slot.grid }] : [];
  });
  const used = new Set(template.home.map((s) => s.kind));
  return [...placed, ...sections.filter((s) => !used.has(s.kind) && KEEP.has(s.kind))];
}

// The product grid shows the category chips itself, so a separate category menu is skipped on pages that have one.
export function SiteRenderer({
  page,
  context,
  template,
}: {
  page: { sections: Section[]; arranged?: boolean };
  context: SiteContext;
  template?: TemplateDesign | null;
}) {
  const hasGrid = !template && context.products.length > 0 && page.sections.some((s) => s.kind === "product_grid");
  const placed = place(page.sections, template, page.arranged);
  return (
    <div data-slot="site-renderer" data-template={template?.id} className="ez:grid ez:gap-section">
      {placed.map((section, i) => {
        if (section.when && !context.flags[section.when]) return null;
        if (!isKind(section.kind)) return null;
        if (section.kind === "category_menu" && hasGrid) return null;
        const Component = sections[section.kind] as ComponentType<SectionProps>;
        return <Component key={`${section.kind}-${i}`} data={section.data ?? {}} context={context} variant={section.variant} grid={section.grid} />;
      })}
    </div>
  );
}
