import { readdirSync, rmSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { buildStylesIndexCss, getStyleEntries, getStyleInput } from "./scripts/style-entries";

const packageRoot = fileURLToPath(new URL(".", import.meta.url));
const distDir = path.join(packageRoot, "dist");
const stylesDir = path.join(distDir, "styles");
const keepDistJs = new Set(["index.es.js", "index.umd.js"]);

function listDistFiles(dir: string, base = dir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return listDistFiles(fullPath, base);
    }
    return [path.relative(base, fullPath)];
  });
}

function styleBuildCleanup(): Plugin {
  let existingRelFiles = new Set<string>();

  return {
    name: "style-build-cleanup",
    buildStart() {
      existingRelFiles = new Set(
        statSync(distDir, { throwIfNoEntry: false }) ? listDistFiles(distDir) : []
      );
    },
    closeBundle() {
      for (const relPath of listDistFiles(distDir)) {
        if (existingRelFiles.has(relPath)) {
          continue;
        }
        if (relPath.endsWith(".js") && keepDistJs.has(path.basename(relPath))) {
          continue;
        }
        if (relPath.endsWith(".js")) {
          unlinkSync(path.join(distDir, relPath));
        }
      }

      rmSync(path.join(stylesDir, "_chunks"), { recursive: true, force: true });
      const stylesIndexCss = buildStylesIndexCss();
      writeFileSync(path.join(stylesDir, "index.css"), stylesIndexCss, "utf-8");
    },
  };
}

const styleEntries = getStyleEntries();

if (styleEntries.length === 0) {
  throw new Error("No Vue components with <style> blocks found for CSS build.");
}

export default defineConfig({
  plugins: [vue(), styleBuildCleanup()],
  resolve: {
    alias: {
      "@/core": fileURLToPath(new URL("../core", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [fileURLToPath(new URL("./node_modules", import.meta.url))],
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    cssCodeSplit: true,
    lib: {
      entry: getStyleInput(),
      formats: ["es"],
      fileName: (_format, entryName) => `styles/_chunks/${entryName}.js`,
    },
    rollupOptions: {
      output: {
        entryFileNames: "styles/_chunks/[name].js",
        chunkFileNames: "styles/_chunks/[name]-[hash].js",
        assetFileNames: "styles/[name][extname]",
      },
    },
  },
});
