import type { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "grid", gap: 8, marginBottom: 24, maxWidth: 560 }}>
      <h3 style={{ margin: 0, fontSize: 12, fontWeight: 400, letterSpacing: "0.03em", color: "var(--ezd-muted)" }}>{title}</h3>
      {children}
    </section>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>{children}</div>;
}

export function Column({ children }: { children: ReactNode }) {
  return <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>{children}</div>;
}
