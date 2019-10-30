import React from 'react'
import { Segment } from '../../liteui/dcl'
import Terminal from '../../ConsoleEmulator/components/Terminal'
import { store } from '../../../store'
import { SceneManifest } from 'dcl/kernel/scene-manifest/SceneManifest'
import { resolvePositionToSceneManifest } from 'dcl/kernel/scene-atlas/resolvePositionToSceneManifest'
import { PassportAsPromise } from 'dcl/kernel/passports/PassportAsPromise'
import { Profile } from 'dcl/kernel/passports/types'
import { RunScene } from './vangogh/ears'
import { renderEntity } from 'dcl/synced-ecs/ecs/render'
import { setWorldPosition } from 'dcl/kernel/scene-atlas/01-user-position/actions'
import { teleportToTarget } from 'dcl/kernel/scene-atlas/07-settlement/actions'
import {
  protocolSubscription,
  protocolUnsubscribe,
  protocolOutProfile,
  protocolOutYell
} from 'dcl/kernel/comms/actions'
import { waitFor } from 'dcl/kernel/core/store'

var term = null
var commands: any = {}
function makeCommands(that: any) {
  if (!term) {
    term = that
    Object.assign(commands, {
      start: {
        description: 'Start the unity renderer',
        usage: 'start',
        fn: function() {}
      },
      getScene: {
        description: 'Get a scene based on its x,y coordinates',
        usage: 'getScene <x> <y>',
        fn: (x: any, y: any) => {
          resolvePositionToSceneManifest(store)(x, y).then((scene: SceneManifest) => {
            term.terminal.current.pushToStdout(
              <pre>{JSON.stringify(JSON.parse(scene.cannonicalSerialization), null, 2)}</pre>
            )
          })
        }
      },
      getProfile: {
        description: 'Get a profile using a userId',
        usage: 'getProfile <userId>',
        fn: function(userId: string) {
          PassportAsPromise(store)(userId).then((profile: Profile) => {
            term.terminal.current.pushToStdout(<pre>{JSON.stringify(profile, null, 2)}</pre>)
          })
        }
      },
      subscribe: {
        description: 'subscribe to a comms topic',
        usage: 'subscribe <topic>',
        fn: function(topic: string) {
          if (topic) {
            store.dispatch(protocolSubscription(topic))
          }
        }
      },
      protocolUnsubscribe: {
        description: 'unsubscribe to a comms topic',
        usage: 'protocolUnsubscribe <topic>',
        fn: function(topic: string) {
          if (topic) {
            store.dispatch(protocolUnsubscribe(topic))
          }
        }
      },
      chat: {
        description: 'send a chat message',
        usage: 'chat <topci> <message>',
        fn: function(...messages: string[]) {
          store.dispatch(protocolOutYell(messages.join(' ')))
        }
      },
      profile: {
        description: 'post a profile update message on all subscribed topics',
        usage: 'profile',
        fn: function(version: string) {
          if (version) {
            store.dispatch(protocolOutProfile(Object.keys(store.getState().comms.topics)))
          }
        }
      },
      reportPosition: {
        description: 'report a position in the world',
        usage: 'reportPosition <x> <y> <z>',
        fn: function(_x: string | number, _y: string | number, _z: string | number) {
          const x = typeof _x === 'string' ? parseInt(_x, 10) : _x
          const y = typeof _y === 'string' ? parseInt(_y, 10) : _y
          const z = typeof _z === 'string' ? parseInt(_z, 10) : _z
          if (isNaN(x) || isNaN(y) || isNaN(z)) {
            return 'Invalid coordinates (must specify 3, the full position in the world in "meters")'
          }
          store.dispatch(setWorldPosition({ x, y, z }))
        }
      },
      goto: {
        description: 'Teleport to another position',
        usage: 'goto <x> <y>',
        fn: function(_x: string | number, _y: string | number) {
          const x = typeof _x === 'string' ? parseInt(_x, 10) : _x
          const y = typeof _y === 'string' ? parseInt(_y, 10) : _y
          if (isNaN(x) || isNaN(y)) {
            return 'Invalid coordinates (must specify 2, the X and Y coordinates in the world grid)'
          }
          store.dispatch(teleportToTarget({ x, y }))
        }
      },
      run: {
        description: 'Run scene at coordinates',
        usage: 'run <x> <y>',
        fn: function(x: string, y: string) {
          RunScene(store)(x, y).then((data: any) => {
            const { sync } = data
            term.terminal.current.pushToStdout(<pre>{renderEntity(sync.ecs, '0', '  ')}</pre>)
          })
        }
      },
      list: {
        description: 'List userIds around your position',
        usage: 'list',
        fn: function() {}
      },
      scenes: {
        description: 'List the scenes that should be loaded around you',
        usage: 'scenes',
        fn: function() {}
      },
      scripts: {
        description: 'List the current running scene scripts',
        usage: 'scripts',
        fn: function() {}
      }
    })
  }
  return commands
}

export class MyTerminal extends React.Component {
  terminal: any = React.createRef()
  componentDidMount() {
    (async () => {
      await waitFor(store, (state) => {
        return state.comms.connected
      })
      this.terminal.current.pushToStdout('connected!')
      store.dispatch(protocolSubscription('36:36'))
    })()
  }
  render() {
    return (
      <Segment>
        <h3>Console</h3>
        <Terminal
          style={{ background: '#ffffff', maxHeight: '200px' }}
          inputStyle={{ color: '#2f2f2c', height: '25px' }}
          commands={makeCommands(this)}
          ref={this.terminal}
          promptLabel={'$'}
        />
      </Segment>
    )
  }
}
