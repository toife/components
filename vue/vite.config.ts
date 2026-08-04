import { unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";

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
      const strayCss = path.join(packageRoot, "dist", "vue.css");
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
      // Parent of vue/ + core/ so core declarations are emitted into dist
      // (entryRoot: "src" left exports as `../../core`, which is outside the package).
      entryRoot: fileURLToPath(new URL("..", import.meta.url)),
      include: ["src/**/*.{ts,vue}", "../core/**/*.ts"],
      outDir: "dist",
      insertTypesEntry: true,
      beforeWriteFile(filePath, content) {
        // Flatten dist/vue/src/* → dist/* while keeping dist/core/*
        const nestedSrc = path.join(packageRoot, "dist", "vue", "src");
        if (!filePath.startsWith(nestedSrc + path.sep) && filePath !== nestedSrc) {
          return { filePath, content };
        }

        const flatPath = path.join(
          packageRoot,
          "dist",
          path.relative(nestedSrc, filePath),
        );

        // Imports were computed from vue/src/... (2 extra segments vs flattened dist/).
        // Drop two `../` so they resolve to dist/core.
        // Handles both `from '...core'` and inline `import('...core')`.
        const rewritten = content.replace(
          /((?:from\s+|import\()['"])((?:\.\.\/)+)core(\/[^'"]*)?(['"])/g,
          (_match, lead, ups: string, subpath = "", quote) => {
            const levels = ups.length / 3; // "../" === 3 chars
            const next = levels - 2;
            const prefix = next <= 0 ? "./" : "../".repeat(next);
            return `${lead}${prefix}core${subpath}${quote}`;
          },
        );

        return { filePath: flatPath, content: rewritten };
      },
    }),
    vue(),
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
      name: "ToifeVue",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "vue-router", "@toife/gesture", "@toife/sass-layer"],
      output: {
        assetFileNames: "[name][extname]",
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
          "@toife/gesture": "ToifeGesture",
        },
      },
    },
  },
});
