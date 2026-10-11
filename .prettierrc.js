module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  jsxSingleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'auto',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
