import React from 'react'
import { Segment } from '../../liteui/dcl'
import Terminal from '../../ConsoleEmulator/components/Terminal'
import { store } from '../../../store'
import { restoreSession } from 'dcl/kernel/auth/actions'
import { SceneManifest } from 'dcl/kernel/scene-manifest/SceneManifest'
import { resolvePositionToSceneManifest } from 'dcl/kernel/scene-atlas/resolvePositionToSceneManifest'
import { commsStarted } from 'dcl/kernel/comms/actions'
import { PassportAsPromise } from 'dcl/kernel/passports/PassportAsPromise'
import { Profile } from 'dcl/kernel/passports/types'
import { RunScene } from './vangogh/ears'
import { renderEntity } from 'dcl/synced-ecs/ecs/render'

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
      login: {
        description: 'Login',
        usage: 'login',
        fn: function() {
          store.dispatch(restoreSession())
        }
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
      connect: {
        description: 'Connect to the comms server',
        usage: 'connect',
        fn: function() {
          store.dispatch(commsStarted())
        }
      },
      status: {
        description: 'Print your position and the current scene',
        usage: 'status',
        fn: function() {}
      },
      goto: {
        description: 'Teleport to another position',
        usage: 'goto <x> <y>',
        fn: function() {}
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
      listTopics: {
        description: 'List topics to which you are connected',
        usage: 'listTopics',
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
