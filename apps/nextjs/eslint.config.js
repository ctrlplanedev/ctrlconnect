import baseConfig, { restrictEnvAccess } from "@ctrlshell/eslint-config/base";
import nextjsConfig from "@ctrlshell/eslint-config/nextjs";
import reactConfig from "@ctrlshell/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
