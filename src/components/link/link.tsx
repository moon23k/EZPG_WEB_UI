import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

export function Link({ className, ...rest }: ComponentProps<typeof NextLink>) {
  return <NextLink className={cn("ez:underline-offset-4 ez:hover:underline", className)} {...rest} />;
}
