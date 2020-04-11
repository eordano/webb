const EXTENSION_NAMESPACE = 'dcl-debugger'
window.postMessage(
  {
    greeting: 'hello there!',
    source: EXTENSION_NAMESPACE,
  },
  '*'
)
