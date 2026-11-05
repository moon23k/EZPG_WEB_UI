import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/core.ts"],
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
