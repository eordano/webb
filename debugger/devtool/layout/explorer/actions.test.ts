import { LoadingAction } from './actions'
import { reducer } from './reducer'
import { mapToThing } from './reducers/mapToThing'
import { getInfo } from './selectors/getInfo'
import { getTreeInfo } from './selectors/getTreeInfo'
import snapshot from './snapshot.json'
import { EmptyTree } from './types'

const rootKeys = ['atlas', 'loading', 'profiles', 'renderer', 'protocol', 'dao', 'meta']

test('actions work', () => {
  const state = reducer()
  expect(state).toBeDefined()

  const res = reducer(state, { type: 'Loading' } as LoadingAction)
  expect(res).toEqual({ expanded: false, hasKeys: false, loading: true })

  const r2 = reducer(res, {
    type: 'Resolve',
    payload: { path: '', keys: Object.keys(snapshot) },
  })
  expect(r2).toEqual({
    expanded: false,
    hasKeys: true,
    loading: false,
    keys: ['atlas', 'loading', 'profiles', 'renderer', 'protocol', 'dao', 'meta'],
    values: rootKeys.reduce(mapToThing(EmptyTree), {} as any),
  })
})

test('query data based on selector', () => {
  const data = snapshot as any
  expect(getInfo(data, 'profiles.userInventory.0xbd23f82ee95e0ab4c46a062364b21eeeb3d58264.data')).toEqual({
    hasKeys: true,
    keys: ['0', '1', '2', '3'],
    values: {
      '0': 'dcl://dcl_launch/dcl_tshirt_upper_body',
      '1': 'dcl://stay_safe/protection_mask_african_mask',
      '2': 'dcl://stay_safe/protection_mask_hot_mask',
      '3': 'dcl://stay_safe/protection_mask_skull_mask',
    },
  })
  expect(getInfo(data, 'meta.config.explorer')).toEqual({
    hasKeys: true,
    keys: ['minBuildNumber'],
    values: {
      minBuildNumber: 0,
    },
  })
})

test('traversing data on this weird tree', () => {
  const tree = {
    hasKeys: true,
    keys: ['one', 'two', 'three'],
    values: {
      one: {
        hasKeys: true,
        keys: ['four', 'five', 'six'],
        values: {
          four: {
            hasKeys: true,
            keys: ['seven', 'eight'],
            values: {
              seven: {
                hasKeys: false,
              },
              eight: {
                hasKeys: true,
                keys: ['nine', 'ten'],
                values: {
                  nine: { hasKeys: false },
                  ten: { hasKeys: false },
                },
              },
            },
          },
          five: { hasKeys: false },
          six: { hasKeys: false },
        },
      },
      two: { hasKeys: false },
      three: { hasKeys: false },
    },
  }
  console.log(getTreeInfo(tree, 'one.four.seven'))
})
