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
      entryRoot: "src",
      outDir: "dist",
      insertTypesEntry: true,
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
