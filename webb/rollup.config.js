import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import nodelib from 'rollup-plugin-node-builtins'

export default {
  external: [
    'jsonwebtoken'
  ],
  plugins: [
    resolve(),
    commonjs(),
    globals(),
    nodelib(),
    isProduction && (await import('rollup-plugin-terser')).terser()
  ]
}
