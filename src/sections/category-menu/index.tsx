import NextLink from "next/link";
import type { SectionProps } from "../../renderer/registry";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export function CategoryMenu({ context }: SectionProps<"category_menu">) {
  if (!context.categories.length) return null;
  return (
    <nav data-slot="category-menu" aria-label="카테고리" className="ez:flex ez:flex-wrap ez:gap-2">
      {context.categories.map((c) => (
        <NextLink
          key={c.id}
          href={`/products?category=${c.id}`}
          className={cn(
            "ez:rounded-full ez:border ez:border-solid ez:border-primary-border ez:px-3.5 ez:py-2 ez:text-sm ez:text-fg ez:no-underline ez:hover:bg-primary-tint",
            focusRing,
          )}
        >
          {c.name}
        </NextLink>
      ))}
    </nav>
  );
}
