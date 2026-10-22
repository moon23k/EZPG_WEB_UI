import type { Design } from "../types";

const FALLBACK: Required<NonNullable<Design["color"]>> = {
  primary: "#2f4a3a",
  on_primary: "#ffffff",
  primary_hover: "#22362a",
  primary_tint: "#eef2ef",
  primary_border: "#c2cdc6",
  surface: "#fbfaf7",
  surface_alt: "#f3f1ec",
  text: "#1c1b19",
  text_muted: "#5f5c56",
};

const FONT_FALLBACK = '"Pretendard", "Noto Sans KR", system-ui, sans-serif';

function family(name: string | undefined): string {
  return name ? `"${name}", ${FONT_FALLBACK}` : FONT_FALLBACK;
}

function buttonRadius(design: Design): string {
  const shape = design.shape ?? {};
  if (shape.button_shape === "pill") return "999px";
  if (shape.button_shape === "square") return `${shape.radius_sm ?? 2}px`;
  return `${shape.radius_md ?? 6}px`;
}

export function designVars(design: Design | null | undefined): Record<string, string> {
  const d = design ?? {};
  const color = { ...FALLBACK, ...(d.color ?? {}) };
  const ratio = (d.imagery?.photo_ratio ?? "4:5").replace(":", " / ");
  return {
    "--ez-primary": color.primary,
    "--ez-on-primary": color.on_primary,
    "--ez-primary-hover": color.primary_hover,
    "--ez-primary-tint": color.primary_tint,
    "--ez-primary-border": color.primary_border,
    "--ez-surface": color.surface,
    "--ez-surface-alt": color.surface_alt,
    "--ez-text": color.text,
    "--ez-muted": color.text_muted,
    "--ez-radius-sm": `${d.shape?.radius_sm ?? 4}px`,
    "--ez-radius-md": `${d.shape?.radius_md ?? 8}px`,
    "--ez-radius-lg": `${d.shape?.radius_lg ?? 14}px`,
    "--ez-button-radius": buttonRadius(d),
    "--ez-section-gap": `${Math.min(d.density?.section_gap ?? 72, 120)}px`,
    "--ez-gutter": `${d.density?.grid_gutter ?? 20}px`,
    "--ez-font-display": family(d.font?.display),
    "--ez-font-body": family(d.font?.body),
    "--ez-display-weight": String(d.font?.display_weight ?? 600),
    "--ez-tracking": `${d.font?.letter_spacing_em ?? 0}em`,
    "--ez-duration": `${d.motion?.duration_ms ?? 180}ms`,
    "--ez-photo-ratio": ratio,
  };
}

export function fontHref(design: Design | null | undefined): string | null {
  const names = [design?.font?.display, design?.font?.body].filter(
    (n, i, all): n is string => Boolean(n) && all.indexOf(n) === i,
  );
  if (!names.length) return null;
  const families = names.map((n) => `family=${encodeURIComponent(n)}:wght@400;600;700`);
  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}
