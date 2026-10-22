import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

// next/link is itself a client component, so this wrapper stays usable from server sections.
export function Link({ className, ...rest }: ComponentProps<typeof NextLink>) {
  return <NextLink className={cn("ez:underline-offset-4 ez:hover:underline", className)} {...rest} />;
}
