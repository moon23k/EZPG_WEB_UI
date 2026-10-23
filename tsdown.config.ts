import { defineConfig } from "tsdown";

// unbundle keeps each "use client" directive on its own file.
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
