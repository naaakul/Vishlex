import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
      next:  "src/next/index.tsx",
    },
    format:          ["esm", "cjs"],
    dts:             true,
    splitting:       false,
    sourcemap:       false,
    clean:           true,
    external:        ["react", "react-dom", "next"],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
    },
  },
  {
    entry: {
      "next-server": "src/next/server.ts",
    },
    format:   ["esm"],
    dts:      true,
    clean:    false,
    external: ["react", "react-dom", "next"],
  },
])