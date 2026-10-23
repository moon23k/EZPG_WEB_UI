import type { ReactNode } from "react";

// Two-tone line icons for empty states. Rule: the subject's silhouette is currentColor (theme primary),
// inner detail and context use the muted colour. 24 grid, 1.75 stroke, round caps, 1.5–2 corner radii.
const detail = "ez:stroke-muted";

function Icon({ children, size = 40 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="ez:block ez:shrink-0"
    >
      {children}
    </svg>
  );
}

export const ProductsIcon = () => (
  <Icon>
    <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
    <path d="M3.5 7.5L12 12l8.5-4.5M12 12v9" className={detail} />
  </Icon>
);

export const BagIcon = () => (
  <Icon>
    <path d="M9 8V7a3 3 0 0 1 6 0v1" className={detail} />
    <path d="M5 8h14l-1.1 10.6a1.6 1.6 0 0 1-1.6 1.4H7.7a1.6 1.6 0 0 1-1.6-1.4L5 8z" />
    <path d="M9 15.5h6" strokeDasharray="1 2.5" className={detail} />
  </Icon>
);

export const ReceiptIcon = () => (
  <Icon>
    <path d="M7 3h10a2 2 0 0 1 2 2v15.5l-2.33-1.5-2.34 1.5-2.33-1.5-2.33 1.5-2.34-1.5L5 20.5V5a2 2 0 0 1 2-2z" />
    <path d="M9 8.5h6M9 12.5h4" className={detail} />
  </Icon>
);

export const AddressIcon = () => (
  <Icon>
    <path d="M3 15l5-3.75L13 15v6H3z" className={detail} />
    <path d="M6.5 21v-3h3v3" className={detail} />
    <path d="M15.5 17s-5-4.3-5-8a5 5 0 0 1 10 0c0 3.7-5 8-5 8z" className="ez:fill-[color-mix(in_oklab,var(--ezd-primary)_10%,var(--ezd-surface))]" />
    <circle cx="15.5" cy="9" r="1.8" />
  </Icon>
);

export const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20h4L19 9l-4-4L4 16v4z" />
  </svg>
);

// Empty-state actions sit one step below the icon tile in weight.
export const emptyAction = "ez:min-h-11 ez:px-6 ez:text-[15px]";
