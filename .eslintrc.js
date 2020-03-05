module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'max-len': ['error', { code: 60 }],
    'no-console': 'off',
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    semi: [
      2,
      'never',
    ],
  },
}
