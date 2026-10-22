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
  if (!src) return <div className={cn("ez-photo", "ez-photo--empty", className)} aria-hidden="true" />;
  return (
    <img
      className={cn("ez-photo", className)}
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
