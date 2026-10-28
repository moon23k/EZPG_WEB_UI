import { existsSync, renameSync, rmSync } from "node:fs";

rmSync(".dist-old", { recursive: true, force: true });
if (existsSync("dist")) renameSync("dist", ".dist-old");
renameSync(".dist-next", "dist");
rmSync(".dist-old", { recursive: true, force: true });
