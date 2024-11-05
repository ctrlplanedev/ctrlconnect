const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@ctrlshell/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
