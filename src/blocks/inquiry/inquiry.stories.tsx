import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InquiryList, InquiryThread } from "../../index";
import type { InquiryMessageView, InquiryRow } from "../../index";

const meta: Meta<typeof InquiryThread> = {
  title: "Blocks/Inquiry",
  component: InquiryThread,
  parameters: { layout: "padded" },
};
export default meta;

const rows: InquiryRow[] = [
  { id: "inq_1", status: "answered", needs_partner: false, preview: "배송비가 얼마예요?", last_message_at: "2026-10-28T03:00:00Z" },
  {
    id: "inq_2",
    status: "open",
    needs_partner: true,
    preview: "사이즈 교환 되나요?",
    order_number: "20261028-00004",
    last_message_at: "2026-10-27T03:00:00Z",
  },
];

const messages: InquiryMessageView[] = [
  { author: "customer", body: "배송비가 얼마예요?", created_at: "2026-10-28T03:00:00Z" },
  { author: "ai", body: "배송비는 3,000원이고, 50,000원 이상 구매하면 무료예요.", created_at: "2026-10-28T03:00:20Z" },
  { author: "partner", body: "추가로 궁금한 점 있으면 남겨 주세요.", created_at: "2026-10-28T05:00:00Z" },
];

function ListExample() {
  return <InquiryList inquiries={rows} />;
}

function ThreadExample() {
  return <InquiryThread messages={messages} />;
}

export const List: StoryObj = { render: () => <ListExample /> };

export const Thread: StoryObj = { render: () => <ThreadExample /> };
