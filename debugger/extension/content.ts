window.addEventListener('message', function (event) {
  const EXTENSION_NAMESPACE = 'dcl-debugger'

  // Only accept messages from the same frame
  if (event.source !== window) {
    return
  }
  var message = event.data
  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null || message.source !== EXTENSION_NAMESPACE) {
    return
  }
  try {
    ;(window as any).chrome.runtime.sendMessage(message)
  } catch (e) {
    console.log(`>> context probably invalidated! waiting re-insert`)
  }
})
