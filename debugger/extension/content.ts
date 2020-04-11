import type { GlobalChrome } from 'dcl/debugger/types/chrome'
declare const chrome: GlobalChrome
const EXTENSION_NAMESPACE = 'dcl-debugger'

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: 'panel',
})

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
})

window.addEventListener('message', function (event) {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return
  }

  var message = event.data

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null || message.source !== EXTENSION_NAMESPACE) {
    return
  }

  chrome.runtime.sendMessage(message)
})
