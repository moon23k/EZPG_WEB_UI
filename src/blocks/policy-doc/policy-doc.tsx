export function PolicyDoc({ title, sections }: { title: string; sections: { heading: string; text: string }[] }) {
  return (
    <article data-slot="policy-doc" className="ez:grid ez:max-w-180 ez:gap-6 ez:text-fg">
      <h1 className="ez:m-0 ez:font-display ez:font-title ez:text-2xl">{title}</h1>
      {sections.map((s) => (
        <section key={s.heading} className="ez:grid ez:gap-2">
          <h2 className="ez:m-0 ez:text-lg ez:font-semibold">{s.heading}</h2>
          <p className="ez:m-0 ez:whitespace-pre-line ez:leading-relaxed">{s.text}</p>
        </section>
      ))}
    </article>
  );
}
