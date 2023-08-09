module.exports = {
  'env': {
    'browser': false,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'require-jsdoc': 0,
    'max-len': 0,
    'linebreak-style': 0,
  // 'no-unused-vars': [2, {'vars': 'all', 'args': 'after-used'}],
  },
};
