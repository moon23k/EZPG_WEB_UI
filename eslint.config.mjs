import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  { rules: { "@next/next/no-html-link-for-pages": "off" } },
  { files: ["src/blocks/site-header/site-logo.tsx"], rules: { "@next/next/no-img-element": "off" } },
  globalIgnores(["dist/**", ".dist-next/**", ".dist-old/**", ".next/**", "storybook-static/**"]),
]);
