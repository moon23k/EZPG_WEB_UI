import NextLink from "next/link";
import { Badge } from "../../components/badge";
import { ButtonLink } from "../../components/button";
import type { SectionProps } from "../../renderer/registry";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import { Block, Card, Cols, Pic, statusText, Title } from "../kit";
import type { Session } from "./data";

export function SessionStatus({ session }: { session: Session }) {
  const text = session.status === "few" && session.seats_left ? `남은 자리 ${session.seats_left}` : statusText[session.status];
  return <Badge tone={session.status === "full" ? "neutral" : "primary"}>{text}</Badge>;
}

export function SessionRow({ session }: { session: Session }) {
  return (
    <NextLink
      href={session.href ?? "#"}
      className={cn(
        "ez:grid ez:grid-cols-[72px_1fr] ez:items-center ez:gap-3 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:pb-3 ez:text-fg ez:no-underline ez:md:grid-cols-[120px_1fr_auto]",
        focusRing,
      )}
    >
      <Pic src={session.image} ratio={1.6} />
      <span className="ez:grid ez:gap-0.5">
        <strong className="ez:font-semibold ez:tabular-nums">{`${session.date} · ${session.time}`}</strong>
        <span className="ez:text-sm ez:text-muted">{[session.name, session.length].filter(Boolean).join(" · ")}</span>
      </span>
      <span className="ez:col-span-2 ez:md:col-span-1">
        <SessionStatus session={session} />
      </span>
    </NextLink>
  );
}

export function SessionList({ sessions }: { sessions: Session[] }) {
  return (
    <div className="ez:grid ez:gap-3">
      {sessions.map((s) => (
        <SessionRow key={s.id} session={s} />
      ))}
    </div>
  );
}

export function NextSession({ data }: SectionProps<"next_session">) {
  const s = data.session;
  if (!s) return null;
  return (
    <section data-slot="next-session" className="ez:grid ez:gap-2 ez:rounded-lg ez:bg-primary ez:p-5 ez:text-on-primary ez:md:max-w-md">
      <span className="ez:text-sm ez:opacity-80">다음 수업</span>
      <strong className="ez:font-display ez:text-2xl ez:font-title ez:tabular-nums">{`${s.date} ${s.time}`}</strong>
      <span>{[s.name, s.length].filter(Boolean).join(" · ")}</span>
      <span className="ez:text-sm">{s.status === "few" && s.seats_left ? `남은 자리 ${s.seats_left}` : statusText[s.status]}</span>
      <ButtonLink href={s.href ?? "#"} variant="outline" className="ez:justify-self-start ez:border-on-primary ez:text-on-primary ez:bg-transparent">
        예약하기
      </ButtonLink>
    </section>
  );
}

export function ClassSchedule({ data, variant }: SectionProps<"class_schedule">) {
  const sessions = data.sessions ?? [];
  if (!sessions.length) return null;
  if (variant === "upcoming") {
    return (
      <Block slot="class-schedule">
        <Title>{data.title ?? "다가오는 수업"}</Title>
        <Cols m={2} pc={4}>
          {sessions.slice(0, 4).map((s) => (
            <Card key={s.id} href={s.href}>
              <Pic src={s.image} ratio={1} />
              <strong className="ez:text-sm ez:font-semibold">{s.name}</strong>
              <span className="ez:text-sm ez:text-muted ez:tabular-nums">{`${s.date} ${s.time}`}</span>
              <SessionStatus session={s} />
            </Card>
          ))}
        </Cols>
      </Block>
    );
  }
  return (
    <Block slot="class-schedule">
      <Title>{data.title ?? "수업 일정"}</Title>
      <SessionList sessions={sessions} />
    </Block>
  );
}

export function ClassList({ data, variant }: SectionProps<"class_list">) {
  const classes = data.classes ?? [];
  if (!classes.length) return null;
  if (variant === "domain") {
    return (
      <Block slot="class-list" className="ez:md:grid-cols-[1.2fr_1fr] ez:md:items-start">
        <Pic src={classes[0].image} ratio={1.4} />
        <div className="ez:grid ez:gap-2">
          <Title>{data.title ?? "클래스"}</Title>
          <ul className="ez:m-0 ez:list-none ez:p-0">
            {classes.map((c) => (
              <li key={c.id} className="ez:border-0 ez:border-b ez:border-solid ez:border-primary-border">
                <NextLink href={c.href ?? "#"} className={cn("ez:flex ez:justify-between ez:py-3 ez:text-fg ez:no-underline", focusRing)}>
                  <span>{c.name}</span>
                  <span className="ez:text-muted">{c.chips?.[0]}</span>
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      </Block>
    );
  }
  return (
    <Block slot="class-list">
      <Title>{data.title ?? "클래스"}</Title>
      <Cols m={1} pc={3}>
        {classes.map((c) => (
          <Card key={c.id} href={c.href}>
            <Pic src={c.image} ratio={1.25} className="ez:overflow-hidden ez:rounded-lg" />
            {c.chips && (
              <span className="ez:flex ez:gap-1.5">
                {c.chips.map((chip) => (
                  <Badge key={chip}>{chip}</Badge>
                ))}
              </span>
            )}
            <strong className="ez:font-display ez:text-lg ez:font-title">{c.name}</strong>
            {c.price && <span className="ez:tabular-nums">{c.price}</span>}
            {c.next && <span className="ez:text-sm ez:text-primary">{c.next}</span>}
          </Card>
        ))}
      </Cols>
    </Block>
  );
}

export function Gates({ data }: SectionProps<"gates">) {
  const items = data.items ?? [];
  if (!items.length) return null;
  return (
    <section data-slot="gates">
      <Cols m={1} pc={3}>
        {items.map((t) => (
          <Card key={t.title} href={t.href}>
            <Pic src={t.image} ratio={2.2} className="ez:overflow-hidden ez:rounded-md" />
            <strong className="ez:font-semibold">{t.title} →</strong>
          </Card>
        ))}
      </Cols>
    </section>
  );
}
