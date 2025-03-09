import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "prefer-const": "warn",
    "react-hooks/rules-of-hooks": "warn"
  }
};

export default nextConfig;
