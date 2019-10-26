const commonjs = require('rollup-plugin-commonjs')
const nodelib = require('rollup-plugin-node-builtins')
const resolve = require('rollup-plugin-node-resolve')
const globals = require('rollup-plugin-node-globals')
const json = require('rollup-plugin-json')

export default {
  external: [
    'jsonwebtoken',
    'react',
    'react-redux',
    'react-dom',
    'react-console-emulator',
    'connected-react-router',
    'react-redux',
    'redux-saga'
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    json(),
    commonjs(),
    globals(),
    nodelib()
  ]
}
