import type { SectionProps } from "../../renderer/registry";
import { won } from "../../utils/cn";

export function FreeShippingBar({ context }: SectionProps) {
  const threshold = context.shipping?.free_threshold;
  if (!threshold) return null;
  return <p className="ez-freebar">{won(threshold)} 이상 구매하면 무료 배송</p>;
}
