import type { ReactNode } from "react";
import { Badge } from "../components/badge";
import { ButtonLink } from "../components/button";
import { Block, Chips, Cols, Fold, Pic, Rows, Steps, Title } from "../sections/kit";
import { BookingBox, Info, QuoteForm } from "./interactive";
import { SessionStatus } from "../sections/template";
import { Amenities, HouseRules } from "../sections/template/stay";
import { Location, PayPlan, Reviews } from "../sections/template/common";
import type { SiteContext } from "../renderer/registry";
import { cn } from "../utils/cn";

export type { DetailBlockProps } from "./interactive";
import type { DetailBlockProps } from "./interactive";

const none: SiteContext = { products: [], categories: [], faqs: [], shipping: null, flags: {} };

function Summary({ data, variant }: DetailBlockProps) {
  if (!data.title) return null;
  return (
    <div data-slot="detail-summary" className="ez:grid ez:gap-2 ez:text-fg">
      <h1 className="ez:m-0 ez:font-display ez:font-title ez:text-2xl ez:tracking-brand ez:md:text-3xl">{data.title}</h1>
      {data.price && <strong className="ez:text-xl ez:tabular-nums">{data.price}</strong>}
      {variant === "status" && data.status && <span className="ez:text-sm ez:text-primary">{data.status}</span>}
      {data.chips && <Chips items={data.chips} current={-1} />}
    </div>
  );
}

function ShipLine({ data, variant }: DetailBlockProps) {
  const text = variant === "status" ? [data.status, data.ship].filter(Boolean).join(" · ") : data.ship;
  if (!text) return null;
  return <p className="ez:m-0 ez:text-sm ez:text-primary">{text}</p>;
}

function PriceTable({ data }: DetailBlockProps) {
  return <Rows rows={data.rows ?? []} />;
}

function PhotoReviews({ data }: DetailBlockProps) {
  const images = data.photo_reviews ?? [];
  if (!images.length) return null;
  return (
    <Block slot="photo-reviews">
      <Title>포토 구매평</Title>
      <div className="ez:grid ez:grid-cols-4 ez:gap-2">
        {images.slice(0, 4).map((src, i) => (
          <Pic key={i} src={src} ratio={1} />
        ))}
      </div>
    </Block>
  );
}

function Gallery({ data, variant }: DetailBlockProps) {
  const images = data.images ?? [];
  return (
    <div data-slot="detail-gallery" className="ez:grid ez:gap-2">
      <Pic src={images[0]} ratio={variant === "tall" ? 0.75 : 1} />
      {images.length > 1 && (
        <div className="ez:grid ez:grid-cols-4 ez:gap-2">
          {images.slice(1, 5).map((src, i) => (
            <Pic key={i} src={src} ratio={1} />
          ))}
        </div>
      )}
    </div>
  );
}

function ClassSummary({ data, variant }: DetailBlockProps) {
  if (!data.title) return null;
  if (variant === "table") {
    return (
      <div className="ez:grid ez:gap-3">
        <Summary data={data} />
        <Rows rows={data.rows ?? []} />
      </div>
    );
  }
  return (
    <section
      data-slot="class-summary"
      className={cn("ez:grid ez:gap-3 ez:rounded-lg ez:p-6 ez:text-fg", variant === "banner" ? "ez:bg-surface-alt ez:md:p-10" : "ez:bg-surface-alt")}
    >
      <h1 className="ez:m-0 ez:font-display ez:font-title ez:text-3xl ez:tracking-brand">{data.title}</h1>
      <ul className={cn("ez:m-0 ez:grid ez:list-none ez:gap-2 ez:p-0", variant === "cells" ? "ez:grid-cols-2 ez:md:grid-cols-5" : "ez:grid-cols-2 ez:md:grid-cols-4")}>
        {(data.rows ?? []).map((r, i) => (
          <li key={i} className="ez:grid ez:gap-0.5 ez:rounded-md ez:bg-surface ez:p-3">
            <span className="ez:text-xs ez:text-muted">{r.label}</span>
            <strong className="ez:tabular-nums">{r.value}</strong>
          </li>
        ))}
      </ul>
      {data.price && <strong className="ez:text-xl ez:tabular-nums">{data.price}</strong>}
    </section>
  );
}

function StepsBlock({ data }: DetailBlockProps) {
  return data.steps?.length ? <Steps steps={data.steps} /> : null;
}

function Prep({ data }: DetailBlockProps) {
  const items = data.prep ?? [];
  if (!items.length) return null;
  return (
    <Cols m={1} pc={3}>
      {items.map((p) => (
        <div key={p.title} className="ez:grid ez:gap-1 ez:rounded-md ez:bg-surface-alt ez:p-4">
          <strong className="ez:font-semibold">{p.title}</strong>
          <span className="ez:text-sm ez:text-muted">{p.body}</span>
        </div>
      ))}
    </Cols>
  );
}

function Teacher({ data }: DetailBlockProps) {
  const t = data.teacher;
  if (!t) return null;
  return (
    <section data-slot="teacher" className="ez:grid ez:grid-cols-[56px_1fr] ez:items-start ez:gap-4 ez:text-fg">
      <Pic src={t.image} ratio={1} className="ez:overflow-hidden ez:rounded-full" />
      <div className="ez:grid ez:gap-1">
        <strong className="ez:font-semibold">{t.name}</strong>
        <p className="ez:m-0 ez:text-sm ez:text-muted">{t.body}</p>
      </div>
    </section>
  );
}

function Curriculum({ data }: DetailBlockProps) {
  const weeks = data.curriculum ?? [];
  if (!weeks.length) return null;
  return (
    <section data-slot="curriculum">
      {weeks.map((w) => (
        <Fold key={w.title} title={w.title}>
          <p className="ez:m-0 ez:text-muted">{w.body}</p>
        </Fold>
      ))}
    </section>
  );
}

function Cohorts({ data }: DetailBlockProps) {
  const cohorts = data.cohorts ?? [];
  if (!cohorts.length) return null;
  return (
    <Block slot="cohorts">
      <Title>열린 반</Title>
      <Cols m={1} pc={3}>
        {cohorts.map((c) => (
          <div key={c.title} className="ez:grid ez:content-start ez:gap-1.5 ez:rounded-md ez:border ez:border-solid ez:border-primary-border ez:p-4">
            <strong className="ez:font-semibold ez:tabular-nums">{c.title}</strong>
            <span className="ez:text-sm ez:text-muted ez:tabular-nums">{`${c.period} · ${c.count}`}</span>
            <SessionStatus session={{ id: c.title, date: "", time: "", name: "", status: c.status, seats_left: c.seats_left }} />
            {c.dates && (
              <Fold title={`수업 날짜 ${c.dates.length}개`}>
                <span className="ez:text-sm ez:tabular-nums">{c.dates.join(" · ")}</span>
              </Fold>
            )}
          </div>
        ))}
      </Cols>
    </Block>
  );
}

function Timetable({ data }: DetailBlockProps) {
  const t = data.timetable;
  if (!t) return null;
  return (
    <Block slot="timetable">
      <Title>시간표</Title>
      <table className="ez:w-full ez:border-collapse ez:text-center ez:text-sm">
        <thead>
          <tr>
            <th className="ez:p-2">
              <span className="ez:sr-only">시간</span>
            </th>
            {t.days.map((d) => (
              <th key={d} className="ez:p-2 ez:font-semibold">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r) => (
            <tr key={r.time} className="ez:border-0 ez:border-t ez:border-solid ez:border-primary-border">
              <th scope="row" className="ez:p-2 ez:font-normal ez:text-muted ez:tabular-nums">
                {r.time}
              </th>
              {r.open.map((o, i) => (
                <td key={t.days[i]} className="ez:p-2">
                  {o ? <Badge tone="primary">열림</Badge> : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Block>
  );
}

function Refund({ data }: DetailBlockProps) {
  if (!data.refund?.length) return null;
  return (
    <Block slot="refund">
      <Title>취소 · 환불 규정</Title>
      <Rows rows={data.refund} />
    </Block>
  );
}

function Availability({ data }: DetailBlockProps) {
  const cal = data.calendar;
  if (!cal) return null;
  return (
    <Block slot="availability">
      <Title>{cal.month}</Title>
      <ol className="ez:m-0 ez:grid ez:list-none ez:grid-cols-7 ez:gap-1 ez:p-0 ez:text-center ez:text-sm">
        {cal.days.map((d) => (
          <li
            key={d.day}
            className={cn(
              "ez:grid ez:gap-0.5 ez:rounded-sm ez:py-1.5 ez:tabular-nums",
              d.state === "picked" ? "ez:bg-primary ez:text-on-primary" : "ez:bg-surface-alt",
              d.state === "closed" && "ez:text-muted ez:line-through",
            )}
          >
            {d.day}
            {d.price && d.state !== "closed" && <span className="ez:text-[11px] ez:opacity-80">{d.price}</span>}
          </li>
        ))}
      </ol>
    </Block>
  );
}

function StayTotal({ data }: DetailBlockProps) {
  const t = data.total;
  if (!t) return null;
  return (
    <section data-slot="stay-total" className="ez:grid ez:gap-3 ez:rounded-lg ez:border ez:border-solid ez:border-primary-border ez:p-5 ez:text-fg">
      <Rows rows={[...t.rows, { label: "합계", value: t.total }]} />
      {t.note && <p className="ez:m-0 ez:text-sm ez:text-primary">{t.note}</p>}
      <ButtonLink href={t.href ?? "#"}>{t.button}</ButtonLink>
    </section>
  );
}

function RoomInfo({ data }: DetailBlockProps) {
  return (
    <div className="ez:grid ez:gap-3">
      <Summary data={data} />
      <Rows rows={data.rows ?? []} />
    </div>
  );
}

function CaseInfo({ data }: DetailBlockProps) {
  if (!data.title) return null;
  return (
    <div data-slot="case-info" className="ez:grid ez:gap-3 ez:text-fg">
      <h1 className="ez:m-0 ez:font-display ez:font-title ez:text-3xl ez:tracking-brand">{data.title}</h1>
      {data.status && <span className="ez:text-sm ez:text-muted">{data.status}</span>}
      <Rows rows={data.rows ?? []} />
      <ButtonLink href={data.estimate?.href ?? "/quote"}>이런 작업 견적 받기</ButtonLink>
    </div>
  );
}

function CasePhotos({ data }: DetailBlockProps) {
  const images = (data.images ?? []).slice(1);
  if (!images.length) return null;
  return (
    <div className="ez:grid ez:grid-cols-2 ez:gap-2 ez:md:grid-cols-4">
      {images.map((src, i) => (
        <Pic key={i} src={src} ratio={1} />
      ))}
    </div>
  );
}

function Estimate({ data }: DetailBlockProps) {
  const e = data.estimate;
  if (!e) return null;
  return (
    <section data-slot="estimate" className="ez:grid ez:gap-4 ez:text-fg ez:md:max-w-2xl">
      <Title aside={<span className="ez:text-sm ez:text-muted">{`${e.no} · ${e.valid}`}</span>}>견적서</Title>
      <Rows rows={[...e.items, { label: "합계", value: e.total }, { label: "예약금", value: e.deposit }]} />
      <div className="ez:grid ez:grid-cols-2 ez:gap-2">
        <ButtonLink href="#change" variant="outline">
          {e.change ?? "수정 요청"}
        </ButtonLink>
        <ButtonLink href={e.href ?? "#pay"}>{e.accept}</ButtonLink>
      </div>
    </section>
  );
}

function AmenitiesBlock({ data, variant }: DetailBlockProps) {
  return <Amenities data={{ items: data.amenities }} context={none} variant={variant} />;
}

function RulesBlock({ data }: DetailBlockProps) {
  return <HouseRules data={data.rules ?? {}} context={none} />;
}

function LocationBlock({ data }: DetailBlockProps) {
  return <Location data={data.location ?? {}} context={none} />;
}

function PayBlock({ data }: DetailBlockProps) {
  return <PayPlan data={{ rows: data.pay }} context={none} />;
}

function ReviewsBlock({ data }: DetailBlockProps) {
  return <Reviews data={data.reviews ?? {}} context={none} />;
}

export const detailBlocks: Record<string, (p: DetailBlockProps) => ReactNode> = {
  gallery: Gallery,
  summary: Summary,
  ship_line: ShipLine,
  price_table: PriceTable,
  info: Info,
  photo_reviews: PhotoReviews,
  class_summary: ClassSummary,
  booking_box: BookingBox,
  steps: StepsBlock,
  prep: Prep,
  teacher: Teacher,
  curriculum: Curriculum,
  cohorts: Cohorts,
  timetable: Timetable,
  refund: Refund,
  availability: Availability,
  stay_total: StayTotal,
  room_info: RoomInfo,
  case_info: CaseInfo,
  case_photos: CasePhotos,
  quote_form: QuoteForm,
  estimate: Estimate,
  amenities: AmenitiesBlock,
  house_rules: RulesBlock,
  location: LocationBlock,
  pay_plan: PayBlock,
  reviews: ReviewsBlock,
};
