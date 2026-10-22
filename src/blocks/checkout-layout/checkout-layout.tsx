import type { ReactNode } from "react";

export function CheckoutLayout({ main, aside }: { main: ReactNode; aside: ReactNode }) {
  return (
    <div className="ez-checkout">
      <div className="ez-checkout__main">{main}</div>
      <aside className="ez-checkout__aside">{aside}</aside>
    </div>
  );
}
