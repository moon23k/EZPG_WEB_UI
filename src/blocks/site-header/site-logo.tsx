"use client";

import { useState } from "react";

export function SiteLogo({ name, src }: { name: string; src?: string | null }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return name;
  return <img src={src} alt={name} className="ez:block ez:h-9 ez:w-auto" onError={() => setFailed(true)} />;
}
