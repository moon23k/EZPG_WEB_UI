import { ButtonLink } from "../../components/button";
import type { SectionProps } from "../../renderer/registry";
import { cn } from "../../utils/cn";
import { Block, Cols, Pic, Rows, Steps, Title } from "../kit";

export function NoticeBar({ data }: SectionProps<"notice_bar">) {
  if (!data.text) return null;
  return (
    <p data-slot="notice-bar" className="ez:m-0 ez:bg-primary ez:px-page ez:py-2 ez:text-center ez:text-site-note ez:text-on-primary">
      {data.text}
    </p>
  );
}

export function Intro({ data, lead }: SectionProps<"intro">) {
  if (!data.title) return null;
  return (
    <Block slot="intro" className={cn("ez:justify-items-center ez:text-center", lead && "ez:py-16")}>
      <h2 className={cn("ez:m-0 ez:max-w-2xl ez:text-balance", lead ? "ez:text-site-page-sm ez:md:text-site-page" : "ez:text-site-section")}>{data.title}</h2>
      {data.body && <p className="ez:m-0 ez:max-w-xl ez:text-muted">{data.body}</p>}
      {data.button && <ButtonLink href={data.href ?? "/products"}>{data.button}</ButtonLink>}
    </Block>
  );
}

export function PhotoBand({ data }: SectionProps<"photo_band">) {
  if (!data.image && !data.title) return null;
  return (
    <section data-slot="photo-band" className="ez:relative ez:grid ez:place-items-center ez:overflow-hidden ez:rounded-lg ez:text-center">
      <Pic src={data.image} ratio={2.4} tone={1} strong iconClassName="ez:-translate-y-11" />
      <div aria-hidden="true" className="ez:absolute ez:inset-0 ez:bg-[rgb(0_0_0/var(--ezd-overlay))]" />
      {data.title && (
        <p className="ez:absolute ez:m-0 ez:px-page ez:text-site-item ez:text-on-primary ez:drop-shadow">{data.title}</p>
      )}
    </section>
  );
}

export function Testimonial({ data }: SectionProps<"testimonial">) {
  if (!data.quote) return null;
  return (
    <figure data-slot="testimonial" className="ez:m-0 ez:grid ez:gap-3 ez:rounded-md ez:bg-surface-alt ez:p-6 ez:text-fg">
      <blockquote className="ez:m-0 ez:text-site-item">“{data.quote}”</blockquote>
      {data.name && <figcaption className="ez:text-site-note ez:text-muted">{data.name}</figcaption>}
    </figure>
  );
}

const stars = (n: number) => "★★★★★".slice(0, Math.round(n)).padEnd(5, "☆");

export function Reviews({ data }: SectionProps<"reviews">) {
  const items = data.items ?? [];
  if (!items.length) return null;
  return (
    <Block slot="reviews">
      <Title aside={data.average ? <span className="ez:text-site-note ez:text-muted">{`${data.average.toFixed(1)} · ${data.count ?? items.length}`}</span> : null}>
        후기
      </Title>
      <Cols m={1} pc={3}>
        {items.slice(0, 3).map((r) => (
          <article key={`${r.name}-${r.body}`} className="ez:grid ez:content-start ez:gap-1.5 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:pb-4">
            <span aria-label={`별점 ${r.rating}`} className="ez:text-primary">
              {stars(r.rating)}
            </span>
            <p className="ez:m-0">{r.body}</p>
            <span className="ez:text-site-note ez:text-muted">{[r.name, r.date].filter(Boolean).join(" · ")}</span>
          </article>
        ))}
      </Cols>
    </Block>
  );
}

export function TrustLine({ data }: SectionProps<"trust_line">) {
  const items = data.items ?? [];
  if (!items.length) return null;
  return (
    <ul data-slot="trust-line" className="ez:m-0 ez:flex ez:list-none ez:flex-wrap ez:gap-x-4 ez:gap-y-1 ez:p-0 ez:font-semibold ez:text-fg">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function ProcessSteps({ data }: SectionProps<"process_steps">) {
  const steps = data.steps ?? [];
  if (!steps.length) return null;
  return (
    <Block slot="process-steps">
      <Title>{data.title ?? "진행 순서"}</Title>
      <Steps steps={steps} />
    </Block>
  );
}

export function Numbers({ data }: SectionProps<"numbers">) {
  const items = data.items ?? [];
  if (!items.length) return null;
  return (
    <dl data-slot="numbers" className="ez:m-0 ez:grid ez:grid-cols-3 ez:gap-2 ez:rounded-md ez:bg-surface-alt ez:p-6 ez:text-center ez:text-fg">
      {items.map((n) => (
        <div key={n.label} className="ez:grid ez:gap-1">
          <dt className="ez:order-2 ez:text-site-note ez:text-muted">{n.label}</dt>
          <dd className="ez:order-1 ez:m-0 ez:text-site-item">{n.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Gallery({ data }: SectionProps<"gallery">) {
  const images = data.images ?? [];
  if (!images.length) return null;
  return (
    <section data-slot="gallery" className="ez:grid ez:grid-cols-3 ez:gap-2">
      {images.slice(0, 6).map((src, i) => (
        <Pic key={i} src={src} ratio={1.5} tone={i} />
      ))}
    </section>
  );
}

export function Location({ data }: SectionProps<"location">) {
  if (!data.address) return null;
  return (
    <Block slot="location">
      <Title>오시는 길</Title>
      <Rows rows={[{ label: "주소", value: data.address }, ...(data.note ? [{ label: "안내", value: data.note }] : [])]} />
      {data.href && (
        <ButtonLink href={data.href} variant="outline">
          지도 보기
        </ButtonLink>
      )}
    </Block>
  );
}

export function PayPlan({ data }: SectionProps<"pay_plan">) {
  const rows = data.rows ?? [];
  if (!rows.length) return null;
  return (
    <Block slot="pay-plan">
      <Title>{data.title ?? "결제 일정 · 취소 규정"}</Title>
      <Rows rows={rows} />
    </Block>
  );
}
