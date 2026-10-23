import type { SectionProps } from "../../renderer/registry";

export function FaqSection({ context }: SectionProps<"faq">) {
  if (!context.faqs.length) return null;
  return (
    <section data-slot="faq" className="ez:grid ez:gap-2 ez:text-fg">
      <h2 className="ez:m-0 ez:font-display ez:font-title ez:text-2xl ez:tracking-brand">자주 묻는 질문</h2>
      <div>
        {context.faqs.map((f) => (
          <details key={f.id} className="ez:group ez:border-0 ez:border-b ez:border-solid ez:border-primary-border">
            <summary className="ez:flex ez:min-h-12 ez:cursor-pointer ez:list-none ez:items-center ez:justify-between ez:gap-3 ez:py-3 ez:font-semibold ez:[&::-webkit-details-marker]:hidden">
              {f.question}
              <span aria-hidden="true" className="ez:text-muted ez:transition-transform ez:group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="ez:m-0 ez:pb-4 ez:whitespace-pre-line ez:text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
