import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  // Base JS/TS config
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    ignores: ["**/dist/**", "**/build/**", "**/node_modules/**"],
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      js,
      "@typescript-eslint": ts,
    },
    extends: ["js/recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-imports": "warn",
    },
  },

  // Next.js frontend specific overrides
  {
    files: ["apps/frontend/**/*.ts", "apps/frontend/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./apps/frontend/tsconfig.json",
      },
    },
    rules: {
      // Add Next.js or React specific rules here if needed
      "react/jsx-no-constructed-context-values": "warn",
      "react/jsx-no-useless-fragment": "warn",
      // Add rule to prevent deprecated <Link> usage with nested <a>
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          "components": ["Link"],
          "specialLink": ["hrefLeft", "hrefRight"],
          "aspects": ["noHref", "invalidHref", "preferButton"]
        }
      ]
    },
  },

  // Vitest backend specific overrides
  {
    files: ["apps/backend/**/*.ts", "apps/backend/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./apps/backend/tsconfig.json",
      },
    },
    env: {
      "vitest-globals/env": true,
    },
    rules: {
      // Add Vitest specific rules here if needed
    },
  },

  // Test files overrides
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/__tests__/**/*.ts", "**/__tests__/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "off",
    },
  },
]);
