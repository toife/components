import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));

export type StyleEntry = {
  /** Rollup input key and output CSS basename (e.g. `button` → `button.css`). */
  name: string;
  /** Absolute path to the `.vue` SFC. */
  file: string;
};

function hasStyleBlock(filePath: string): boolean {
  return readFileSync(filePath, "utf-8").includes("<style");
}

/** Vue SFCs under `src/components` that declare a `<style>` block. */
export function getStyleEntries(): StyleEntry[] {
  const files = globSync("src/components/**/*.vue", {
    cwd: packageRoot,
  });

  return files
    .map((relativePath) => {
      const file = path.join(packageRoot, relativePath);
      const name = path.basename(relativePath, ".vue");
      return { name, file };
    })
    .filter(({ file }) => hasStyleBlock(file))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getStyleInput(): Record<string, string> {
  return Object.fromEntries(getStyleEntries().map(({ name, file }) => [name, file]));
}

export function buildStylesIndexCss(): string {
  const imports = getStyleEntries()
    .map(({ name }) => `@import "./${name}.css";`)
    .join("\n");

  return `${imports}\n`;
}
