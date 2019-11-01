const json = require('rollup-plugin-json')

const allExternals = [
  'uuid',
  'typesafe-actions',
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
  'dcl/protos/comms_pb',
  'dcl/protos/broker_pb',
  'dcl/config',
  'dcl/utils',
  'dcl/protos',
  'buffer',
  'safe-buffer',
  'util',
  'string_decoder',
  'stream',
  'events',
  'crypto',
  'reselect',
  'secp256k1',
  'jsonwebtoken',
  'dcl/rpc',
  'dcl/utils/scene',
  'dcl/utils/pure/stableStringify',
  'dcl/rpc/host',
  'dcl/rpc/common/API'
]

export default {
  external: allExternals,
  output: {
    name: 'main_roll',
  },
  plugins: [
    json(),
  ]
}
