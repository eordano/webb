import type { GlobalChrome } from 'dcl/debugger/types/chrome'
declare const chrome: GlobalChrome

/**
 * Can access devtools.panels (maybe to have different tabs)
 */

/**
 * can use `devtools.inspectedWindow` API
 */

/**
 * can use `devtools.network` API
 */

/**
 * Can inject content scripts
 */
chrome.devtools.panels.create('DCL Tools', 'static/icon.png', 'static/panel.html', function (panel) {
  // code invoked on panel creation
})

