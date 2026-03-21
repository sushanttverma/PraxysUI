import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "app/components/praxys-vendor/backgrounds/**",
    "app/components/praxys-vendor/tools/**",
    "app/components/praxys-vendor/animations/**",
    "app/components/ui/**",
  ]),
]);

export default eslintConfig;
