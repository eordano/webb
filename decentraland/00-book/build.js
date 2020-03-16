const TypeDoc = require('typedoc')
const SourcefileUrlMapPlugin = require('typedoc-plugin-sourcefile-url')

const app = new TypeDoc.Application()

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader())
app.options.addReader(new TypeDoc.TypeDocReader())

app.bootstrap({
  name: 'c1-basics',
  mode: 'file',
  logger: 'none',
  target: 'ES5',
  hideGenerator: true,
  theme: 'decentraland/00-book/template',
  plugin: ["typedoc-plugin-sourcefile-url"],
  'sourcefile-url-prefix': 'https://github.com/eordano/webb/tree/master/decentraland/c1-basics/',
  sourceRoot: '../',
  module: 'CommonJS',
  experimentalDecorators: true
})

const sources = process.argv[2]
const destination = process.argv[3]

const project = app.convert(app.expandInputFiles([sources]))

if (project) {
  // Project may not have converted correctly
  const outputDir = destination

  // Rendered docs
  app.generateDocs(project, outputDir)
  // Alternatively generate JSON output
  app.generateJson(project, outputDir + '/documentation.json')
}
