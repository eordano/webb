require.config({
  paths: {
    // 'connected-react-router': 'static/vendor-connected-react-router-6.5.2/ConnectedReactRouter',
    'dcl/config': 'config/config_bundle/config_bundle',
    'dcl/utils': 'utils/utils_bundle/utils_bundle',
    'dcl/rpc': 'rpc/rpc_bundle/rpc_bundle',
    'webb/src/index': 'webb/webb_bundle/webb_bundle',

    'dcl/kernel/core/store': 'kernel/kernel_bundle/kernel_bundle/core/store',
    'dcl/scene-api': 'kernel/kernel_bundle/kernel_bundle',
    'dcl/utils/scene': 'utils/utils_bundle/utils_bundle',
    'dcl/utils/pure/stableStringify': 'utils/utils_bundle/utils_bundle',
    'dcl/rpc/common/API': 'rpc/rpc_bundle/rpc_bundle',
    'dcl/rpc/host': 'rpc/rpc_bundle/rpc_bundle',

    'events': 'webb/deps_bundle/events',
    'fp-future': 'webb/deps_bundle/fp-future',
    'crypto': 'webb/deps_bundle/crypto',
    'util': 'webb/deps_bundle/util',
    'secp256k1': 'webb/deps_bundle/secp256k1',

    '@babel/runtime/helpers/inheritsLoose': 'static/fixups/inheritsLoose',
    'buffer': 'static/fixups/buffer',
    'gud': 'static/fixups/gud',

    history: 'npm/node_modules/history/umd/history',
    react: 'npm/node_modules/react/umd/react.development',
    'hoist-non-react-statics': 'npm/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.min',
    'prop-types': 'npm/node_modules/prop-types/prop-types.min',
    'react-dom': 'npm/node_modules/react-dom/umd/react-dom.development',
    'reselect': 'npm/node_modules/reselect/dist/reselect',
    'react-router-dom': 'npm/node_modules/react-router-dom/umd/react-router-dom',
    'react-redux': 'npm/node_modules/react-redux/dist/react-redux',
    'jsonwebtoken': 'static/vendor-jsonwebtoken/jsonwebtoken',
    redux: 'npm/node_modules/redux/dist/redux',
    'redux-saga': 'npm/node_modules/redux-saga/dist/redux-saga.umd',
    jsonwebtoken: 'static/vendor-jsonwebtoken/jsonwebtoken',
    'redux-saga/effects': 'npm/node_modules/redux-saga/dist/redux-saga-effects.umd',
  }
})
