import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { productDetail } from "../../__stories__/fixtures/commerce";
import { BuyBox } from "../../index";

const meta: Meta<typeof BuyBox> = {
  title: "Blocks/BuyBox",
  component: BuyBox,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <BuyBox
      product={productDetail}
      addAction={async () => ({ ok: true, message: "린넨 셔츠 · S 1개를 담았어요." })}
    />
  );
}

function LongNameExample() {
  return (
    <BuyBox
      product={{
        ...productDetail,
        name: "프렌치 린넨과 코튼을 섞은 봄 한정 파스텔 오버핏 셔츠 (선물 포장 포함)",
        option_name: "사이즈 · 구성",
        variants: [
          { id: "v1", label: "S (가슴 단면 약 52cm)", price: 42000, in_stock: true, arrivals: 0 },
          { id: "v2", label: "XL (가슴 단면 약 64cm · 여유 있는 품)", price: 128000, in_stock: true, arrivals: 0 },
        ],
      }}
      addAction={async () => ({})}
    />
  );
}

function NotSellingExample() {
  return <BuyBox product={productDetail} selling={false} addAction={async () => ({})} />;
}

function SoldOutExample() {
  return (
    <BuyBox
      product={{ ...productDetail, name: "울 가디건", list_price: 89000, sale_price: 79000, option_name: null, sold_out: true, variants: [{ id: "v7", label: null, price: 79000, in_stock: false, arrivals: 0 }] }}
      addAction={async () => ({})}
      restockAction={async () => {}}
    />
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };

export const LongName: StoryObj = { render: () => <LongNameExample /> };

export const NotSelling: StoryObj = { render: () => <NotSellingExample /> };

export const SoldOut: StoryObj = { render: () => <SoldOutExample /> };
