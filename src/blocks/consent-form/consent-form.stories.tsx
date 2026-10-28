import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, ConsentForm, GUEST_PRIVACY_TEXT } from "../../index";

const meta: Meta<typeof ConsentForm> = {
  title: "Blocks/ConsentForm",
  component: ConsentForm,
  parameters: { layout: "padded" },
};
export default meta;

function DefaultExample() {
  return (
    <div className="ez:max-w-md">
      <ConsentForm
        guest
        terms={[
          { title: "개인정보 수집·이용 동의", body: GUEST_PRIVACY_TEXT },
          { title: "개인정보 제3자 제공 동의", body: "제공받는 자: 배송업체 / 항목: 이름, 휴대폰 번호, 배송지 / 목적: 상품 배송" },
          { title: "결제대행 서비스 이용약관", body: "전자금융거래 이용약관, 개인정보 수집·이용 및 제3자 제공에 동의합니다." },
        ]}
      >
        {(ready) => (
          <Button block disabled={!ready}>
            136,500원 결제하기
          </Button>
        )}
      </ConsentForm>
    </div>
  );
}

export const Default: StoryObj = { render: () => <DefaultExample /> };
