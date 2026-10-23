"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";

export type OverlayProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children?: ReactNode;
  // Confirm dialogs carry their own dismiss button, so the corner X is left out.
  closeButton?: boolean;
};

// Portaled content sits outside .ez-root, so it sets its own box-sizing, font, colors and wrapping.
const surface = "ez:box-border ez:bg-surface ez:text-fg ez:font-body ez:break-keep ez:shadow-xl";

export function OverlayFrame({
  open,
  title,
  description,
  onClose,
  children,
  closeButton = true,
  slot,
  className,
}: OverlayProps & { slot: string; className: string }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ez:fixed ez:inset-0 ez:z-50 ez:bg-overlay" />
        <DialogPrimitive.Content
          data-slot={slot}
          {...(description ? {} : { "aria-describedby": undefined })}
          className={cn(surface, "ez:fixed ez:z-50 ez:grid ez:gap-4 ez:focus:outline-none", className)}
        >
          <div className="ez:flex ez:items-start ez:justify-between ez:gap-3">
            <div className="ez:grid ez:gap-1">
              <DialogPrimitive.Title className="ez:m-0 ez:text-lg ez:font-semibold">{title}</DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="ez:m-0 ez:text-sm ez:text-muted">{description}</DialogPrimitive.Description>
              )}
            </div>
            {closeButton && (
              <DialogPrimitive.Close
                aria-label="닫기"
                className={cn(
                  "ez:-m-2 ez:size-11 ez:shrink-0 ez:p-0 ez:border-0 ez:bg-transparent ez:text-2xl ez:leading-none ez:text-muted ez:cursor-pointer ez:rounded-sm",
                  focusRing,
                )}
              >
                ×
              </DialogPrimitive.Close>
            )}
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function Dialog(props: OverlayProps) {
  return (
    <OverlayFrame
      {...props}
      slot="dialog"
      className="ez:top-1/2 ez:left-1/2 ez:w-[calc(100%-2rem)] ez:max-w-md ez:-translate-x-1/2 ez:-translate-y-1/2 ez:rounded-lg ez:p-6"
    />
  );
}
