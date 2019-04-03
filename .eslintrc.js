module.exports = {
  root: true,
  globals: {
    wx: true,
    vue: true
  },
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
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    "semi": [2, "always"],//语句强制分号结尾
    'quotes': [1, 'single'],//引号类型 `` "" ''
    "spaced-comment": 0,//注释风格要不要有空格什么的
    "comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
    "indent": [2, 2],//缩进风格
  }
}
