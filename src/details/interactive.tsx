"use client";

import { useState } from "react";
import { ButtonLink } from "../components/button";
import { Fold, statusText } from "../sections/kit";
import { cn } from "../utils/cn";
import type { DetailData } from "./data";

export type DetailBlockProps = { data: DetailData; variant?: string };

export function Info({ data, variant }: DetailBlockProps) {
  const items = data.info ?? [];
  const [tab, setTab] = useState(0);
  if (!items.length) return null;
  if (variant === "tabs") {
    return (
      <section data-slot="detail-info" className="ez:grid ez:gap-4">
        <div role="tablist" className="ez:flex ez:border-0 ez:border-b ez:border-solid ez:border-primary-border">
          {items.map((it, i) => (
            <button
              key={it.title}
              role="tab"
              type="button"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={cn(
                "ez:min-h-11 ez:flex-1 ez:cursor-pointer ez:border-0 ez:border-b-2 ez:border-solid ez:bg-transparent ez:font-body ez:text-fg",
                tab === i ? "ez:border-primary ez:font-semibold" : "ez:border-transparent ez:text-muted",
              )}
            >
              {it.title}
            </button>
          ))}
        </div>
        <div role="tabpanel">{items[tab]?.node}</div>
      </section>
    );
  }
  return (
    <section data-slot="detail-info">
      {items.map((it) => (
        <Fold key={it.title} title={it.title} open={it.open}>
          {it.node}
        </Fold>
      ))}
    </section>
  );
}

export function BookingBox({ data }: DetailBlockProps) {
  const sessions = data.sessions ?? [];
  const [pick, setPick] = useState(sessions.find((s) => s.status !== "full")?.id ?? "");
  if (!sessions.length) return null;
  const chosen = sessions.find((s) => s.id === pick);
  return (
    <section data-slot="booking-box" className="ez:grid ez:gap-3 ez:rounded-lg ez:bg-primary ez:p-5 ez:text-on-primary">
      <strong className="ez:font-semibold">날짜 고르기</strong>
      <ul className="ez:m-0 ez:grid ez:list-none ez:gap-1 ez:p-0">
        {sessions.map((s) => (
          <li key={s.id}>
            <label className={cn("ez:flex ez:min-h-11 ez:cursor-pointer ez:items-center ez:justify-between ez:gap-3 ez:border-0 ez:border-b ez:border-solid ez:border-on-primary/25", s.status === "full" && "ez:opacity-60")}>
              <span className="ez:flex ez:items-center ez:gap-2">
                <input type="radio" name="session" value={s.id} checked={pick === s.id} disabled={s.status === "full"} onChange={() => setPick(s.id)} />
                <span className="ez:tabular-nums">{`${s.date} ${s.time}`}</span>
              </span>
              <span className="ez:text-sm">{s.status === "few" && s.seats_left ? `남은 자리 ${s.seats_left}` : statusText[s.status]}</span>
            </label>
          </li>
        ))}
      </ul>
      <ButtonLink href={chosen?.href ?? "#"} variant="outline" className="ez:border-on-primary ez:bg-transparent ez:text-on-primary">
        예약하기
      </ButtonLink>
    </section>
  );
}

export function QuoteForm({ data, variant }: DetailBlockProps) {
  const f = data.form;
  const [step, setStep] = useState(0);
  if (!f) return null;
  return (
    <form data-slot="quote-form" data-variant={variant} className="ez:grid ez:gap-5 ez:text-fg ez:md:grid-cols-[1.4fr_1fr] ez:md:items-start">
      <div className="ez:grid ez:gap-5">
        <ol className="ez:m-0 ez:grid ez:list-none ez:auto-cols-fr ez:grid-flow-col ez:gap-1 ez:p-0 ez:text-xs">
          {f.steps.map((s, i) => (
            <li key={s} className={cn("ez:border-0 ez:border-t-4 ez:border-solid ez:pt-1.5", i <= step ? "ez:border-primary ez:text-fg" : "ez:border-primary-border ez:text-muted")}>
              {s}
            </li>
          ))}
        </ol>
        {f.groups.map((g) => (
          <fieldset key={g.label} className="ez:m-0 ez:grid ez:gap-2 ez:border-0 ez:p-0">
            <legend className="ez:mb-2 ez:font-semibold">{g.label}</legend>
            <div className="ez:flex ez:flex-wrap ez:gap-2">
              {g.options.map((o, i) => (
                <label key={o} className="ez:cursor-pointer">
                  <input type="radio" name={g.label} value={o} defaultChecked={i === 0} className="ez:peer ez:sr-only" />
                  <span className="ez:inline-flex ez:min-h-11 ez:items-center ez:rounded-button ez:border ez:border-solid ez:border-primary-border ez:px-4 ez:peer-checked:border-primary ez:peer-checked:bg-primary ez:peer-checked:text-on-primary">
                    {o}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        {variant === "steps" && (
          <div className="ez:grid ez:grid-cols-2 ez:gap-2">
            <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className="ez:min-h-11 ez:rounded-button ez:border ez:border-solid ez:border-primary ez:bg-surface ez:text-primary">
              이전
            </button>
            <button type="button" onClick={() => setStep((s) => Math.min(f.steps.length - 1, s + 1))} className="ez:min-h-11 ez:rounded-button ez:border-0 ez:bg-primary ez:text-on-primary">
              다음
            </button>
          </div>
        )}
      </div>
      <aside className="ez:sticky ez:bottom-0 ez:grid ez:gap-3 ez:rounded-lg ez:border ez:border-solid ez:border-primary-border ez:bg-surface ez:p-4 ez:md:top-20">
        {f.total && (
          <span className="ez:flex ez:items-baseline ez:justify-between">
            <span className="ez:text-sm ez:text-muted">예상 금액</span>
            <strong className="ez:text-xl ez:tabular-nums">{f.total}</strong>
          </span>
        )}
        <button type="submit" className="ez:min-h-12 ez:rounded-button ez:border-0 ez:bg-primary ez:font-semibold ez:text-on-primary">
          {f.button}
        </button>
      </aside>
    </form>
  );
}
