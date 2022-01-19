
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 不使用分号，配合prettier使用，不报错
    semi: ['error', 'never'],

    // allow paren-less arrow functions 箭头函数规则（当只有一个参数时允许省略参数）
    'arrow-parens': 0,

    // allow async-await
    'generator-star-spacing': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // 关闭 函数括号前强制空格
    'space-before-function-paren': 0,

    // 不检测末尾逗号
    'comma-dangle': 0,
  },
}