import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { defineConfig } from "vite";

import addHmr from "./vite-utils/plugins/add-hmr";
import customDynamicImport from "./vite-utils/plugins/custom-dynamic-import";
import makeManifest from "./vite-utils/plugins/make-manifest";
import svgr from "@svgr/rollup";

const root = resolve(__dirname, "src");
const assetsDir = resolve(root, "assets");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");
const lighthouseSrcDir = resolve(__dirname, "../src");

const isDev = process.env.__DEV__ === "true";
const isLocal = process.env.__LOCAL__ === "true";

if (isLocal) {
  console.log("Running in local mode");
} else if (isDev) {
  console.log("Running in dev mode");
}

// ENABLE HMR IN BACKGROUND SCRIPT
const enableHmrInBackgroundScript = isDev || isLocal;

function getLastElement<T>(array: ArrayLike<T>): T {
  const length = array.length;
  const lastIndex = length - 1;
  return array[lastIndex];
}

function firstUpperCase(str: string): string {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, l => l.toUpperCase());
}

const currentEnv = isDev ? "dev" : "production";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": `"${currentEnv}"`,
    "process.env.REACT_APP_ENV": `"${isLocal ? "local" : currentEnv}"`,
    "process.env.NODE_DEBUG": `"false"`,
    "global.WebSocket": "globalThis.WebSocket",
  },
  resolve: {
    alias: {
      "@extension": root,
      "@assets": assetsDir,
      "@src": lighthouseSrcDir,
    },
  },
  plugins: [
    react(),
    svgr() as any,
    makeManifest(),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true }),
  ],
  publicDir,
  build: {
    minify: false,
    outDir,
    sourcemap: isDev,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: {
        background: resolve(root, "background", "index.ts"),
        popup: resolve(root, "index.html"),
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev ? "assets/js/[name].js" : "assets/js/[name].[hash].js",
        assetFileNames: assetInfo => {
          const { dir, name: _name } = path.parse(assetInfo.name as string);
          const assetFolder = getLastElement(dir.split("/"));
          const name = assetFolder + firstUpperCase(_name);
          return `assets/[ext]/${name}.chunk.[ext]`;
        },
      },
    },
  },
});
