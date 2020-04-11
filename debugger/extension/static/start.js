requirejs.config({
  //By default load any module IDs from js
  baseUrl: '../js',
  paths: {
    // Require.js appends `.js` extension for you
    react: '../static/vendor/react.production.min',
    redux: '../static/vendor/redux.production.min',
    'chart.js': '../static/vendor/chartsjs.production.min',
    'react-dom': '../static/vendor/react-dom.production.min',
    '@dcl/debugger/devtool': '.',
    '@dcl/debugger/background': '.',
    '@dcl/debugger/extension': '.',
  },
})

requirejs(['@dcl/debugger/devtool/page'], function (page) {
  console.log(page)
})
