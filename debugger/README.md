# dcl-debugger

A chrome extension to debug the Decentraland Client.

## Development

Run `pack.sh`. It will create a folder called `dist`. Open it as an umpacked extension from the chrome developer tools.
Use `dev.sh` to hot-reload (you will have to open and close the developer tools with each change).

## Architecture

### `background`

The chrome extension runs a small script that allows injected code to communicate back with the extension. This is necessary to know which is the correct devtools instance to communicate with (a.k.a. which `tabId` to send the messages to), because there might be more than one instance at the time. This is a pretty convoluted sequence of events, which can be described as:
1. The background script starts running. It listens for `init` messages sent from the devtools frame when created.
2. The explorer tab is created. Code from `extension/inject.ts` is injected by the background script, which listens for an event expected to be sent from the devtools.
3. The user opens the devtools. This causes `extension/content.ts` to be injected in a special context that **doesn't have access to the global window of the tab**; which is why we need to use `postMessage` anyways to communicate between the window and the devtools. This also triggers an `init` (see `devtool/page.tsx`) message that travels to the background page, and from the background page to the `extension/content.ts` code, from there to `extension/inject.ts`, and from there calls back to the devtools.
4. From now on, the window can start sending messages to the devtool by doing `window.postMessage({ source: 'dcl-debugger' })` (which arrives through `extension/inject.ts` -> `background/index.ts` -> `devtool/page.tsx`) 
5. The devtool can communicate to the window directly through `chrome.devtools.inspectedWindow`.

### `devtool`

The main `page.tsx` calls the initialization of each module, and creates the Redux store to be used by each one of them.

The modules are:
* **explorer**: inspect the redux store of the client.
* **comms**: visualize the comms statistics.
* **renderer**: intercepts the messages sent from/to the renderer.
* **scenes**: TODO, allow the devtools to inspect the ECS state of each running scene

Each module SHOULD have:
* a `start.ts` file, which sets up inspecting the relevant aspects for the module
* a `store.ts` file, which should export a `createStore()` redux initialization function
* a `present.ts` file, with the main React component to be called with all the stores (some modules might depend on the store of other modules, like **comms**)

## License & Copyright

This repository is protected with a standard Apache 2 license. See the terms and conditions in the [LICENSE]
(https://github.com/decentraland/client/blob/master/LICENSE) file.
