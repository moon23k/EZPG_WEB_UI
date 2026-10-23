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
    "--ezd-primary": color.primary,
    "--ezd-on-primary": color.on_primary,
    "--ezd-primary-hover": color.primary_hover,
    "--ezd-primary-tint": color.primary_tint,
    "--ezd-primary-border": color.primary_border,
    "--ezd-surface": color.surface,
    "--ezd-surface-alt": color.surface_alt,
    "--ezd-text": color.text,
    "--ezd-muted": color.text_muted,
    "--ezd-radius-sm": `${d.shape?.radius_sm ?? 4}px`,
    "--ezd-radius-md": `${d.shape?.radius_md ?? 8}px`,
    "--ezd-radius-lg": `${d.shape?.radius_lg ?? 14}px`,
    // Empty-state halo: square themes drop it so tile and halo do not read as a frame.
    "--ezd-halo": (d.shape?.radius_lg ?? 14) === 0 ? "0%" : "5%",
    "--ezd-button-radius": buttonRadius(d),
    "--ezd-section-gap": `${Math.min(d.density?.section_gap ?? 72, 120)}px`,
    "--ezd-pad": "16px",
    "--ezd-gutter": `${d.density?.grid_gutter ?? 20}px`,
    "--ezd-font-display": family(d.font?.display),
    "--ezd-font-body": family(d.font?.body),
    "--ezd-display-weight": String(d.font?.display_weight ?? 600),
    "--ezd-tracking": `${d.font?.letter_spacing_em ?? 0}em`,
    "--ezd-duration": `${d.motion?.duration_ms ?? 180}ms`,
    "--ezd-photo-ratio": ratio,
    "--ezd-overlay": String(d.imagery?.overlay_opacity ?? 0.35),
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
