module.exports = {
  root: true,
  globals: {
    ImageMetadata: 'readonly',
  },
  env: { browser: true, es2021: true },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:astro/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'env.d.ts'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['astro', '@typescript-eslint', 'unused-imports', 'prettier'],
  rules: {
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {},
    },
  ],
};
