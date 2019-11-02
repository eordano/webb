const json = require('rollup-plugin-json')
const noderesolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const globals = require("rollup-plugin-node-globals")
const builtins = require("rollup-plugin-node-builtins")
const allExternals = []

export default {
  external: allExternals,
  output: {
    name: 'gamekit',
    format: 'iife'
  },
  plugins: [
    json(),
    noderesolve({
      preferBuiltins: true
    }),
    commonjs({ browser: true, include: 'node_modules/**/*' }),
    globals(),
    builtins(),
  ]
}
