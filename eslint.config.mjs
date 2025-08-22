import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
    languageOptions: { 
      globals: { 
        ...globals.browser,
        ...globals.node,
        process: "readonly"
      }
    }
  },
  ...tseslint.configs.recommended,
  {
    ignores: [
      "src/declarations/**/*",
      ".next/**/*",
      "out/**/*",
      "node_modules/**/*"
    ]
  }
];
