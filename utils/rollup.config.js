const json = require('rollup-plugin-json')

const allExternals = [
  'fp-future',
  'events',
  'crypto',
  'buffer'
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
