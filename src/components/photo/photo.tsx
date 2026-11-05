import { cn } from "../../utils/cn";
import { PhotoImage } from "./photo-image";

const TILES = ["ez:bg-tile-1", "ez:bg-tile-2", "ez:bg-tile-3", "ez:bg-tile-4", "ez:bg-tile-5"];
const STRONG_TILES = ["ez:bg-tile-strong-1", "ez:bg-tile-strong-2", "ez:bg-tile-strong-3", "ez:bg-tile-strong-4"];

function seed(text: string): number {
  let value = 0;
  for (const char of text) value = (value * 31 + char.charCodeAt(0)) % 9973;
  return value;
}

export function Photo({
  src,
  alt,
  preload,
  sizes = "(max-width: 640px) 50vw, 320px",
  className,
  tone,
  strong,
  iconClassName,
}: {
  src: string | null | undefined;
  alt: string;
  preload?: boolean;
  sizes?: string;
  className?: string;
  tone?: number;
  strong?: boolean;
  iconClassName?: string;
}) {
  const tiles = strong ? STRONG_TILES : TILES;
  return (
    <div
      data-slot="photo"
      data-empty={src ? undefined : ""}
      className={cn(
        "ez:relative ez:box-border ez:flex ez:w-full ez:items-center ez:justify-center ez:aspect-photo ez:overflow-hidden ez:rounded-md",
        tiles[(tone ?? seed(alt)) % tiles.length],
        strong ? "ez:text-tile-ink-strong" : "ez:text-tile-ink",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn("ez:size-8 ez:max-h-2/5 ez:max-w-2/5", iconClassName)}
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
      {src && <PhotoImage key={src} src={src} alt={alt} sizes={sizes} preload={preload} />}
    </div>
  );
}
