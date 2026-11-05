import { ButtonLink } from "../../components/button";
import type { SectionProps } from "../../renderer/registry";
import { cn } from "../../utils/cn";
import { Bar, BlankButton, BlankStars, Block, Cols, Lines, Pic, Rows, Steps, Title } from "../kit";

export function NoticeBar({ data, blank }: SectionProps<"notice_bar">) {
  if (!data.text && !blank) return null;
  if (!data.text) {
    return (
      <div data-slot="notice-bar" data-blank="" className="ez:bg-primary ez:px-page ez:py-2 ez:text-center ez:text-site-note">
        <Bar size="long" strong />
      </div>
    );
  }
  return (
    <p data-slot="notice-bar" className="ez:m-0 ez:bg-primary ez:px-page ez:py-2 ez:text-center ez:text-site-note ez:text-on-primary">
      {data.text}
    </p>
  );
}

export function Intro({ data, lead, blank }: SectionProps<"intro">) {
  if (!data.title && !blank) return null;
  if (!data.title) {
    return (
      <Block slot="intro" blank className={cn("ez:justify-items-center ez:text-center", lead && "ez:py-16")}>
        <span className={lead ? "ez:font-display ez:text-site-page-sm ez:md:text-site-page" : "ez:font-display ez:text-site-section"}>
          <Bar size="long" />
        </span>
        <Lines className="ez:max-w-xl" />
      </Block>
    );
  }
  return (
    <Block slot="intro" className={cn("ez:justify-items-center ez:text-center", lead && "ez:py-16")}>
      <h2 className={cn("ez:m-0 ez:max-w-2xl ez:text-balance", lead ? "ez:font-display ez:text-site-page-sm ez:md:text-site-page" : "ez:font-display ez:text-site-section")}>{data.title}</h2>
      {data.body && <p className="ez:m-0 ez:max-w-xl ez:text-muted">{data.body}</p>}
      {data.button && <ButtonLink href={data.href ?? "/products"}>{data.button}</ButtonLink>}
    </Block>
  );
}

export function PhotoBand({ data, blank }: SectionProps<"photo_band">) {
  const empty = !data.image && !data.title;
  if (empty && !blank) return null;
  return (
    <section data-slot="photo-band" data-blank={empty ? "" : undefined} className="ez:relative ez:grid ez:place-items-center ez:overflow-hidden ez:rounded-lg ez:text-center">
      <Pic src={data.image} ratio={2.4} tone={1} strong iconClassName="ez:-translate-y-11" />
      <div aria-hidden="true" className="ez:absolute ez:inset-0 ez:bg-[rgb(0_0_0/var(--ezd-overlay))]" />
      {empty && (
        <span className="ez:absolute ez:font-display ez:text-site-item">
          <Bar strong />
        </span>
      )}
      {data.title && (
        <p className="ez:absolute ez:m-0 ez:px-page ez:font-display ez:text-site-item ez:text-on-primary ez:drop-shadow">{data.title}</p>
      )}
    </section>
  );
}

export function Testimonial({ data, blank }: SectionProps<"testimonial">) {
  if (!data.quote && !blank) return null;
  if (!data.quote) {
    return (
      <div data-slot="testimonial" data-blank="" className="ez:grid ez:gap-3 ez:rounded-md ez:bg-surface-alt ez:p-6">
        <Lines />
        <span className="ez:text-site-note">
          <Bar size="short" />
        </span>
      </div>
    );
  }
  return (
    <figure data-slot="testimonial" className="ez:m-0 ez:grid ez:gap-3 ez:rounded-md ez:bg-surface-alt ez:p-6 ez:text-fg">
      <blockquote className="ez:m-0 ez:font-display ez:text-site-item">“{data.quote}”</blockquote>
      {data.name && <figcaption className="ez:text-site-note ez:text-muted">{data.name}</figcaption>}
    </figure>
  );
}

const stars = (n: number) => "★★★★★".slice(0, Math.round(n)).padEnd(5, "☆");

export function Reviews({ data, blank }: SectionProps<"reviews">) {
  const items = data.items ?? [];
  if (!items.length && !blank) return null;
  if (!items.length) {
    return (
      <Block slot="reviews" blank>
        <Title>후기</Title>
        <Cols m={1} pc={3}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="ez:grid ez:content-start ez:gap-2 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:pb-4">
              <BlankStars />
              <Lines />
              <span className="ez:text-site-note">
                <Bar size="short" />
              </span>
            </div>
          ))}
        </Cols>
      </Block>
    );
  }
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

export function TrustLine({ data, blank }: SectionProps<"trust_line">) {
  const items = data.items ?? [];
  if (!items.length && !blank) return null;
  if (!items.length) {
    return (
      <ul data-slot="trust-line" data-blank="" className="ez:m-0 ez:flex ez:list-none ez:flex-wrap ez:gap-x-4 ez:gap-y-1 ez:p-0 ez:font-semibold ez:text-fg">
        {["평점", "후기"].map((label) => (
          <li key={label} className="ez:flex ez:items-center ez:gap-1.5">
            {label}
            <Bar size="short" />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul data-slot="trust-line" className="ez:m-0 ez:flex ez:list-none ez:flex-wrap ez:gap-x-4 ez:gap-y-1 ez:p-0 ez:font-semibold ez:text-fg">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function ProcessSteps({ data, blank }: SectionProps<"process_steps">) {
  const steps = data.steps ?? [];
  if (!steps.length && !blank) return null;
  if (!steps.length) {
    return (
      <Block slot="process-steps" blank>
        <Title>{data.title ?? "진행 순서"}</Title>
        <Steps steps={[0, 1, 2, 3].map((i) => <Bar key={i} size="short" />)} />
      </Block>
    );
  }
  return (
    <Block slot="process-steps">
      <Title>{data.title ?? "진행 순서"}</Title>
      <Steps steps={steps} />
    </Block>
  );
}

export function Numbers({ data, blank }: SectionProps<"numbers">) {
  const items = data.items ?? [];
  if (!items.length && !blank) return null;
  if (!items.length) {
    return (
      <div data-slot="numbers" data-blank="" className="ez:grid ez:grid-cols-3 ez:gap-2 ez:rounded-md ez:bg-surface-alt ez:p-6 ez:text-center ez:text-fg">
        {["개업", "수강생", "평점"].map((label) => (
          <div key={label} className="ez:grid ez:gap-1">
            <span className="ez:text-site-figure">
              <Bar size="short" />
            </span>
            <span className="ez:text-site-note ez:text-muted">{label}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <dl data-slot="numbers" className="ez:m-0 ez:grid ez:grid-cols-3 ez:gap-2 ez:rounded-md ez:bg-surface-alt ez:p-6 ez:text-center ez:text-fg">
      {items.map((n) => (
        <div key={n.label} className="ez:grid ez:gap-1">
          <dt className="ez:order-2 ez:text-site-note ez:text-muted">{n.label}</dt>
          <dd className="ez:order-1 ez:m-0 ez:text-site-figure ez:tabular-nums">{n.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Gallery({ data, blank }: SectionProps<"gallery">) {
  const images = data.images ?? [];
  if (!images.length && !blank) return null;
  const shown: (string | null)[] = images.length ? images.slice(0, 6) : [null, null, null];
  return (
    <section data-slot="gallery" data-blank={images.length ? undefined : ""} className="ez:grid ez:grid-cols-3 ez:gap-2">
      {shown.map((src, i) => (
        <Pic key={i} src={src} ratio={1.5} tone={i} />
      ))}
    </section>
  );
}

export function Location({ data, blank }: SectionProps<"location">) {
  if (!data.address && !blank) return null;
  if (!data.address) {
    return (
      <Block slot="location" blank>
        <Title>오시는 길</Title>
        <Rows rows={[{ label: "주소", value: <Bar size="long" /> }, { label: "안내", value: <Bar /> }]} />
        <BlankButton variant="outline">지도 보기</BlankButton>
      </Block>
    );
  }
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

export function PayPlan({ data, blank }: SectionProps<"pay_plan">) {
  const rows = data.rows ?? [];
  const groups = data.groups ?? [];
  if (!rows.length && !groups.length && !blank) return null;
  if (!rows.length && !groups.length) {
    return (
      <Block slot="pay-plan" blank>
        <Title>{data.title ?? "결제 일정 · 취소 규정"}</Title>
        <Rows rows={["예약금", "잔금", "취소 규정"].map((label) => ({ label, value: <Bar size="short" /> }))} />
      </Block>
    );
  }
  return (
    <Block slot="pay-plan">
      <Title>{data.title ?? "결제 일정 · 취소 규정"}</Title>
      {rows.length > 0 && <Rows rows={rows} />}
      {groups.map((group) => (
        <div key={group.title} className="ez:grid ez:gap-2">
          <strong className="ez:font-display ez:text-site-item">{group.title}</strong>
          <Rows rows={group.rows} />
        </div>
      ))}
    </Block>
  );
}
