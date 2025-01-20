import typescript from "@rollup/plugin-typescript";

const plugins = [typescript()];

export default [
  {
    plugins,
    input: "vite-utils/reload/initReloadServer.ts",
    output: {
      file: "vite-utils/reload/initReloadServer.js",
    },
    external: ["ws", "chokidar", "timers"],
  },
  {
    plugins,
    input: "vite-utils/reload/injections/script.ts",
    output: {
      file: "vite-utils/reload/injections/script.js",
    },
  },
  {
    plugins,
    input: "vite-utils/reload/injections/view.ts",
    output: {
      file: "vite-utils/reload/injections/view.js",
    },
  },
];
