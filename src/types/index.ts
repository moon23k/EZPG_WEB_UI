export type Design = {
  font?: { display?: string; body?: string; display_weight?: number; letter_spacing_em?: number };
  shape?: { radius_sm?: number; radius_md?: number; radius_lg?: number; button_shape?: string };
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

export type ProductSummary = {
  id: string;
  name: string;
  list_price: number;
  sale_price: number;
  cover_url: string | null;
  sold_out: boolean;
};

export type Variant = { id: string; label: string | null; price: number; in_stock: boolean };

export type ProductDetail = ProductSummary & {
  option_name: string | null;
  variants: Variant[];
  images: string[];
  non_returnable?: boolean;
};

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

export type CartLine = {
  variant_id: string;
  product_id: string;
  name: string;
  option_label: string | null;
  list_price: number;
  unit_price: number;
  quantity: number;
  line_total: number;
  sellable: boolean;
  enough_stock: boolean;
};

export type Quote = {
  items_total: number;
  product_discount: number;
  coupon_discount: number;
  delivery_fee: number;
  region_fee: number;
  shipping_discount: number;
  point_used: number;
  total: number;
};

export type Faq = { id: string; question: string; answer: string };

export type Category = { id: string; name: string };

export type FormState = { ok?: boolean; error?: string; message?: string; redirect?: string };

export type FormAction = (state: FormState, data: FormData) => Promise<FormState>;
