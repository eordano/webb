const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')

module.exports = {
  output: {
    name: 'deps_bundle'
  },
  treeshake: false,
  plugins: [
    json(),
    commonjs({
      path: process.env.PWD
    }),
    builtins(),
    globals(),
    nodeResolve({ browser: true, preferBuiltins: true }),
  ]
}
