import { klass } from "./class";
import { quote } from "./quote";
import { shop } from "./shop";
import { stay } from "./stay";
import type { TemplateDesign, TemplateLetter, TemplateMain } from "./types";

export type * from "./types";

export const templates: Record<TemplateMain, TemplateDesign[]> = { shop, class: klass, stay, quote };

export function templateLetters(): Record<TemplateMain, TemplateLetter[]> {
  return Object.fromEntries(Object.entries(templates).map(([main, list]) => [main, list.map((t) => t.letter)])) as Record<
    TemplateMain,
    TemplateLetter[]
  >;
}

export function resolveTemplate(main: string | null | undefined, letter: string | null | undefined): TemplateDesign {
  const list = templates[(main ?? "shop") as TemplateMain] ?? templates.shop;
  return list.find((t) => t.letter === letter) ?? list[0];
}
