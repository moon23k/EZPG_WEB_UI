import type { SectionProps } from "../../renderer/registry";

export function FaqSection({ context }: SectionProps<"faq">) {
  if (!context.faqs.length) return null;
  return (
    <section data-slot="faq" className="ez:grid ez:max-w-180 ez:gap-2 ez:text-fg">
      <h2 className="ez:m-0 ez:font-display ez:font-title ez:text-2xl ez:tracking-brand">자주 묻는 질문</h2>
      <div>
        {context.faqs.map((f) => (
          <details key={f.id} className="ez:group ez:border-0 ez:border-b ez:border-solid ez:border-primary-border">
            <summary className="ez:flex ez:min-h-12 ez:cursor-pointer ez:list-none ez:items-center ez:justify-between ez:gap-3 ez:py-3 ez:font-semibold ez:[&::-webkit-details-marker]:hidden">
              {f.question}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="ez:shrink-0 ez:text-fg ez:transition-transform ez:group-open:rotate-180"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <p className="ez:m-0 ez:pb-4 ez:whitespace-pre-line ez:text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
