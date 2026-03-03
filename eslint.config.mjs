import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Enable jsx-a11y recommended rules (plugin already registered by eslint-config-next)
  {
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // UI components use plain <img> intentionally — they are framework-agnostic
  // copy-paste components that must work outside Next.js (Vite, Remix, etc.).
  {
    files: ["app/components/ui/**"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
