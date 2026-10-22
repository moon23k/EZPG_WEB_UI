import type { SectionProps } from "../../renderer/registry";

type Strength = { title: string; body: string };

export function BrandStory({ data }: SectionProps) {
  const body = (data.body as string[] | undefined) ?? [];
  const strengths = (data.strengths as Strength[] | undefined) ?? [];
  if (!data.title && !body.length) return null;
  return (
    <section className="ez-story">
      {typeof data.title === "string" && <h2>{data.title}</h2>}
      {body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {strengths.length > 0 && (
        <ul className="ez-story__strengths">
          {strengths.map((s) => (
            <li key={s.title}>
              <strong>{s.title}</strong>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
