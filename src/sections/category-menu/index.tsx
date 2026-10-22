import type { SectionProps } from "../../renderer/registry";

export function CategoryMenu({ context }: SectionProps) {
  if (!context.categories.length) return null;
  return (
    <nav className="ez-categories" aria-label="카테고리">
      {context.categories.map((c) => (
        <a key={c.id} href={`/products?category=${c.id}`}>
          {c.name}
        </a>
      ))}
    </nav>
  );
}
