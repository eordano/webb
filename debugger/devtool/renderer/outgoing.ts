import { GlobalChrome } from '../../types/chrome'
declare var chrome: GlobalChrome

export function tapOnOutgoingKernelMessages(tabId: number) {
  chrome.tabs.executeScript(tabId, {
    code: `
  function interceptMessages(unity) {
    const returns = { intercept: function () {}, deactivate: function () {} }
    const backups = {}
    for (let key in unity) {
      if (unity.hasOwnProperty(key)) {
        backups[key] = unity[key]
        unity[key] = function (...args) {
          returns.intercept(args)
          backups[key].apply(unity, args)
        }
      }
    }
    returns.deactivate = function () {
      for (let key in backups) {
        unity[key] = backups[key]
      }
    }
    return returns
  }
  window.intercept = interceptMessages(window.unityInterface)
  window.intercept.intercept = function() {
    window.postMessage(
      {
        name: 'dcl-intercept',
        source: 'dcl-debugger',
        payload: arguments
      },
      '*'
    )
  }`,
  })
}

export function stopInterception(tabId: number) {
  chrome.tabs.executeScript(tabId, {
    code: `window.intercept.deactivate()`,
  })
}
