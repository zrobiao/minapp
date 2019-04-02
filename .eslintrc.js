module.exports = {
  root: true,
  globals: { wx: true },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    "no-const-assign": 2,//禁止修改const声明的变量
    "no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
    //"no-irregular-whitespace": 2,//不能有不规则的空格
    "no-label-var": 2,//label名不能与var声明的变量名相同
  }
}
