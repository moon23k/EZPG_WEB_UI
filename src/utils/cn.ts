import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the `ez:` prefix and the theme keys defined in src/styles/index.css,
// so a block passing `ez:rounded-button` to a component replaces its `ez:rounded-md`.
const merge = extendTailwindMerge({
  prefix: "ez",
  extend: {
    theme: {
      radius: ["button"],
      spacing: ["gutter", "section", "page"],
      font: ["display", "body"],
      "font-weight": ["title"],
      tracking: ["brand"],
      aspect: ["photo"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return merge(clsx(inputs));
}

export function won(value: number): string {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function kstDate(value: string | null | undefined): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}
