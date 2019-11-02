const whitelistES5: Array<keyof typeof global> = [
  'eval',
  'parseInt',
  'parseFloat',
  'isNaN',
  'isFinite',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'escape',
  'unescape',
  'Object',
  'Function',
  'String',
  'Boolean',
  'Number',
  'Math',
  'Date',
  'RegExp',
  'Error',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
  'JSON',
  'Array',
  'Promise',
  'NaN',
  'Infinity'
]

const defer: (fn: Function) => void = (Promise.resolve().then as any).bind(Promise.resolve() as any)

export function customEval(code: string, context: any) {
  let sandbox: any = {}

  let resultKey = 'SAFE_EVAL_' + Math.floor(Math.random() * 1000000)
  sandbox[resultKey] = {}

  Object.keys(context).forEach(function(key) {
    sandbox[key] = context[key]
  })

  sandbox.window = sandbox
  sandbox.self = sandbox

  return defer(() => new Function('code', `with (this) { ${code} }`).call(sandbox, code))
}

declare var global: any
declare var window: any
export function getES5Context(base: Record<string, any>) {
  const scope = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : globalThis
  whitelistES5.forEach($ => (base[$ as any] = scope[$]))

  return base
}
