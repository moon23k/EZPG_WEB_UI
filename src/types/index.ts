import type { Schemas } from "./contract";

export type { Schemas };

export type Design = {
  font?: { display?: string; body?: string; display_weight?: number; letter_spacing_em?: number };
  shape?: { radius_sm?: number; radius_md?: number; radius_lg?: number; button_shape?: "rounded" | "pill" | "square" };
  density?: { section_gap?: number; grid_gutter?: number };
  motion?: { duration_ms?: number };
  imagery?: { photo_ratio?: string; overlay_opacity?: number };
  color?: Partial<
    Record<
      | "primary"
      | "on_primary"
      | "primary_hover"
      | "primary_tint"
      | "primary_border"
      | "surface"
      | "surface_alt"
      | "text"
      | "text_muted",
      string
    >
  >;
};

export type Section = { kind: string; v?: number; when?: string; data: Record<string, unknown> };

export type ProductSummary = Schemas["CustomerProductSummary"];

export type Variant = Schemas["CustomerVariant"];

export type ProductDetail = ProductSummary &
  Pick<Schemas["CustomerProduct"], "option_name" | "variants" | "images"> &
  Partial<Pick<Schemas["CustomerProduct"], "non_returnable">>;

export type OrderStatus = Schemas["OrderStatus"];

export type CustomerProvider = Schemas["CustomerProvider"];

export type Business = {
  name: string;
  ceo_name: string;
  address: string;
  registration_no: string;
  mail_order_no: string | null;
  cs_phone: string | null;
  cs_email: string | null;
};

export type Shipping = {
  base_fee: number;
  free_threshold: number | null;
  return_fee: number;
  exchange_fee: number;
  return_days: number;
};

export type CartLine = Schemas["CartLineOut"];

export type Quote = Pick<
  Schemas["OrderOut"],
  | "items_total"
  | "product_discount"
  | "coupon_discount"
  | "delivery_fee"
  | "region_fee"
  | "shipping_discount"
  | "point_used"
  | "total"
>;

export type Faq = { id: string; question: string; answer: string };

export type Category = { id: string; name: string };

export type FormState = { ok?: boolean; error?: string; message?: string; redirect?: string };

export type FormAction = (state: FormState, data: FormData) => Promise<FormState>;
