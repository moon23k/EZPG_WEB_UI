import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import longest from "../__stories__/fixtures/longest.json";
import products from "../__stories__/fixtures/products.json";
import site from "../__stories__/fixtures/site.json";
import { SiteRenderer, type Section, type SiteContext } from "../index";

const meta: Meta<typeof SiteRenderer> = {
  title: "Site/Home",
  component: SiteRenderer,
  parameters: { layout: "fullscreen" },
};
export default meta;

const context: SiteContext = {
  products,
  categories: [
    { id: "c1", name: "셔츠" },
    { id: "c2", name: "니트" },
    { id: "c3", name: "소품" },
  ],
  faqs: [
    { id: "f1", question: "당일 배송이 되나요?", answer: "오후 2시 전 주문은 당일 배송됩니다." },
    { id: "f2", question: "선물 포장이 되나요?", answer: "주문서 요청 사항에 적어 주시면 무료로 포장해 드려요." },
  ],
  shipping: { base_fee: 3500, free_threshold: 50000, return_fee: 3500, exchange_fee: 7000, return_days: 7 },
  flags: {},
};

const sections = site.pages.home.sections as Section[];

function Home({ page, faqs = context.faqs }: { page: Section[]; faqs?: SiteContext["faqs"] }) {
  return (
    <main className="ez:mx-auto ez:w-full ez:max-w-270 ez:px-page ez:py-6">
      <SiteRenderer page={{ sections: page }} context={{ ...context, faqs }} />
    </main>
  );
}

export const Default: StoryObj = { render: () => <Home page={sections} /> };

export const LongestCopy: StoryObj = {
  render: () => (
    <Home
      page={sections.map((s) => (s.kind === "hero" ? { ...s, data: { ...s.data, title: longest.heroTitle, sub: longest.heroSubtitle } } : s))}
      faqs={[{ id: "f1", question: longest.faqQuestion, answer: longest.faqAnswer }]}
    />
  ),
};
