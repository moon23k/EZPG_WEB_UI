import { writeFileSync } from "node:fs";
import * as registry from "../src/renderer/registry";
import { templateLetters } from "../src/templates";

const sections = (registry as { sections?: Record<string, unknown> }).sections ?? {};
const manifest = { kinds: Object.keys(sections).sort(), templates: templateLetters() };

writeFileSync(new URL("../manifest.json", import.meta.url), JSON.stringify(manifest, null, 2) + "\n");
