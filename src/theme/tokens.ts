import type { TemplateDesign } from "../templates/types";
import type { Design } from "../types";
import { SYSTEM_COLOR, SYSTEM_DURATION, SYSTEM_FONT, SYSTEM_RADIUS, SYSTEM_SITE, SYSTEM_TONE } from "./system";

const FALLBACK: Required<NonNullable<Design["color"]>> = SYSTEM_COLOR;

function buttonRadius(design: Design): string {
  const shape = design.shape ?? {};
  if (shape.button_shape === "pill") return "999px";
  if (shape.button_shape === "square") return `${shape.radius_sm ?? 2}px`;
  return `${shape.radius_md ?? SYSTEM_RADIUS.md}px`;
}

export function designVars(design: Design | null | undefined): Record<string, string> {
  const d = design ?? {};
  const color = { ...FALLBACK, ...(d.color ?? {}) };
  const ratio = (d.imagery?.photo_ratio ?? "1:1").replace(":", " / ");
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
    "--ezd-radius-sm": `${d.shape?.radius_sm ?? SYSTEM_RADIUS.sm}px`,
    "--ezd-radius-md": `${d.shape?.radius_md ?? SYSTEM_RADIUS.md}px`,
    "--ezd-radius-lg": `${d.shape?.radius_lg ?? SYSTEM_RADIUS.lg}px`,
    "--ezd-halo": (d.shape?.radius_lg ?? SYSTEM_RADIUS.lg) === 0 ? "0%" : "5%",
    "--ezd-button-radius": buttonRadius(d),
    "--ezd-line": `${d.shape?.line ?? 0}px`,
    "--ezd-section-gap": `${Math.min(d.density?.section_gap ?? 72, 120)}px`,
    "--ezd-pad": "16px",
    "--ezd-pad-home": `${SYSTEM_SITE.pad}px`,
    "--ezd-wrap": `${SYSTEM_SITE["content-narrow"]}px`,
    "--ezd-wrap-home": `${SYSTEM_SITE.content + SYSTEM_SITE.pad * 2}px`,
    "--ezd-gutter": `${d.density?.grid_gutter ?? 20}px`,
    "--ezd-font-display": SYSTEM_FONT,
    "--ezd-font-body": SYSTEM_FONT,
    "--ezd-display-weight": String(d.font?.display_weight ?? 600),
    "--ezd-tracking": "0em",
    "--ezd-duration": `${d.motion?.duration_ms ?? SYSTEM_DURATION}ms`,
    "--ezd-photo-ratio": ratio,
    "--ezd-overlay": String(d.imagery?.overlay_opacity ?? 0.35),
  };
}

const CORNERS = { 0: [0, 0, 0], 4: [4, 4, 6], 6: [6, 6, 8], 16: [8, 12, 16] } as const;

export function applyTemplate(design: Design | null | undefined, template: TemplateDesign | null | undefined): Design {
  const d = design ?? {};
  if (!template) return d;
  const { look } = template;
  const tone = SYSTEM_TONE[look.tone];
  const corners = look.radius === "pill" ? null : CORNERS[look.radius];
  const shape: Design["shape"] = corners
    ? { radius_sm: corners[0], radius_md: corners[1], radius_lg: corners[2], button_shape: look.radius === 0 ? "square" : "rounded" }
    : { ...d.shape, button_shape: "pill" };
  const font: Design["font"] =
    look.font === "serif"
      ? { ...d.font, display: "Noto Serif KR", display_weight: 600 }
      : look.font === "light"
        ? { ...d.font, display_weight: 300 }
        : d.font;
  return {
    ...d,
    font,
    shape: { ...shape, line: look.line ? 1 : 0 },
    color: { ...d.color, surface: tone.surface, surface_alt: tone["surface-alt"] },
  };
}
