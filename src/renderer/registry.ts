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

export type SectionProps = { data: Record<string, unknown>; context: SiteContext };

export const sections: Record<string, ComponentType<SectionProps>> = {
  hero: Hero,
  story: BrandStory,
  product_grid: ProductList,
  maker_profile: Maker,
  faq: FaqSection,
  category_menu: CategoryMenu,
  free_shipping_bar: FreeShippingBar,
};
