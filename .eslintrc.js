module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: ["error", "tab"],
    "no-throw-literal": ["warning", "never"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    "semi-style": ["error", "last"],
  },
};
