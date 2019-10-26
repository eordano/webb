const commonjs = require('rollup-plugin-commonjs')
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
  '@babel/runtime'
]

export default {
  external: allExternals,
  output: {
    name: 'main_roll',
    globals: {
      react: 'react',
      redux: 'redux',
      'react-redux': 'react-redux',
      'connected-react-router': 'connected-react-router'
    }
  },
  plugins: [
    resolve({
      preferBuiltins: true,
      browser: true
    }),
    json(),
    commonjs({
      namedExports: {
        'node_modules/@babel/runtime/helpers/interopRequireWildcard': [],
        'node_modules/react-redux/index.js': [],
        'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer'],
        'node_modules/react-dom/index.js': ['render', 'unstable_batchedUpdates'],
        'node_modules/react/index.js': [
          'Children',
          'useMemo',
          'useContext',
          'useLayoutEffect',
          'useRef',
          'useReducer',
          'useEffect',
          'Component',
          'Fragment',
          'PropTypes',
          'createElement'
        ],
        'node_modules/redux/index.js': ['createStore', 'AnyAction']
      }
    }),
    globals(),
    nodelib()
  ]
}
