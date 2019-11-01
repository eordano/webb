const json = require('rollup-plugin-json')

const allExternals = [
]

export default {
  external: allExternals,
  output: {
    name: 'config_bundle',
  },
  plugins: [
    json()
  ]
}
