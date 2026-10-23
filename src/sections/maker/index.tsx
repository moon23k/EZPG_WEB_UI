import type { SectionProps } from "../../renderer/registry";

export function Maker({ data }: SectionProps<"maker_profile">) {
  if (!data.line) return null;
  return (
    <section data-slot="maker-profile" className="ez:border-0 ez:border-l-4 ez:border-solid ez:border-primary ez:pl-4">
      <p className="ez:m-0 ez:max-w-170 ez:text-lg ez:leading-relaxed ez:text-fg">{data.line}</p>
    </section>
  );
}
