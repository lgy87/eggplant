module.exports = {
  root: true,

  env: {
    es2021: true,
    node: true,
    browser: false,
  },
  extends: [
    /** @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs */
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  ignorePatterns: ["node_modules/**", "dist/**"],

  rules: {
    "import/no-extraneous-dependencies": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-undef": "off",
    "import/extensions": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/destructuring-assignment": "off",
    "react/no-array-index-key": "off",
    "import/prefer-default-export": "off",
    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react-hooks/exhaustive-deps": [
      "error",
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
  },
}
