module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["apps/frontend/**/*.ts", "apps/frontend/**/*.tsx"],
      parserOptions: {
        project: "./apps/frontend/tsconfig.json",
      },
      rules: {
        // Add Next.js or React specific rules here if needed
        "react/jsx-no-constructed-context-values": "warn",
        "react/jsx-no-useless-fragment": "warn",
        "jsx-a11y/anchor-is-valid": [
          "error",
          {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["noHref", "invalidHref", "preferButton"],
          },
        ],
      },
    },
    {
      files: ["apps/backend/**/*.ts", "apps/backend/**/*.tsx"],
      parserOptions: {
        project: "./apps/backend/tsconfig.json",
      },
      env: {
        "vitest-globals/env": true,
      },
      rules: {
        // Add Vitest specific rules here if needed
      },
    },
    {
      files: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/__tests__/**/*.ts",
        "**/__tests__/**/*.tsx",
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-console": "off",
      },
    },
  ],
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
};
