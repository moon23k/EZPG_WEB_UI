import Image from "next/image";
import { cn } from "../../utils/cn";

export function Photo({
  src,
  alt,
  priority,
  sizes = "(max-width: 640px) 50vw, 320px",
  className,
}: {
  src: string | null | undefined;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      data-slot="photo"
      data-empty={src ? undefined : ""}
      className={cn(
        "ez:relative ez:box-border ez:w-full ez:aspect-photo ez:overflow-hidden ez:rounded-md",
        !src && "ez:flex ez:items-center ez:justify-center ez:border ez:border-solid ez:border-muted/40",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="ez:object-cover" />
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="ez:size-7 ez:text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="M21 16l-5-5-9 9" />
        </svg>
      )}
    </div>
  );
}
