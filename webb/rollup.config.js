console.log(process.env)
const commonjs = require('rollup-plugin-commonjs')
const nodelib = require('rollup-plugin-node-builtins')
const resolve = require('rollup-plugin-node-resolve')
const globals = require('rollup-plugin-node-globals')

export default {
  external: ['jsonwebtoken'],
  plugins: [resolve(), commonjs(), globals(), nodelib()]
}
