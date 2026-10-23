import NextLink from "next/link";
import type { SectionProps } from "../../renderer/registry";
import type { Category } from "../../types";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

const chip = cn(
  "ez:inline-flex ez:min-h-10 ez:shrink-0 ez:items-center ez:rounded-full ez:border ez:border-solid ez:border-primary-border ez:px-4 ez:text-sm ez:text-fg ez:no-underline ez:hover:bg-primary-tint",
  "ez:aria-[current=page]:border-primary ez:aria-[current=page]:bg-primary ez:aria-[current=page]:text-on-primary",
  focusRing,
);

// One scrolling row on phones; "전체" leads and is marked current when no category is chosen.
export function CategoryChips({ categories, current }: { categories: Category[]; current?: string | null }) {
  if (!categories.length) return null;
  return (
    <nav data-slot="category-menu" aria-label="카테고리" className="ez:-mx-page ez:flex ez:gap-2 ez:overflow-x-auto ez:px-page ez:md:mx-0 ez:md:flex-wrap ez:md:px-0">
      <NextLink href="/products" aria-current={current ? undefined : "page"} className={chip}>
        전체
      </NextLink>
      {categories.map((c) => (
        <NextLink key={c.id} href={`/products?category=${c.id}`} aria-current={current === c.id ? "page" : undefined} className={chip}>
          {c.name}
        </NextLink>
      ))}
    </nav>
  );
}

export function CategoryMenu({ context }: SectionProps<"category_menu">) {
  return <CategoryChips categories={context.categories} />;
}
