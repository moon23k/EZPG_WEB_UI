import type { SectionProps } from "../../renderer/registry";
import { cn } from "../../utils/cn";

export function BrandStory({ data, variant }: SectionProps<"story">) {
  const body = data.body ?? [];
  const strengths = data.strengths ?? [];
  if (!data.title && !body.length) return null;
  return (
    <section data-slot="story" data-variant={variant} className={cn("ez:grid ez:gap-6 ez:text-fg", variant === "band" && "ez:justify-items-center ez:py-8 ez:text-center")}>
      <div className="ez:grid ez:max-w-170 ez:gap-3">
        {variant === "band" && <span className="ez:text-site-note ez:text-muted">Story</span>}
        {data.title && <h2 className="ez:m-0 ez:text-site-section">{data.title}</h2>}
        {body.map((p) => (
          <p key={p} className="ez:m-0">
            {p}
          </p>
        ))}
      </div>
      {strengths.length > 0 && (
        <ul className="ez:m-0 ez:grid ez:list-none ez:gap-gutter ez:p-0 ez:md:grid-cols-3">
          {strengths.map((s) => (
            <li key={s.title} className="ez:grid ez:content-start ez:gap-1.5 ez:rounded-md ez:bg-surface-alt ez:p-5">
              <strong className="ez:font-semibold">{s.title}</strong>
              <p className="ez:m-0 ez:text-site-note ez:text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
