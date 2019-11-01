const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')

const allExternals = [
  /**
   * Bundled dependencies -- reduce me so building this is faster
   */
  'uuid',
  'typesafe-actions',
  // 'secp256k1',
  'events',
  'fp-future',
  'history',
  'webworker-threads',
  /**
   * Kernel dependencies
   */
  'redux',
  'redux-saga',
  'redux-saga/effects',
  '@babel/runtime/helpers/inheritsLoose',
  'prop-types',
  'hoist-non-react-statics',
  'react-is',
  'path-to-regexp',
  'auth0-js',
  'decentraland-auth-protocol',
  'devtools-protocol',
  'google-protobuf',
  'webrtc-adapter',
  'gud',
  /**
   * Web dependencies
   */
  'react',
  'react-redux',
  'react-dom',
  'dcl/utils',
  'dcl/kernel',
  'dcl/protos',
  'dcl/config'
]

export default {
  external: allExternals,
  output: {
    name: 'webb_roll',
  },
  plugins: [
    json(),
  ]
}
