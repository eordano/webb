const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')
const globals = require('rollup-plugin-node-globals')
const builtins = require('rollup-plugin-node-builtins')

module.exports = {
  output: {
    format: 'amd',
    name: 'secp256k1'
  },
  plugins: [
    json(),
    nodeResolve({ browser: true, preferBuiltins: true }),
    globals(),
    builtins(),
    commonjs({
      path: process.env.PWD,
    }),
  ]
}
