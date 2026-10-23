import type { ComponentType } from "react";
import type { Section } from "../types";
import { sections, type SectionProps, type SiteContext } from "./registry";

const isKind = (kind: string): kind is keyof typeof sections => kind in sections;

export function SiteRenderer({ page, context }: { page: { sections: Section[] }; context: SiteContext }) {
  return (
    <div data-slot="site-renderer" className="ez:grid ez:gap-section">
      {page.sections.map((section, i) => {
        if (section.when && !context.flags[section.when]) return null;
        if (!isKind(section.kind)) return null;
        const Component = sections[section.kind] as ComponentType<SectionProps>;
        return <Component key={`${section.kind}-${i}`} data={section.data ?? {}} context={context} />;
      })}
    </div>
  );
}
