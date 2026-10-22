import { defineConfig } from "tsdown";

// One output file per source module so each "use client" directive stays on its own file
// and Next.js keeps the server/client boundary.
export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  platform: "neutral",
  unbundle: true,
  dts: { tsconfig: "tsconfig.build.json" },
  clean: true,
  inputOptions: {
    onLog(level, log, handler) {
      if (log.code === "MODULE_LEVEL_DIRECTIVE") return;
      handler(level, log);
    },
  },
});
