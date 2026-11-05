import { ButtonLink } from "../../components/button";
import type { SectionProps } from "../../renderer/registry";
import { Bar, BlankButton, BlankPrice, Block, Card, Cols, Lines, Pic, Rows, Title } from "../kit";

export function SearchBar({ data }: SectionProps<"search_bar">) {
  return (
    <form
      data-slot="search-bar"
      action={data.href ?? "/rooms"}
      className="ez:grid ez:gap-2 ez:rounded-md ez:border ez:border-solid ez:border-primary-border ez:bg-surface ez:p-3 ez:md:grid-cols-[1fr_1fr_1fr_auto]"
    >
      {(
        [
          ["check_in", "입실", "date"],
          ["check_out", "퇴실", "date"],
          ["guests", "인원", "number"],
        ] as const
      ).map(([name, label, type]) => (
        <label key={name} className="ez:grid ez:gap-1 ez:text-site-note ez:text-muted">
          {label}
          <input name={name} type={type} min={type === "number" ? 1 : undefined} className="ez:min-h-11 ez:rounded-md ez:border ez:border-solid ez:border-primary-border ez:bg-surface ez:px-3 ez:text-site-body ez:text-fg" />
        </label>
      ))}
      <button type="submit" className="ez:min-h-11 ez:self-end ez:rounded-button ez:border-0 ez:bg-primary ez:px-6 ez:text-site-body ez:font-semibold ez:text-on-primary">
        검색
      </button>
    </form>
  );
}

export function BookingStrip({ data, blank }: SectionProps<"booking_strip">) {
  if (!data.price && !blank) return null;
  return (
    <section data-slot="booking-strip" data-blank={data.price ? undefined : ""} className="ez:grid ez:gap-3 ez:rounded-md ez:bg-surface-alt ez:p-4 ez:text-fg ez:md:grid-cols-[1fr_auto] ez:md:items-center">
      {data.price ? <strong className="ez:text-site-figure ez:tabular-nums">{data.price}</strong> : <BlankPrice before="1박" after="원부터" className="ez:font-display ez:text-site-item" />}
      {data.price ? <ButtonLink href={data.href ?? "/booking"}>예약하기</ButtonLink> : <BlankButton>예약하기</BlankButton>}
    </section>
  );
}

export function SpecIcons({ data, blank }: SectionProps<"spec_icons">) {
  const items = data.items ?? [];
  if (!items.length && !blank) return null;
  const empty = !items.length;
  return (
    <ul data-slot="spec-icons" data-blank={empty ? "" : undefined} className="ez:m-0 ez:flex ez:list-none ez:flex-wrap ez:gap-x-5 ez:gap-y-2 ez:p-0 ez:text-fg">
      {(empty ? ["a", "b", "c", "d"] : items).map((t) => (
        <li key={t} className="ez:flex ez:items-center ez:gap-2">
          <span aria-hidden="true" className={empty ? "ez:size-2 ez:rounded-full ez:bg-tile-blank" : "ez:size-2 ez:rounded-full ez:bg-primary"} />
          {empty ? <Bar size="short" /> : t}
        </li>
      ))}
    </ul>
  );
}

export function Amenities({ data, variant, blank }: SectionProps<"amenities">) {
  const items = data.items ?? [];
  if (!items.length && !blank) return null;
  if (!items.length) {
    return (
      <Block slot="amenities" blank>
        <Title>{data.title ?? "편의시설"}</Title>
        <Cols m={2} pc={3}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="ez:flex ez:items-center ez:gap-2 ez:rounded-md ez:bg-surface-alt ez:p-3 ez:text-site-note">
              <span aria-hidden="true" className="ez:size-2 ez:rounded-full ez:bg-tile-blank" />
              <Bar />
            </div>
          ))}
        </Cols>
      </Block>
    );
  }
  if (variant === "groups") {
    const groups = [...new Set(items.map((i) => i.group ?? "기본"))];
    return (
      <Block slot="amenities">
        <Title>{data.title ?? "편의시설"}</Title>
        <Cols m={1} pc={3}>
          {groups.map((g) => (
            <div key={g} className="ez:grid ez:content-start ez:gap-1">
              <strong className="ez:font-semibold">{g}</strong>
              <span className="ez:text-site-note ez:text-muted">
                {items
                  .filter((i) => (i.group ?? "기본") === g)
                  .map((i) => i.name)
                  .join(" · ")}
              </span>
            </div>
          ))}
        </Cols>
      </Block>
    );
  }
  return (
    <Block slot="amenities">
      <Title>{data.title ?? "편의시설"}</Title>
      <Cols m={2} pc={3}>
        {items.map((i) => (
          <div key={i.name} className="ez:flex ez:items-center ez:gap-2 ez:rounded-md ez:bg-surface-alt ez:p-3 ez:text-site-note">
            <span aria-hidden="true" className="ez:size-2 ez:rounded-full ez:bg-primary" />
            {i.name}
          </div>
        ))}
      </Cols>
    </Block>
  );
}

export function HouseRules({ data, blank }: SectionProps<"house_rules">) {
  const rules = data.rules ?? [];
  if (!data.check_in && !rules.length && !blank) return null;
  if (!data.check_in && !rules.length) {
    return (
      <Block slot="house-rules" blank>
        <Title>이용 규칙</Title>
        <Rows rows={[{ label: "입실", value: <Bar size="short" /> }, { label: "퇴실", value: <Bar size="short" /> }, { label: <Bar size="long" /> }]} />
      </Block>
    );
  }
  return (
    <Block slot="house-rules">
      <Title>이용 규칙</Title>
      <Rows
        rows={[
          ...(data.check_in ? [{ label: "입실", value: data.check_in }] : []),
          ...(data.check_out ? [{ label: "퇴실", value: data.check_out }] : []),
          ...rules.map((r) => ({ label: r })),
        ]}
      />
    </Block>
  );
}

export function RoomList({ data, blank }: SectionProps<"room_list">) {
  const rooms = data.rooms ?? [];
  if (!rooms.length && !blank) return null;
  if (!rooms.length) {
    return (
      <Block slot="room-list" blank>
        <Title>{data.title ?? "객실"}</Title>
        <Cols m={1} pc={3}>
          {[0, 1, 2].map((i) => (
            <Card key={i} className="ez:flex ez:flex-col">
              <Pic ratio={1.5} tone={i} />
              <span className="ez:font-display ez:text-site-item">
                <Bar />
              </span>
              <span className="ez:text-site-note">
                <Bar size="long" />
              </span>
              <BlankPrice before="1박" after="원부터" />
              <span className="ez:mt-auto ez:grid ez:grid-cols-2 ez:gap-2">
                <BlankButton variant="outline">자세히</BlankButton>
                <BlankButton>예약</BlankButton>
              </span>
            </Card>
          ))}
        </Cols>
      </Block>
    );
  }
  return (
    <Block slot="room-list">
      <Title>{data.title ?? "객실"}</Title>
      <Cols m={1} pc={3}>
        {rooms.map((r, i) => (
          <Card key={r.id} className="ez:flex ez:flex-col">
            <Pic src={r.image} ratio={1.5} tone={i} />
            <strong className="ez:font-display ez:text-site-item">{r.name}</strong>
            <span className="ez:text-site-note ez:text-muted">{r.specs.join(" · ")}</span>
            <strong className="ez:text-primary ez:tabular-nums">{r.price}</strong>
            {r.left != null && <span className="ez:text-site-note ez:text-muted">{`남은 객실 ${r.left}`}</span>}
            <span className="ez:mt-auto ez:grid ez:grid-cols-2 ez:gap-2">
              <ButtonLink href={r.href ?? "#"} variant="outline">
                자세히
              </ButtonLink>
              <ButtonLink href={r.href ?? "#"}>예약</ButtonLink>
            </span>
          </Card>
        ))}
      </Cols>
    </Block>
  );
}

export function RoomBox({ data, blank }: SectionProps<"room_box">) {
  if (!data.title && !blank) return null;
  return (
    <section data-slot="room-box" data-blank={data.title ? undefined : ""} className="ez:grid ez:text-fg ez:md:grid-cols-[1.4fr_1fr] ez:md:items-center">
      <Pic src={data.image} ratio={1.3} tone={0} />
      <div className="ez:grid ez:gap-2 ez:p-6 ez:text-center">
        {!data.title && (
          <>
            <span className="ez:font-display ez:text-site-item">
              <Bar />
            </span>
            <Lines />
            <BlankButton variant="outline" className="ez:justify-self-center">
              객실 보기
            </BlankButton>
          </>
        )}
        {data.title && <strong className="ez:font-display ez:text-site-item">{data.title}</strong>}
        {data.body && <p className="ez:m-0 ez:text-muted">{data.body}</p>}
        {data.names && <span className="ez:text-site-note">{data.names.join(" · ")}</span>}
        {data.href && (
          <ButtonLink href={data.href} variant="outline" className="ez:justify-self-center">
            객실 보기
          </ButtonLink>
        )}
      </div>
    </section>
  );
}
