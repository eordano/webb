import React, { useCallback } from 'react'
import { Store } from 'redux'
import { useStore2 } from '../../../jslibs/hooks/useStore2'
import { ExplorableTree, ScenesState } from '../../types/explorer'
import { collapseAction, expandAction, loadAction } from '../explorer/actions/actionCreators'

export function ExploreTree(props: {
  name: string
  tree: ExplorableTree
  dispatch: any
  path: string
  offset: number
}) {
  if (!props.tree) {
    return <pre>Error</pre>
  }
  const { loading, hasKeys, expanded } = props.tree

  const toggle = useCallback(() => props.dispatch((expanded ? collapseAction : expandAction)(props.path)), [
    props.path,
    expanded,
  ])
  const reload = useCallback(() => {
    props.dispatch(loadAction(props.path))
  }, [props.path])
  const isFinalValue = typeof props.tree.values !== 'object'
  return (
    <div style={{ marginLeft: props.offset + 'px' }} className='renderer-section'>
      <span onClick={toggle}>
        {loading ? 'loading' : expanded ? '-' : '+'}{' '}
        {hasKeys
          ? `${props.name}: ${isFinalValue ? props.tree.values : props.tree.keys?.length + ' values'}`
          : `${props.name}: [?]`}
      </span>
      {hasKeys && !!expanded && !isFinalValue ? (
        <span className='reload' onClick={reload}>
          [reload]
        </span>
      ) : (
        <span />
      )}
      {!loading &&
        hasKeys &&
        expanded &&
        typeof props.tree.values === 'object' &&
        props.tree.keys!.map((name) => {
          const leaf = props.tree.values![name]
          return (
            <ExploreTree
              name={name}
              dispatch={props.dispatch}
              tree={typeof leaf === 'object' ? leaf : { expanded: true, hasKeys: true, values: leaf }}
              path={props.path + '.' + name}
              key={name}
              offset={props.offset + 8}
            />
          )
        })}
    </div>
  )
}

export function Scenes(props: { windowContext: Window; scenesStore: Store<ScenesState> }) {
  if (!props.scenesStore) {
    return <h2>Loading...</h2>
  }
  const [tree, dispatch] = useStore2(props.scenesStore)
  return (
    <div>
      <h2>Scenes</h2>
      <ExploreTree name='Root' dispatch={dispatch} tree={tree} path='' offset={8} />
    </div>
  )
}

export default Scenes
