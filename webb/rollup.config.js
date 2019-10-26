const nodelib = require('rollup-plugin-node-builtins')
const resolve = require('rollup-plugin-node-resolve')
const globals = require('rollup-plugin-node-globals')
const json = require('rollup-plugin-json')

const allExternals = [
  'jsonwebtoken',
  'react',
  'react-redux',
  'react-dom',
  'react-console-emulator',
  'connected-react-router',
  'react-redux',
  'redux',
  'redux-saga',
  '@babel/runtime/helpers/inheritsLoose',
  'typesafe-actions',
  'uuid',
  'secp256k1',
  'prop-types',
  'hoist-non-react-statics',
  'react-is',
  'path-to-regexp',
  'fp-future',
  '@babel/runtime/helpers/inheritsLoose',
  'webworker-threads',
  'gud',
  'dcl/protos/comms_pb',
  'dcl/protos/broker_pb',
]

export default {
  external: allExternals,
  output: {
    name: 'main_roll',
    globals: {
      react: 'react',
      redux: 'redux',
      'typesafe-actions': 'typesafe-actions',
      'uuid': 'uuid',
      'secp256k1': 'secp256k1',
      'prop-types': 'prop-types',
      'hoist-non-react-statics': 'hoist-non-react-statics',
      'react-is': 'react-is',
      'path-to-regexp': 'path-to-regexp',
      'fp-future': 'fp-future',
      '@babel/runtime/helpers/inheritsLoose': '@babel/runtime',
      'webworker-threads': 'webworker-threads',
      'react-redux': 'react-redux',
      'dcl/protos/comms_pb': 'dcl/protos/comms_lib',
      'dcl/protos/broker_pb': 'dcl/protos/broker_pb',
      'connected-react-router': 'connected-react-router'
    }
  },
  dedupe: ['react', 'react-dom'],
  plugins: [
    resolve({
      preferBuiltins: true,
      browser: true,
      modulesOnly: true,
    }),
    json(),
    globals(),
    nodelib(),
    // commonjs({
    //   exclude: [ 'node_modules/**/*.mjs' ],
    //   namedExports: {
    //     'node_modules/typesafe-actions/dist/typesafe-actions.umd.production.js': ['action'], 
    //     'node_modules/uuid/index.js': ['v4'], 
    //     'node_modules/dcl/protos/broker_pb.mjs': ['v4'], 
    //     'node_modules/@babel/runtime/helpers/interopRequireWildcard': [],
    //     'node_modules/react-redux/index.js': [],
    //     'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer'],
    //     'node_modules/react-dom/index.js': ['render', 'unstable_batchedUpdates'],
    //     'node_modules/react/index.js': [
    //       'Children',
    //       'useMemo',
    //       'useContext',
    //       'useLayoutEffect',
    //       'useRef',
    //       'useReducer',
    //       'useEffect',
    //       'Component',
    //       'Fragment',
    //       'PropTypes',
    //       'createElement'
    //     ],
    //     'node_modules/redux/index.js': ['createStore', 'AnyAction']
    //   }
    // }),
  ]
}
