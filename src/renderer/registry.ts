import type { ComponentType } from "react";
import { BrandStory } from "../sections/brand-story";
import { CategoryMenu } from "../sections/category-menu";
import { FaqSection } from "../sections/faq";
import { FreeShippingBar } from "../sections/free-shipping-bar";
import { Hero } from "../sections/hero";
import { Maker } from "../sections/maker";
import { ProductList } from "../sections/product-list";
import type { Category, Faq, ProductSummary, Shipping } from "../types";

export type SiteContext = {
  products: ProductSummary[];
  categories: Category[];
  faqs: Faq[];
  shipping: Shipping | null;
  flags: Record<string, boolean>;
};

// Mirrors EZPG_API app/brand/site/service.py `_section()`. Kinds without generated copy read only from context.
export type SectionData = {
  hero: { title?: string | null; sub?: string | null; button?: string | null; href?: string | null };
  story: { title?: string | null; body?: string[]; strengths?: { title: string; body: string }[] };
  product_grid: { title?: string | null; lines?: Record<string, string> };
  maker_profile: { line?: string | null };
  faq: Record<string, never>;
  category_menu: Record<string, never>;
  free_shipping_bar: Record<string, never>;
};

export type SectionKind = keyof SectionData;

export type SectionProps<K extends SectionKind = SectionKind> = { data: SectionData[K]; context: SiteContext };

export const sections: { [K in SectionKind]: ComponentType<SectionProps<K>> } = {
  hero: Hero,
  story: BrandStory,
  product_grid: ProductList,
  maker_profile: Maker,
  faq: FaqSection,
  category_menu: CategoryMenu,
  free_shipping_bar: FreeShippingBar,
};
