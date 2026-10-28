import type { ReactNode } from "react";
import type { Row } from "../sections/kit";
import type { Review, Session } from "../sections/template/data";

export type Cohort = { title: string; period: string; count: string; status: Session["status"]; seats_left?: number | null; dates?: string[]; href?: string };

export type CalendarDay = { day: number; price?: string; state: "open" | "closed" | "picked" };

export type DetailData = {
  title?: string;
  price?: string;
  status?: string;
  chips?: string[];
  rows?: Row[];
  ship?: string;
  images?: string[];
  info?: { title: string; node: ReactNode; open?: boolean }[];
  sessions?: Session[];
  steps?: string[];
  prep?: { title: string; body: string }[];
  teacher?: { name: string; body: string; image?: string | null };
  curriculum?: { title: string; body: string }[];
  cohorts?: Cohort[];
  timetable?: { days: string[]; rows: { time: string; open: boolean[] }[] };
  refund?: Row[];
  location?: { address: string; note?: string; href?: string };
  amenities?: { name: string; group?: string }[];
  rules?: { check_in?: string; check_out?: string; rules?: string[] };
  pay?: Row[];
  calendar?: { month: string; days: CalendarDay[] };
  total?: { rows: Row[]; total: string; button: string; href?: string; note?: string };
  form?: { steps: string[]; groups: { label: string; options: string[] }[]; total?: string; button: string };
  estimate?: { no: string; valid: string; items: Row[]; total: string; deposit: string; accept: string; change?: string; href?: string };
  reviews?: { average?: number; count?: number; items: Review[] };
  photo_reviews?: string[];
};
