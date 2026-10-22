import type { SectionProps } from "../../renderer/registry";

export function Maker({ data }: SectionProps) {
  if (typeof data.line !== "string") return null;
  return (
    <section className="ez-section ez-maker">
      <p>{data.line}</p>
    </section>
  );
}
