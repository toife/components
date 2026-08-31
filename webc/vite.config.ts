import { unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";

const packageRoot = fileURLToPath(new URL(".", import.meta.url));

/** Library JS build must not emit bundled CSS; use `vite.styles.config.ts` instead. */
function stripLibCss(): Plugin {
  return {
    name: "strip-lib-css",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (fileName.endsWith(".css")) {
          delete bundle[fileName];
        }
      }
    },
    closeBundle() {
      const strayCss = path.join(packageRoot, "dist", "lit.css");
      try {
        unlinkSync(strayCss);
      } catch {
        // not emitted
      }
    },
  };
}

export default defineConfig({
  plugins: [
    dts({
      entryRoot: fileURLToPath(new URL("..", import.meta.url)),
      include: ["src/**/*.ts", "../core/**/*.ts"],
      outDir: "dist",
      insertTypesEntry: true,
      beforeWriteFile(filePath, content) {
        const nestedSrc = path.join(packageRoot, "dist", "lit", "src");
        if (!filePath.startsWith(nestedSrc + path.sep) && filePath !== nestedSrc) {
          return { filePath, content };
        }

        const flatPath = path.join(packageRoot, "dist", path.relative(nestedSrc, filePath));

        const rewritten = content.replace(
          /((?:from\s+|import\()['"])((?:\.\.\/)+)core(\/[^'"]*)?(['"])/g,
          (_match, lead, ups: string, subpath = "", quote) => {
            const levels = ups.length / 3;
            const next = levels - 2;
            const prefix = next <= 0 ? "./" : "../".repeat(next);
            return `${lead}${prefix}core${subpath}${quote}`;
          },
        );

        return { filePath: flatPath, content: rewritten };
      },
    }),
    stripLibCss(),
  ],
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
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "ToifeLit",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["lit", "lit/decorators.js", "lit/directives/class-map.js", "lit/directives/style-map.js", "lit/directives/repeat.js", "lit/directives/when.js", "lit/directives/if-defined.js", "@toife/gesture", "@toife/sass-layer"],
      output: {
        assetFileNames: "[name][extname]",
        globals: {
          lit: "Lit",
          "@toife/gesture": "ToifeGesture",
        },
      },
    },
  },
});
