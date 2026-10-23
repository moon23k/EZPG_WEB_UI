import type { SectionProps } from "../../renderer/registry";
import { won } from "../../utils/cn";

export function FreeShippingBar({ context }: SectionProps<"free_shipping_bar">) {
  const threshold = context.shipping?.free_threshold;
  if (!threshold) return null;
  return (
    <p data-slot="free-shipping-bar" className="ez:m-0 ez:rounded-sm ez:bg-primary-tint ez:p-2 ez:text-center ez:text-sm ez:text-fg">
      {won(threshold)} 이상 구매하면 무료 배송
    </p>
  );
}
