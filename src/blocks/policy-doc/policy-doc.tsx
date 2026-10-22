export function PolicyDoc({ title, sections }: { title: string; sections: { heading: string; text: string }[] }) {
  return (
    <article className="ez-policy">
      <h1>{title}</h1>
      {sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          <p>{s.text}</p>
        </section>
      ))}
    </article>
  );
}
