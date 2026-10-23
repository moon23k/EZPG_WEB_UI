"use client";

import { OverlayFrame, type OverlayProps } from "../dialog/dialog";

export function Sheet(props: OverlayProps) {
  return (
    <OverlayFrame
      {...props}
      slot="sheet"
      className="ez:inset-x-0 ez:bottom-0 ez:mx-auto ez:w-full ez:max-w-140 ez:max-h-[85dvh] ez:overflow-y-auto ez:rounded-t-lg ez:px-page ez:pt-5 ez:pb-7"
    />
  );
}
