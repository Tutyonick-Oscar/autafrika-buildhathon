import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Architecture rules: dependencies always point downward
  // app → features → components / lib
  {
    files: ["features/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{ group: ["@/app/*"], message: "A feature must never depend on app/." }],
      }],
    },
  },
  {
    files: ["components/**", "lib/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{ group: ["@/app/*", "@/features/*"], message: "Shared code must not depend on any feature." }],
      }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
