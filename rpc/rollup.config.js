const json = require('rollup-plugin-json')

const allExternals = [
]

export default {
  external: allExternals,
  output: {
    name: 'rpc_bundle',
  },
  plugins: [
    json(),
  ]
}
