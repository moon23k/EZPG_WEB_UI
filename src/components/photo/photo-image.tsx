"use client";

import Image from "next/image";
import { useState } from "react";

export function PhotoImage({ src, alt, sizes, preload }: { src: string; alt: string; sizes: string; preload?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="ez:object-cover" onError={() => setFailed(true)} />;
}
