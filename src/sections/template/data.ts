import type { Row, Status } from "../kit";

export type Tile = { title: string; image?: string | null; href?: string };

export type Session = {
  id: string;
  date: string;
  time: string;
  name: string;
  length?: string;
  image?: string | null;
  status: Status;
  seats_left?: number | null;
  href?: string;
};

export type ClassCard = { id: string; name: string; image?: string | null; chips?: string[]; price?: string; next?: string; href?: string };

export type Room = { id: string; name: string; image?: string | null; specs: string[]; price: string; left?: number | null; href?: string };

export type Case = { id: string; title: string; image?: string | null; meta?: string; scope?: string; href?: string };

export type Review = { rating: number; body: string; name: string; date?: string };

export type TemplateSectionData = {
  notice_bar: { text?: string | null };
  photo_band: { title?: string | null; image?: string | null };
  category_tiles: { items?: Tile[] };
  testimonial: { quote?: string | null; name?: string | null };
  intro: { title?: string | null; body?: string | null; button?: string | null; href?: string | null };
  curation: { title?: string | null; items?: Tile[] };
  store_info: { title?: string | null; address?: string | null; hours?: string | null; phone?: string | null; image?: string | null };
  reviews: { average?: number | null; count?: number | null; items?: Review[] };
  trust_line: { items?: string[] };
  process_steps: { title?: string | null; steps?: string[] };
  numbers: { items?: { value: string; label: string }[] };
  next_session: { session?: Session | null };
  class_schedule: { title?: string | null; sessions?: Session[] };
  class_list: { title?: string | null; classes?: ClassCard[] };
  gates: { items?: Tile[] };
  search_bar: { href?: string | null };
  booking_strip: { price?: string | null; href?: string | null };
  spec_icons: { items?: string[] };
  gallery: { images?: string[] };
  amenities: { title?: string | null; items?: { name: string; group?: string }[] };
  house_rules: { check_in?: string | null; check_out?: string | null; rules?: string[] };
  pay_plan: { title?: string | null; rows?: Row[] };
  location: { address?: string | null; note?: string | null; href?: string | null };
  room_list: { title?: string | null; rooms?: Room[] };
  room_box: { title?: string | null; body?: string | null; names?: string[]; image?: string | null; href?: string | null };
  price_tiers: { title?: string | null; items?: Row[] };
  package_cards: { title?: string | null; tabs?: string[]; items?: { name: string; price: string; includes?: string[]; href?: string }[] };
  case_grid: { title?: string | null; categories?: string[]; cases?: Case[] };
  case_cards: { title?: string | null; categories?: string[]; cases?: Case[] };
  before_after: { before?: string | null; after?: string | null };
};
