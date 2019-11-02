const builtins = require('rollup-plugin-node-builtins')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const globals = require('rollup-plugin-node-globals')

const allExternals = [
]

export default {
  external: allExternals,
  output: {
    name: 'horus_bundle',
  },
  plugins: [
    json(),
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    commonjs(),
    globals(),
    builtins(),
  ]
}
