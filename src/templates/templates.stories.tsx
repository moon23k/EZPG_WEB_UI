import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { business, productDetail } from "../__stories__/fixtures/commerce";
import products from "../__stories__/fixtures/products.json";
import { detailData, homeSections } from "../__stories__/fixtures/templates";
import { BuyBox } from "../blocks/buy-box";
import { ProductGrid } from "../blocks/product-grid";
import { SiteFooter } from "../blocks/site-footer";
import { SiteHeader } from "../blocks/site-header";
import { DetailLayout } from "../details";
import type { DetailData } from "../details/data";
import type { SiteContext } from "../renderer/registry";
import { SiteRenderer } from "../renderer/site-renderer";
import { Rows } from "../sections/kit";
import { ThemeRoot } from "../theme/theme-root";
import { resolveTemplate } from "./index";
import type { TemplateMain } from "./types";

const meta: Meta = { title: "Templates", parameters: { layout: "fullscreen" } };
export default meta;

const context: SiteContext = {
  products: products.slice(0, 8),
  categories: [
    { id: "c1", name: "과일청" },
    { id: "c2", name: "잼" },
    { id: "c3", name: "선물 세트" },
  ],
  faqs: [
    { id: "f1", question: "주문하면 언제 받나요?", answer: "오후 2시 전 주문은 당일 발송해요." },
    { id: "f2", question: "교환 · 반품은 어떻게 하나요?", answer: "받은 날부터 7일 안에 신청해 주세요." },
  ],
  shipping: null,
  flags: {},
};

function shopNodes(): { nodes: Record<string, React.ReactNode>; data: DetailData } {
  const notice = (
    <Rows
      rows={[
        { label: "식품의 유형", value: "과채가공품" },
        { label: "내용량", value: "500ml" },
        { label: "소비기한", value: "제조일로부터 6개월" },
        { label: "제조원", value: "스토어 이름" },
      ]}
    />
  );
  return {
    nodes: {
      buy: <BuyBox product={productDetail} addAction={async () => ({ ok: true })} />,
      body: <p className="ez:m-0 ez:leading-relaxed">제주 자몽을 껍질째 얇게 썰어 원당과 하루 재웠습니다.</p>,
      related: <ProductGrid products={context.products.slice(0, 4)} />,
    },
    data: {
      ...detailData.shop,
      reviews: detailData.class.reviews,
      info: [
        { title: "상품 정보 고시", node: notice },
        { title: "배송", node: <p className="ez:m-0 ez:text-muted">오후 2시 전 주문은 당일 발송 · 배송비 3,000원</p> },
        { title: "교환 · 반품", node: <p className="ez:m-0 ez:text-muted">받은 날부터 7일 안에 신청</p> },
        { title: "후기", node: <p className="ez:m-0 ez:text-muted">후기 128개</p> },
      ],
    },
  };
}

function Page({ main, letter }: { main: TemplateMain; letter: string }) {
  const t = resolveTemplate(main, letter);
  const shop = main === "shop" ? shopNodes() : null;
  const data = shop?.data ?? detailData[main];
  return (
    <ThemeRoot template={t}>
      <div style={{ background: "var(--ezd-surface)", color: "var(--ezd-text)", fontFamily: "var(--ezd-font-body)" }}>
        <SiteHeader name="스토어 이름" variant={t.header} cta={t.cta ? { label: t.cta, href: "/quote" } : null} />
        <main className="ez:mx-auto ez:grid ez:w-full ez:max-w-wrap ez:gap-section ez:px-page ez:py-8">
          <SiteRenderer page={{ sections: homeSections[main] }} context={context} template={t} />
          <hr className="ez:my-4 ez:border-0 ez:border-t ez:border-solid ez:border-primary-border" />
          <DetailLayout slots={t.detail} data={data} nodes={shop?.nodes} />
          {t.extra?.map((x) => (
            <section key={x.name} className="ez:grid ez:gap-6">
              <hr className="ez:my-4 ez:border-0 ez:border-t ez:border-solid ez:border-primary-border" />
              <DetailLayout slots={x.slots} data={data} />
            </section>
          ))}
        </main>
        <SiteFooter storeName="스토어 이름" business={business} hosting="EZPG" policies={[{ key: "terms", title: "이용약관" }, { key: "privacy", title: "개인정보처리방침" }]} variant={t.footer} />
      </div>
    </ThemeRoot>
  );
}

function BlankPage({ main, letter }: { main: TemplateMain; letter: string }) {
  const t = resolveTemplate(main, letter);
  return (
    <ThemeRoot template={t}>
      <div style={{ background: "var(--ezd-surface)", color: "var(--ezd-text)", fontFamily: "var(--ezd-font-body)" }}>
        <SiteHeader name="스토어 이름" variant={t.header} cta={t.cta ? { label: t.cta, href: "/quote" } : null} />
        <main className="ez:mx-auto ez:grid ez:w-full ez:max-w-wrap ez:gap-section ez:px-page ez:py-8">
          <SiteRenderer page={{ sections: [] }} context={{ products: [], categories: [], faqs: [], shipping: null, flags: {} }} template={t} />
        </main>
      </div>
    </ThemeRoot>
  );
}

const blank = (main: TemplateMain, letter: string, name: string): StoryObj => ({ name, render: () => <BlankPage main={main} letter={letter} /> });

const story = (main: TemplateMain, letter: string, name: string): StoryObj => ({ name, render: () => <Page main={main} letter={letter} /> });

export const S1 = story("shop", "a", "쇼핑몰 · S1 테두리 칸 편집형");
export const S2 = story("shop", "b", "쇼핑몰 · S2 소수 상품 쇼케이스형");
export const S3 = story("shop", "c", "쇼핑몰 · S3 기획 묶음 · 매장형");
export const S4 = story("shop", "d", "쇼핑몰 · S4 브랜드 이야기형");
export const C1 = story("class", "a", "클래스 · C1 일정 먼저형");
export const C2 = story("class", "b", "클래스 · C2 클래스 카드형");
export const C3 = story("class", "c", "클래스 · C3 정규반 · 과정형");
export const T1 = story("stay", "a", "숙박 · T1 독채 한 페이지형");
export const T2 = story("stay", "b", "숙박 · T2 객실 검색 · 카드형");
export const T3 = story("stay", "c", "숙박 · T3 B&B 소개형");
export const RoomTerms: StoryObj = {
  name: "숙박 · 객실별 취소 규정",
  render: () => (
    <ThemeRoot>
      <SiteRenderer
        context={context}
        page={{
          sections: [
            {
              kind: "pay_plan",
              data: {
                groups: [
                  {
                    title: "바다 앞 독채",
                    rows: [
                      { label: "이용일 3일 전까지", value: "100% 환불" },
                      { label: "이용일 2일 전부터 당일까지", value: "0% 환불" },
                    ],
                  },
                  { title: "마당 있는 별채", rows: [{ label: "이용 시작 전까지", value: "100% 환불" }] },
                ],
              },
            },
          ],
        }}
      />
    </ThemeRoot>
  ),
};
export const Q1 = story("quote", "a", "견적 · Q1 사례 갤러리형");
export const Q2 = story("quote", "d", "견적 · Q2 시공 견적 계산형");
export const Q3 = story("quote", "b", "견적 · Q3 패키지 확정가형");
export const Q4 = story("quote", "c", "견적 · Q4 프로젝트 문의형");

export const S1Blank = blank("shop", "a", "공란 · S1");
export const S2Blank = blank("shop", "b", "공란 · S2");
export const S3Blank = blank("shop", "c", "공란 · S3");
export const S4Blank = blank("shop", "d", "공란 · S4");
export const C1Blank = blank("class", "a", "공란 · C1");
export const C2Blank = blank("class", "b", "공란 · C2");
export const C3Blank = blank("class", "c", "공란 · C3");
export const T1Blank = blank("stay", "a", "공란 · T1");
export const T2Blank = blank("stay", "b", "공란 · T2");
export const T3Blank = blank("stay", "c", "공란 · T3");
export const Q1Blank = blank("quote", "a", "공란 · Q1");
export const Q2Blank = blank("quote", "d", "공란 · Q2");
export const Q3Blank = blank("quote", "b", "공란 · Q3");
export const Q4Blank = blank("quote", "c", "공란 · Q4");
