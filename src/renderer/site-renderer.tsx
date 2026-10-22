import type { Section } from "../types";
import { sections, type SiteContext } from "./registry";

export function SiteRenderer({ page, context }: { page: { sections: Section[] }; context: SiteContext }) {
  return (
    <>
      {page.sections.map((section, i) => {
        if (section.when && !context.flags[section.when]) return null;
        const Component = sections[section.kind];
        return Component ? <Component key={`${section.kind}-${i}`} data={section.data ?? {}} context={context} /> : null;
      })}
    </>
  );
}
