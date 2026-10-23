import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const errors: string[] = [];

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

const isClient = (code: string) => /^\s*["']use client["']/.test(code);

for (const out of walk(join(root, "dist")).filter((f) => f.endsWith(".js"))) {
  const rel = relative(join(root, "dist"), out).replace(/\.js$/, "");
  const src = [".tsx", ".ts"].map((ext) => join(root, "src", rel + ext)).find(existsSync);
  if (!src) continue;
  if (isClient(readFileSync(src, "utf8")) && !isClient(readFileSync(out, "utf8"))) {
    errors.push(`"use client" missing in dist/${rel}.js`);
  }
}

const css = readFileSync(join(root, "dist/styles.css"), "utf8");
for (const [, name, target] of css.matchAll(/(--[\w-]+):\s*var\((--[\w-]+)\)/g)) {
  if (name === target) errors.push(`self-referencing variable ${name} in dist/styles.css`);
}

for (const file of ["src/blocks", "src/sections"].flatMap((dir) => walk(join(root, dir))).filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))) {
  if (/className=["{`][^"}`]*\bez-[a-z]/.test(readFileSync(file, "utf8"))) errors.push(`legacy ez- class in ${relative(root, file)}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("dist ok");
