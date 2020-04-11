import { GlobalChrome } from 'dcl/debugger/types/chrome'
declare var chrome: GlobalChrome

export function clientLog(...messages: (string | any)[]) {
  const str = `console.log(\`${
    messages.map((_) => (typeof _ === 'string' ? _ : JSON.stringify(_))).join('`, `') + '`'
  })`
  chrome.devtools.inspectedWindow.eval(str)
}
