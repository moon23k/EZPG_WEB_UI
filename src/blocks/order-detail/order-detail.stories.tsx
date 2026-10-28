import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { order, pendingOrder } from "../../__stories__/fixtures/commerce";
import { Button, OrderActionBar, OrderDetail } from "../../index";

const meta: Meta<typeof OrderDetail> = {
  title: "Blocks/OrderDetail",
  component: OrderDetail,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <OrderDetail
      order={order}
      imageSrc={{}}
      actions={
        <OrderActionBar primary={<Button>구매 확정</Button>}>
          <Button variant="secondary">반품 신청</Button>
          <Button variant="secondary">교환 신청</Button>
        </OrderActionBar>
      }
    />
  );
}

function PendingExample() {
  return <OrderDetail order={pendingOrder} />;
}

function PickupExample() {
  return (
    <OrderDetail
      order={{
        ...order,
        status: "preparing",
        fulfillment: "pickup",
        ready_at: "2026-10-23T05:00:00Z",
        pickup: { name: "온기상점 마포 쇼룸", address: "서울특별시 마포구 월드컵북로 12 1층", hours: "화–일 11:00–19:00" },
        items: order.items.map((item, i) => (i === 0 ? { ...item, slot_starts_at: "2026-10-24T06:00:00Z" } : item)),
      }}
    />
  );
}

function ClassExample() {
  return (
    <OrderDetail
      order={{
        ...order,
        status: "paid",
        fulfillment: "visit",
        items: [{ ...order.items[0], product_name: "린넨 셔츠 만들기 원데이 클래스", option_label: "1인", slot_starts_at: "2026-11-02T05:00:00Z" }],
      }}
    />
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };

export const Pending: StoryObj = { render: () => <PendingExample /> };

export const Pickup: StoryObj = { render: () => <PickupExample /> };

export const Class: StoryObj = { render: () => <ClassExample /> };
