import type { SectionProps } from "../../renderer/registry";

export function FaqSection({ context }: SectionProps) {
  if (!context.faqs.length) return null;
  return (
    <section className="ez-section ez-faq">
      <h2>자주 묻는 질문</h2>
      {context.faqs.map((f) => (
        <details key={f.id}>
          <summary>{f.question}</summary>
          <p>{f.answer}</p>
        </details>
      ))}
    </section>
  );
}
