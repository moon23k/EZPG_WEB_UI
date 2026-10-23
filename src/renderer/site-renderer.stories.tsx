import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import products from "../../fixtures/products.json";
import site from "../../fixtures/site.json";
import type { Section } from "../types";
import { SiteRenderer } from "./site-renderer";

const context = {
  products,
  categories: [
    { id: "c1", name: "꽃다발" },
    { id: "c2", name: "꽃바구니" },
    { id: "c3", name: "화분" },
    { id: "c4", name: "정기구독" },
  ],
  faqs: [
    { id: "f1", question: "당일 배송이 되나요?", answer: "오후 2시 전 주문은 당일 배송됩니다." },
    { id: "f2", question: "메시지 카드를 넣을 수 있나요?", answer: "주문서의 요청 사항에 적어 주시면 손으로 써 드려요." },
  ],
  shipping: { base_fee: 3500, free_threshold: 50000, return_fee: 3500, exchange_fee: 7000, return_days: 7 },
  flags: {},
};

const meta: Meta<typeof SiteRenderer> = {
  title: "renderer/site-renderer",
  component: SiteRenderer,
  decorators: [(Story) => <main className="ez:mx-auto ez:w-full ez:max-w-270 ez:px-page ez:py-6"><Story /></main>],
  args: { page: { sections: site.pages.home.sections as Section[] }, context },
};
export default meta;
type Story = StoryObj<typeof SiteRenderer>;

export const Home: Story = {};
export const EmptyStore: Story = { args: { context: { ...context, products: [], categories: [], faqs: [], shipping: null } } };
