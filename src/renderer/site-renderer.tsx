import type { ComponentType } from "react";
import type { Section } from "../types";
import { sections, type SectionProps, type SiteContext } from "./registry";

const isKind = (kind: string): kind is keyof typeof sections => kind in sections;

// The product grid shows the category chips itself, so a separate category menu is skipped on pages that have one.
export function SiteRenderer({ page, context }: { page: { sections: Section[] }; context: SiteContext }) {
  const hasGrid = context.products.length > 0 && page.sections.some((s) => s.kind === "product_grid");
  return (
    <div data-slot="site-renderer" className="ez:grid ez:gap-section">
      {page.sections.map((section, i) => {
        if (section.when && !context.flags[section.when]) return null;
        if (!isKind(section.kind)) return null;
        if (section.kind === "category_menu" && hasGrid) return null;
        const Component = sections[section.kind] as ComponentType<SectionProps>;
        return <Component key={`${section.kind}-${i}`} data={section.data ?? {}} context={context} />;
      })}
    </div>
  );
}
