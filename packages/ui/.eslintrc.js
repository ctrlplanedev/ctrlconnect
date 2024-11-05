/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@ctrlshell/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "no-redeclare": "off",
    "no-unused-vars": "off",
  },
};
