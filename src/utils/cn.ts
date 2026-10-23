import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Theme keys must match src/styles/index.css.
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
