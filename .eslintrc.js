// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true, // 以当前目录为根目录，不再向上查找 .eslintrc.js
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true, // browser environments
    es6: true, // enables ES6 syntax
    jest: true
  },
  extends: ['plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    'semi': [error, always],
    'space-before-function-paren': [error, never],
    'vue/require-v-for-key': 0,
    'vue/require-default-prop': 0,
    'vue/name-property-casing': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 5,
        multiline: {
          max: 5,
          allowFirstLine: false
        }
      }
    ]
  }
}
