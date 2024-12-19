import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json" with { type: "json" };
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';
import css from "rollup-plugin-import-css";
import terser from '@rollup/plugin-terser';
import preserveDirectives from 'rollup-plugin-preserve-directives';

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: packageJson.main,
        format: "esm",
        sourcemap: true,
        preserveModules: true,
      },
    ],
    onwarn(warning, warn) {
      if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
        warn(warning);
      }
    },
    plugins: [
      peerDepsExternal(),
      css({ output: "base.css" }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json",
        exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts", "src/app/**", "next.config.ts", "sanity.cli.ts", "sanity.config.ts"],
      }),
      babel({ presets: ['@babel/preset-react'] }),
      preserveDirectives(),
      terser()
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
