export type TemplateMain = "shop" | "class" | "stay" | "quote";

export type TemplateLetter = "a" | "b" | "c" | "d";

export type SurfaceTone = "white" | "paper" | "cream" | "warm" | "mist";

export type Look = {
  tone: SurfaceTone;
  radius: 0 | 4 | 6 | 16 | "pill";
  line: boolean;
  font: "sans" | "serif" | "light";
};

export type HeaderVariant = "center" | "transparent" | "dark" | "left" | "pill" | "cta" | "band";

export type FooterVariant = "full" | "line";

export type HeroVariant = "box" | "full" | "slide" | "rounded" | "card" | "text";

export type GridSpec = { m: 1 | 2 | 3; pc: 3 | 4 | 6; ratio: number; meta?: "price" | "status" };

export type HomeSlot = { kind: string; variant?: string; grid?: GridSpec };

export type DetailSlot = { kind: string; variant?: string; side?: boolean };

export type TemplateDesign = {
  id: string;
  main: TemplateMain;
  letter: TemplateLetter;
  name: string;
  look: Look;
  header: HeaderVariant;
  cta?: string;
  footer: FooterVariant;
  home: HomeSlot[];
  detail: DetailSlot[];
  extra?: { name: string; slots: DetailSlot[] }[];
};
