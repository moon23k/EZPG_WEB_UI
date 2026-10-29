"use client";

import { useState } from "react";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export type CalendarDate = { date: string; label?: string; disabled?: boolean };
export type CalendarValue = { start?: string; end?: string };

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function parts(iso: string): [number, number, number] {
  const [y, m, d] = iso.split("-").map(Number);
  return [y, m, d];
}

function weekday(iso: string): number {
  const [y, m, d] = parts(iso);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function nightsBetween(start: string, end: string): number {
  const [a, b] = [start, end].map((iso) => {
    const [y, m, d] = parts(iso);
    return Date.UTC(y, m - 1, d);
  });
  return Math.round((b - a) / 86_400_000);
}

function dayText(iso: string): string {
  const [, m, d] = parts(iso);
  return `${m}월 ${d}일`;
}

function months(days: CalendarDate[]): string[] {
  return [...new Set(days.map((d) => d.date.slice(0, 7)))];
}

export function Calendar({
  days,
  mode = "single",
  value,
  onChange,
  name = "date",
  startName = "in",
  endName = "out",
  className,
}: {
  days: CalendarDate[];
  mode?: "single" | "range";
  value?: CalendarValue;
  onChange?: (value: CalendarValue) => void;
  name?: string;
  startName?: string;
  endName?: string;
  className?: string;
}) {
  const [own, setOwn] = useState<CalendarValue>(value ?? {});
  const current = value ?? own;
  const list = months(days);
  const [page, setPage] = useState(() => Math.max(0, list.indexOf((current.start ?? "").slice(0, 7))));
  const month = list[page] ?? list[0];
  const shown = days.filter((d) => d.date.startsWith(month ?? ""));
  const set = (next: CalendarValue) => {
    setOwn(next);
    onChange?.(next);
  };
  const openBetween = (start: string, end: string) =>
    days.filter((d) => d.date >= start && d.date < end).every((d) => !d.disabled) &&
    nightsBetween(start, end) === days.filter((d) => d.date >= start && d.date < end).length;
  const canEnd = (iso: string) => mode === "range" && Boolean(current.start) && !current.end && iso > current.start! && openBetween(current.start!, iso);
  const pick = (day: CalendarDate) => {
    if (mode === "single") return set({ start: day.date });
    if (canEnd(day.date)) return set({ start: current.start, end: day.date });
    if (!day.disabled) set({ start: day.date });
  };
  const state = (iso: string) => {
    if (iso === current.start || iso === current.end) return "edge";
    if (current.start && current.end && iso > current.start && iso < current.end) return "inside";
    return "none";
  };
  const [y, m] = month ? month.split("-").map(Number) : [0, 0];
  const blanks = shown.length ? weekday(shown[0].date) : 0;
  return (
    <div data-slot="calendar" className={cn("ez:grid ez:gap-3 ez:text-fg", className)}>
      <div className="ez:flex ez:items-center ez:justify-between">
        <button
          type="button"
          className={cn("ez:size-10 ez:border-0 ez:bg-transparent ez:text-fg ez:cursor-pointer ez:disabled:opacity-30 ez:disabled:cursor-default", focusRing)}
          onClick={() => setPage(page - 1)}
          disabled={page <= 0}
          aria-label="이전 달"
        >
          ‹
        </button>
        <strong className="ez:font-title">{`${y}년 ${m}월`}</strong>
        <button
          type="button"
          className={cn("ez:size-10 ez:border-0 ez:bg-transparent ez:text-fg ez:cursor-pointer ez:disabled:opacity-30 ez:disabled:cursor-default", focusRing)}
          onClick={() => setPage(page + 1)}
          disabled={page >= list.length - 1}
          aria-label="다음 달"
        >
          ›
        </button>
      </div>
      <ol className="ez:m-0 ez:grid ez:list-none ez:grid-cols-7 ez:gap-1 ez:p-0 ez:text-center">
        {WEEKDAYS.map((w) => (
          <li key={w} className="ez:text-sm ez:text-muted" aria-hidden="true">
            {w}
          </li>
        ))}
        {Array.from({ length: blanks }, (_, i) => (
          <li key={`blank-${i}`} aria-hidden="true" />
        ))}
        {shown.map((day) => {
          const look = state(day.date);
          const blocked = Boolean(day.disabled) && !canEnd(day.date);
          return (
            <li key={day.date}>
              <button
                type="button"
                onClick={() => pick(day)}
                disabled={blocked}
                aria-pressed={look === "edge"}
                aria-label={[dayText(day.date), `${WEEKDAYS[weekday(day.date)]}요일`, day.label].filter(Boolean).join(" ")}
                className={cn(
                  "ez:grid ez:w-full ez:min-h-12 ez:content-center ez:gap-0.5 ez:rounded-sm ez:border-0 ez:py-1 ez:tabular-nums ez:cursor-pointer",
                  look === "edge" ? "ez:bg-primary ez:text-on-primary" : look === "inside" ? "ez:bg-primary-tint ez:text-fg" : "ez:bg-surface-alt ez:text-fg",
                  "ez:disabled:cursor-not-allowed ez:disabled:bg-transparent ez:disabled:text-muted ez:disabled:line-through",
                  focusRing,
                )}
              >
                <span>{parts(day.date)[2]}</span>
                {day.label && <span className="ez:text-xs ez:opacity-80">{day.label}</span>}
              </button>
            </li>
          );
        })}
      </ol>
      {mode === "range" ? (
        <>
          <input type="hidden" name={startName} value={current.start ?? ""} />
          <input type="hidden" name={endName} value={current.end ?? ""} />
          {current.start && (
            <p className="ez:m-0 ez:text-sm">
              {current.end
                ? `${dayText(current.start)} ~ ${dayText(current.end)} · ${nightsBetween(current.start, current.end)}박`
                : `${dayText(current.start)} ~`}
            </p>
          )}
        </>
      ) : (
        <input type="hidden" name={name} value={current.start ?? ""} />
      )}
    </div>
  );
}
