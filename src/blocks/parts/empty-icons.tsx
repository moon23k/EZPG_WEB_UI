import type { ReactNode } from "react";

// Two-tone line icons for empty states: currentColor (the theme primary) plus a muted secondary stroke.
const soft = "ez:stroke-muted/75";

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
    >
      {children}
    </svg>
  );
}

export const ProductsIcon = () => (
  <Icon>
    <rect x="8" y="3" width="12" height="15" rx="2" className={soft} />
    <rect x="4" y="6" width="12" height="15" rx="2" className="ez:fill-surface" />
    <circle cx="8.5" cy="11" r="1.3" />
    <path d="M16 17l-3.5-3.5L6 20" />
  </Icon>
);

export const BagIcon = () => (
  <Icon>
    <path d="M5 8h14l-1.2 12H6.2L5 8z" />
    <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    <path d="M12 12v4M10 14h4" />
  </Icon>
);

export const ReceiptIcon = () => (
  <Icon>
    <path d="M6 3h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V3z" />
    <path d="M9 8h6" />
    <path d="M9 12h3" className={soft} />
  </Icon>
);

export const AddressIcon = () => (
  <Icon>
    <path d="M3 13l6-4.5 6 4.5v8H3z" className={soft} />
    <path d="M7.5 21v-4h3v4" className={soft} />
    <path d="M17 15s-4.5-4-4.5-7.2a4.5 4.5 0 0 1 9 0C21.5 11 17 15 17 15z" className="ez:fill-surface" />
    <circle cx="17" cy="7.8" r="1.6" />
  </Icon>
);

export const TruckIcon = () => (
  <Icon size={24}>
    <path d="M3 7h11v9H3z" />
    <path d="M14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="17.5" r="1.5" />
    <circle cx="17" cy="17.5" r="1.5" />
  </Icon>
);

export const HomeIcon = () => (
  <Icon size={24}>
    <path d="M3 10l9-6 9 6v10H3z" />
    <path d="M9 20v-6h6v6" />
  </Icon>
);

export const StarIcon = ({ filled }: { filled?: boolean }) => (
  <Icon size={26}>
    <path
      d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"
      className={filled ? "ez:fill-primary/10" : undefined}
    />
  </Icon>
);

export const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
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
