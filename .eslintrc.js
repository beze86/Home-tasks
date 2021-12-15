module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    node: true,
  },
  rules: {
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'error',
  },
};
