import baseConfig from "@ctrlshell/eslint-config/base";
import reactConfig from "@ctrlshell/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
