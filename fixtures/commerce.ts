import type { AddressRow, OrderRow, OrderView, ReviewItem } from "../src";
import type { Business, CartLine, ProductDetail, Quote } from "../src/types";

export const productDetail: ProductDetail = {
  id: "p1",
  name: "라넌큘러스 핸드타이드",
  list_price: 58000,
  sale_price: 52000,
  cover_url: null,
  sold_out: false,
  option_name: "사이즈",
  variants: [
    { id: "v1", label: "S", price: 42000, in_stock: true },
    { id: "v2", label: "M", price: 52000, in_stock: true },
    { id: "v3", label: "L", price: 68000, in_stock: false },
  ],
  images: [],
  non_returnable: true,
};

export const cartLines: CartLine[] = [
  { variant_id: "v2", product_id: "p1", name: "라넌큘러스 핸드타이드", option_label: "M", image_key: null, list_price: 58000, unit_price: 52000, quantity: 1, line_total: 52000, sellable: true, enough_stock: true },
  { variant_id: "v9", product_id: "p2", name: "튤립 꽃다발", option_label: null, image_key: null, list_price: 42000, unit_price: 42000, quantity: 2, line_total: 84000, sellable: true, enough_stock: true },
];

export const blockedLine: CartLine = { ...cartLines[1], variant_id: "v10", name: "작약 꽃바구니", enough_stock: false };

export const quote: Quote = {
  items_total: 136000,
  product_discount: 6000,
  coupon_discount: 5000,
  delivery_fee: 3500,
  region_fee: 3000,
  shipping_discount: 0,
  point_used: 1000,
  total: 130500,
};

export const order: OrderView = {
  number: "20261022-00012",
  status: "shipped",
  created_at: "2026-10-22T03:12:00Z",
  ...quote,
  ship_recipient: "김온기",
  ship_postal_code: "03925",
  ship_address: "서울특별시 마포구 월드컵북로 12",
  ship_address_detail: "3층",
  items: [
    { id: "i1", product_name: "라넌큘러스 핸드타이드", option_label: "M", quantity: 1, paid_amount: 49000, refunded_amount: 0, non_returnable: true },
    { id: "i2", product_name: "튤립 꽃다발", option_label: null, quantity: 2, paid_amount: 78000, refunded_amount: 39000, non_returnable: false },
  ],
  shipments: [{ carrier: "CJ대한통운", tracking_no: "6543 2109 8765" }],
};

export const orders: OrderRow[] = [
  { number: "20261022-00012", status: "shipped", total: 130500, created_at: "2026-10-22T03:12:00Z" },
  { number: "20261015-00003", status: "completed", total: 42000, created_at: "2026-10-15T09:00:00Z" },
  { number: "20261001-00041", status: "canceled", total: 89000, created_at: "2026-10-01T01:30:00Z" },
];

export const addresses: AddressRow[] = [
  { id: "a1", recipient: "김온기", phone: "010-1234-5678", postal_code: "03925", address: "서울특별시 마포구 월드컵북로 12", address_detail: "3층", is_default: true },
  { id: "a2", recipient: "이꽃님", phone: "010-9876-5432", postal_code: "13529", address: "경기도 성남시 분당구 판교역로 235", address_detail: null, is_default: false },
];

export const reviews: ReviewItem[] = [
  { id: "r1", rating: 5, body: "사진보다 실물이 더 예뻐요.", reply: "소중한 후기 감사합니다.", created_at: "2026-10-20T00:00:00Z" },
  { id: "r2", rating: 4, body: "향이 좋고 오래가요.\n배송도 빨랐습니다.", created_at: "2026-10-18T00:00:00Z" },
];

export const business: Business = {
  name: "온기꽃방",
  ceo_name: "김온기",
  address: "서울특별시 마포구 월드컵북로 12",
  registration_no: "123-45-67890",
  mail_order_no: "2026-서울마포-0123",
  cs_phone: "02-123-4567",
  cs_email: "hello@ongi.kr",
};
