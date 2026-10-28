import { ButtonLink } from "../../components/button";
import { Photo } from "../../components/photo";
import type { SectionProps } from "../../renderer/registry";
import { cn } from "../../utils/cn";
import { line, Pic } from "../kit";

function Heading({ title, sub, inverse }: { title: string; sub?: string | null; inverse?: boolean }) {
  return (
    <>
      <h1
        className={cn(
          "ez:m-0 ez:max-w-3xl ez:font-display ez:font-title ez:text-3xl ez:leading-tight ez:tracking-brand ez:text-balance ez:md:text-5xl",
          inverse && "ez:text-on-primary",
        )}
      >
        {title}
      </h1>
      {sub && <p className={cn("ez:m-0 ez:max-w-2xl ez:text-lg", inverse ? "ez:text-on-primary" : "ez:text-muted")}>{sub}</p>}
    </>
  );
}

export function Hero({ data, variant }: SectionProps<"hero">) {
  if (!data.title) return null;
  const href = data.href ?? "/products";
  const button = data.button ?? "상품 보기";
  const image = data.image ?? data.images?.[0];

  if (variant === "box") {
    return (
      <section data-slot="hero" data-variant="box" className={cn("ez:grid ez:text-fg ez:md:grid-cols-2", line)}>
        <Pic src={image} ratio={1} />
        <div className="ez:grid ez:content-center ez:justify-items-start ez:gap-4 ez:p-6 ez:md:p-10">
          <Heading title={data.title} sub={data.sub} />
          <ButtonLink href={href}>{button}</ButtonLink>
        </div>
      </section>
    );
  }

  if (variant === "full" || variant === "slide" || variant === "rounded" || variant === "card") {
    const count = data.images?.length ?? 0;
    return (
      <section
        data-slot="hero"
        data-variant={variant}
        className={cn(
          "ez:relative ez:grid ez:overflow-hidden",
          variant === "slide" ? "ez:aspect-[1.6] ez:md:aspect-[2.6]" : "ez:aspect-[0.8] ez:md:aspect-[2.4]",
          (variant === "rounded" || variant === "card") && "ez:rounded-lg",
        )}
      >
        <Photo src={image} alt="" preload sizes="100vw" className="ez:absolute ez:inset-0 ez:aspect-auto ez:h-full ez:rounded-none" />
        <div className="ez:absolute ez:inset-0 ez:bg-[rgb(0_0_0/var(--ezd-overlay))]" aria-hidden="true" />
        <div className="ez:relative ez:grid ez:content-end ez:justify-items-start ez:gap-4 ez:p-6 ez:md:p-12">
          <Heading title={data.title} sub={data.sub} inverse />
          <ButtonLink href={href}>{button}</ButtonLink>
          {variant === "slide" && count > 1 && (
            <span className="ez:text-sm ez:text-on-primary" aria-hidden="true">
              {Array.from({ length: count }, (_, i) => (i === 0 ? "●" : "○")).join(" ")}
            </span>
          )}
        </div>
      </section>
    );
  }

  if (variant === "text") {
    return (
      <section data-slot="hero" data-variant="text" className="ez:grid ez:justify-items-center ez:gap-6 ez:text-center ez:text-fg">
        <Heading title={data.title} sub={data.sub} />
        {image && <Pic src={image} ratio={1.4} className="ez:md:max-w-3xl" />}
      </section>
    );
  }

  return (
    <section data-slot="hero" className={cn("ez:grid ez:gap-6 ez:text-fg", image && "ez:md:grid-cols-2 ez:md:items-center ez:md:gap-10")}>
      <div className="ez:grid ez:justify-items-start ez:gap-4">
        <Heading title={data.title} sub={data.sub} />
        <ButtonLink href={href}>{button}</ButtonLink>
      </div>
      {image && <Photo src={image} alt="" preload sizes="(max-width: 768px) 100vw, 540px" className="ez:aspect-[4/3] ez:rounded-lg" />}
    </section>
  );
}
