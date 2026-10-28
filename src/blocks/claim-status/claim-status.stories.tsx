import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../../components/button";
import { ClaimStatus } from "../../index";
import type { ClaimView } from "../../index";

const meta: Meta<typeof ClaimStatus> = {
  title: "Blocks/ClaimStatus",
  component: ClaimStatus,
  parameters: { layout: "padded" },
};
export default meta;

const claims: ClaimView[] = [
  {
    id: "clm_1",
    kind: "return",
    status: "collecting",
    reason: "사이즈가 맞지 않아요",
    refund_amount: 0,
    approve_note: "택배 기사님이 2일 안에 방문해요",
    created_at: "2026-10-20T03:00:00Z",
  },
  {
    id: "clm_2",
    kind: "exchange",
    status: "rejected",
    reason: "색이 달라요",
    refund_amount: 0,
    reject_reason: "착용 흔적이 있어 교환이 어려워요",
    created_at: "2026-10-12T03:00:00Z",
  },
  { id: "clm_3", kind: "cancel", status: "completed", reason: "다른 상품을 샀어요", refund_amount: 18000, created_at: "2026-10-02T03:00:00Z" },
];

function DefaultExample() {
  return (
    <ClaimStatus
      claims={claims}
      action={(claim) =>
        claim.status === "collecting" ? (
          <Button variant="outline" size="sm">
            반품 철회
          </Button>
        ) : null
      }
    />
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
