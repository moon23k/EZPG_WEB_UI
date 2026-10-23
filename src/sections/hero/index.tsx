import { ButtonLink } from "../../components/button";
import { Photo } from "../../components/photo";
import type { SectionProps } from "../../renderer/registry";
import { cn } from "../../utils/cn";

// With an image the hero splits into text and photo from tablet width; on phones the photo sits below.
export function Hero({ data }: SectionProps<"hero">) {
  if (!data.title) return null;
  return (
    <section
      data-slot="hero"
      className={cn("ez:grid ez:gap-6 ez:text-fg", data.image && "ez:md:grid-cols-2 ez:md:items-center ez:md:gap-10")}
    >
      <div className="ez:grid ez:justify-items-start ez:gap-4">
        <h1 className="ez:m-0 ez:max-w-3xl ez:font-display ez:font-title ez:text-3xl ez:leading-tight ez:tracking-brand ez:text-balance ez:md:text-5xl">
          {data.title}
        </h1>
        {data.sub && <p className="ez:m-0 ez:max-w-2xl ez:text-lg ez:text-muted">{data.sub}</p>}
        <ButtonLink href={data.href ?? "/products"}>{data.button ?? "상품 보기"}</ButtonLink>
      </div>
      {data.image && <Photo src={data.image} alt="" priority sizes="(max-width: 768px) 100vw, 540px" className="ez:aspect-[4/3] ez:rounded-lg" />}
    </section>
  );
}
