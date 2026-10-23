import type { ReactNode } from "react";

export function CheckoutLayout({ main, aside }: { main: ReactNode; aside: ReactNode }) {
  return (
    <div data-slot="checkout-layout" className="ez:grid ez:gap-6 ez:lg:grid-cols-[minmax(0,1fr)_360px] ez:lg:items-start">
      <div className="ez:min-w-0">{main}</div>
      <aside className="ez:grid ez:gap-3 ez:rounded-md ez:bg-surface-alt ez:p-5">{aside}</aside>
    </div>
  );
}
