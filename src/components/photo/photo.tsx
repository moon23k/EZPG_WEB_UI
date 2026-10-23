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
      className={cn("ez:relative ez:w-full ez:aspect-photo ez:overflow-hidden ez:rounded-md ez:bg-surface-alt", className)}
    >
      {src && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="ez:object-cover" />}
    </div>
  );
}
