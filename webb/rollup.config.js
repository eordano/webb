const nodelib = require('rollup-plugin-node-builtins')
const resolve = require('rollup-plugin-node-resolve')
const globals = require('rollup-plugin-node-globals')
const json = require('rollup-plugin-json')

const allExternals = [
  /**
   * Bundled dependencies -- reduce me so building this is faster
   */
  'uuid',
  'typesafe-actions',
  'secp256k1',
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
  '@redux-saga/effects',
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
  'url',
  'gud',
  /**
   * Web dependencies
   */
  'jsonwebtoken',
  'react',
  'react-redux',
  'react-dom',
  'react-console-emulator',
  'connected-react-router',
  /**
   * Other dependencies
   */
  'dcl/protos/comms_pb',
  'dcl/protos/broker_pb',
]

export default {
  external: allExternals,
  output: {
    name: 'main_roll',
  },
  plugins: [
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    json(),
    globals(),
    nodelib(),
  ]
}
