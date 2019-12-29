import React, { useMemo, useState } from 'react'

const DEBUG_SAIL = false
export type Memento = {
  href: string
  pathname: string
  search: string
  hash: string
  origin: string
  state: any
  historyLength: number
  pushBySail: any
  __sail: any
}

/**
 * Who needs a `Route` when you can navigate?
 *
 * `Sail` provides simple access to the history of the browser in a reliable way.
 */
export function Sail(props?: { windowScope?: any; smallScope?: boolean; children: any }) {
  const scope = props.windowScope || window
  const [memento, setMemento] = useState(extractMemento(scope.location, scope.history))
  /**
   * A `memento` is the snapshot of the current context `History` provides. It's composed of:
   *  - Some of the values of `Location` (reference: https://developer.mozilla.org/en-US/docs/Web/API/Location)
   *    (includes `href`, `pathname`, `search`, `hash`, and `origin`)
   *  - state: the value of `history.state`
   *  - historyLength: the value of `history.length`
   *  - pushBySail: the value of `history.state && Object.hasOwnProperty(history.state, '__sail')`
   *
   * Use `<Sail smallScope />` to avoid using all these values and only keeping `state`, `path`, `search`, and
   * `hash`. This is not the default behavior, for reliability, but it is encouraged in order to create more
   * efficient builds into production.
   */
  function extractMemento(location: Location, history: History): Memento {
    return {
      href: location.href,
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      origin: location.origin,
      state: history.state,
      historyLength: history.length,
      pushBySail: history && history.state && Object.hasOwnProperty.call(history.state, '__sail'),
      __sail: true
    }
  }
  /**
   * We take advantage of `useState` to create a context provider, similarly to how a Context.provider would be
   * used and defer to the (now standardized for years) `window.onpopstate` listener to modify this context.
   *
   * The following function takes care of that
   */
  useMemo(() => {
    const sailBackups = (scope.__sail = scope.__sail || {})
    if (sailBackups.mypopstate !== scope.onpopstate) {
      const historyPushState = scope.history.pushState
      const mypopstate = () => {
        const newMemento = extractMemento(scope.location, scope.history)
        if (areMementosEqual(memento, newMemento)) {
          return /* without updating the current memento */
        }
        setMemento(newMemento)
      }
      scope.__sail = {
        // Store a backup of onpopstate
        restore: ((previousState: Function) => {
          scope.onpopstate = previousState
        }).bind(undefined, scope.onpopstate),

        historyPushState,

        // And our override
        mypopstate,
        pushState: (...args: any[]) => {
          historyPushState.call(scope.history, ...args)
          mypopstate()
        }
      }

      // ...and then, replace it
      scope.onpopstate = scope.__sail.mypopstate
      scope.history.pushState = scope.__sail.pushState
    }
  }, [scope.history, scope.onpopstate, scope.location])

  /**
   * Almost over. Now, we just match the routes provided
   */
  function matchesPath(elem: any) {
    const { path } = elem.props
    if (typeof path === 'function') {
      if (DEBUG_SAIL) {
        console.log(`Matching ${memento.pathname} with ${path}: ${path(memento.pathname)}`, elem.props)
      }
      return path(memento.pathname)
    }
    if (DEBUG_SAIL) {
      console.log(`Matching ${memento.pathname} with ${path}: ${memento.pathname === path}`, elem.props)
    }
    return memento.pathname === path
  }
  /**
   * If no child is found, then look for a route that announced it's a default
   */
  function isDefaultRoute(elem: any) {
    return elem.props.catchAll
  }
  if (DEBUG_SAIL) {
    console.group('Sail analyzing matches:')
  }

  /**
   * Now, actually apply the above functions
   */
  const childs = flatten(props.children)

  const result = childs
    .filter(matchesPath)

  if (!result.length) {
    result.push(...childs.filter(isDefaultRoute))
  }

  if (!result.length) {
    throw new Error(`No route matched ${memento.pathname}`)
  }

  if (DEBUG_SAIL) {
    console.groupCollapsed()
    console.groupEnd()
  }
  return result.map(_ => _.props.renderer(memento))
}

/**
 * Two more details in order for this example to work:
 *
 * <Sail>
 *   <Through path="/" renderer={() => <h1>Hi! We're in {props.somewhere}!}</h1>
 * </Sail>
 *
 * - Declare `Through`
 * - Finalize some paperwork (comparing Mementos)
 */
export class Through extends React.Component<{ renderer: any; path: string } & any> {
  render() {
    return <this.props.renderer key={this.props.path} {...this.props} />
  }
}

function areMementosEqual(memento: any, newMemento: any): memento is Memento {
  if (!(typeof memento === 'object' && typeof newMemento === 'object')) {
    return false
  }
  return (
    memento.href === newMemento.href &&
    memento.path === newMemento.path &&
    memento.search === newMemento.search &&
    memento.hash === newMemento.hash &&
    memento.state === newMemento.state &&
    memento.historyLength === newMemento.historyLength &&
    memento.pushBySail === newMemento.pushBySail
  )
}

function flatten(childs: any[]) {
  return childs.reduce((cumm, element) => (Array.isArray(element) ? [...cumm, ...element] : [...cumm, element]), [])
}
