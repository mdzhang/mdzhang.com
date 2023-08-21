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
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
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
