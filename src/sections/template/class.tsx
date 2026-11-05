import NextLink from "next/link";
import { Badge } from "../../components/badge";
import { ButtonLink } from "../../components/button";
import type { SectionProps } from "../../renderer/registry";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import { Bar, BlankButton, BlankPrice, Block, Card, Cols, Pic, statusText, Title } from "../kit";
import type { Session } from "./data";

export function SessionStatus({ session }: { session: Session }) {
  const text = session.status === "few" && session.seats_left ? `남은 자리 ${session.seats_left}` : statusText[session.status];
  return (
    <Badge tone={session.status === "full" ? "neutral" : "primary"} className="ez:text-site-note">
      {text}
    </Badge>
  );
}

export function SessionRow({ session, tone }: { session: Session; tone?: number }) {
  return (
    <NextLink
      href={session.href ?? "#"}
      className={cn(
        "ez:grid ez:grid-cols-[72px_1fr] ez:items-center ez:gap-3 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:pb-3 ez:text-fg ez:no-underline ez:md:grid-cols-[120px_1fr_auto]",
        focusRing,
      )}
    >
      <Pic src={session.image} ratio={1.6} tone={tone} />
      <span className="ez:grid ez:gap-0.5">
        <strong className="ez:font-semibold ez:tabular-nums">{`${session.date} · ${session.time}`}</strong>
        <span className="ez:text-site-note ez:text-muted">{[session.name, session.length].filter(Boolean).join(" · ")}</span>
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
      {sessions.map((s, i) => (
        <SessionRow key={s.id} session={s} tone={i} />
      ))}
    </div>
  );
}

function BlankRows() {
  return (
    <div className="ez:grid ez:gap-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="ez:grid ez:grid-cols-[72px_1fr] ez:items-center ez:gap-3 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:pb-3 ez:md:grid-cols-[120px_1fr_auto]"
        >
          <Pic ratio={1.6} tone={i} />
          <span className="ez:grid ez:gap-2">
            <Bar size="long" />
            <span className="ez:text-site-note">
              <Bar />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function blankCards(count: number, ratio: number) {
  return Array.from({ length: count }, (_, i) => (
    <Card key={i}>
      <Pic ratio={ratio} tone={i} className="ez:overflow-hidden ez:rounded-lg" />
      <span className="ez:font-display ez:text-site-item">
        <Bar />
      </span>
      <span className="ez:text-site-note">
        <Bar size="long" />
      </span>
    </Card>
  ));
}

export function NextSession({ data, blank }: SectionProps<"next_session">) {
  const s = data.session;
  if (!s && !blank) return null;
  if (!s) {
    return (
      <section data-slot="next-session" data-blank="" className="ez:grid ez:gap-2 ez:rounded-lg ez:bg-primary ez:p-5 ez:text-on-primary">
        <span className="ez:text-site-note ez:opacity-80">다음 수업</span>
        <span className="ez:font-display ez:text-site-item">
          <Bar size="long" strong />
        </span>
        <Bar strong />
        <BlankButton variant="outline" className="ez:justify-self-start ez:border-on-primary ez:text-on-primary ez:bg-transparent">
          예약하기
        </BlankButton>
      </section>
    );
  }
  return (
    <section data-slot="next-session" className="ez:grid ez:gap-2 ez:rounded-lg ez:bg-primary ez:p-5 ez:text-on-primary">
      <span className="ez:text-site-note ez:opacity-80">다음 수업</span>
      <strong className="ez:font-display ez:text-site-item ez:tabular-nums">{`${s.date} ${s.time}`}</strong>
      <span>{[s.name, s.length].filter(Boolean).join(" · ")}</span>
      <span className="ez:text-site-note">{s.status === "few" && s.seats_left ? `남은 자리 ${s.seats_left}` : statusText[s.status]}</span>
      <ButtonLink href={s.href ?? "#"} variant="outline" className="ez:justify-self-start ez:border-on-primary ez:text-on-primary ez:bg-transparent">
        예약하기
      </ButtonLink>
    </section>
  );
}

export function ClassSchedule({ data, variant, blank }: SectionProps<"class_schedule">) {
  const sessions = data.sessions ?? [];
  if (!sessions.length && !blank) return null;
  if (!sessions.length) {
    return (
      <Block slot="class-schedule" blank>
        <Title>{data.title ?? (variant === "upcoming" ? "다가오는 수업" : "수업 일정")}</Title>
        {variant === "upcoming" ? (
          <Cols m={2} pc={4}>
            {blankCards(4, 1)}
          </Cols>
        ) : (
          <BlankRows />
        )}
      </Block>
    );
  }
  if (variant === "upcoming") {
    return (
      <Block slot="class-schedule">
        <Title>{data.title ?? "다가오는 수업"}</Title>
        <Cols m={2} pc={4}>
          {sessions.slice(0, 4).map((s, i) => (
            <Card key={s.id} href={s.href}>
              <Pic src={s.image} ratio={1} tone={i} />
              <strong className="ez:font-display ez:text-site-item">{s.name}</strong>
              <span className="ez:text-site-note ez:text-muted ez:tabular-nums">{`${s.date} ${s.time}`}</span>
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

export function ClassList({ data, variant, blank }: SectionProps<"class_list">) {
  const classes = data.classes ?? [];
  if (!classes.length && !blank) return null;
  if (!classes.length) {
    return (
      <Block slot="class-list" blank>
        <Title>{data.title ?? "클래스"}</Title>
        <Cols m={1} pc={3}>
          {[0, 1, 2].map((i) => (
            <Card key={i}>
              <Pic ratio={1.25} tone={i} className="ez:overflow-hidden ez:rounded-lg" />
              <span className="ez:font-display ez:text-site-item">
                <Bar />
              </span>
              <BlankPrice />
            </Card>
          ))}
        </Cols>
      </Block>
    );
  }
  if (variant === "domain") {
    return (
      <Block slot="class-list" className="ez:md:grid-cols-[1.2fr_1fr] ez:md:items-start">
        <Pic src={classes[0].image} ratio={1.4} tone={3} />
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
        {classes.map((c, i) => (
          <Card key={c.id} href={c.href}>
            <Pic src={c.image} ratio={1.25} tone={i} className="ez:overflow-hidden ez:rounded-lg" />
            {c.chips && (
              <span className="ez:flex ez:gap-1.5">
                {c.chips.map((chip) => (
                  <Badge key={chip} className="ez:text-site-note">
                    {chip}
                  </Badge>
                ))}
              </span>
            )}
            <strong className="ez:font-display ez:text-site-item">{c.name}</strong>
            {c.price && <span className="ez:tabular-nums">{c.price}</span>}
            {c.next && <span className="ez:text-site-note ez:text-primary">{c.next}</span>}
          </Card>
        ))}
      </Cols>
    </Block>
  );
}

export function Gates({ data, blank }: SectionProps<"gates">) {
  const items = data.items ?? [];
  if (!items.length && !blank) return null;
  if (!items.length) {
    return (
      <section data-slot="gates" data-blank="">
        <Cols m={1} pc={3}>
          {[0, 1, 2].map((i) => (
            <Card key={i}>
              <Pic ratio={2.2} tone={i + 3} className="ez:overflow-hidden ez:rounded-md" />
              <Bar />
            </Card>
          ))}
        </Cols>
      </section>
    );
  }
  return (
    <section data-slot="gates">
      <Cols m={1} pc={3}>
        {items.map((t, i) => (
          <Card key={t.title} href={t.href}>
            <Pic src={t.image} ratio={2.2} tone={i + 3} className="ez:overflow-hidden ez:rounded-md" />
            <strong className="ez:font-semibold">{t.title} →</strong>
          </Card>
        ))}
      </Cols>
    </section>
  );
}
