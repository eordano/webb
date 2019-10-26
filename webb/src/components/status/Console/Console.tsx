import React from 'react'
import { Segment } from '../../liteui/dcl'
import 'react-console-emulator'
const Terminal = require('react-console-emulator').default

var term = null
var commands = {}
function makeCommands(that: any) {
  if (!term) {
    term = that
    Object.assign(commands, {
      start: {
        description: 'Start the unity renderer',
        usage: 'start',
        fn: function() {
        }
      },
      getProfile: {
        description: 'Get a profile using a userId',
        usage: 'getProfile <userId>',
        fn: function() {
        }
      },
      connect: {
        description: 'Connect to the comms server',
        usage: 'status',
        fn: function() {
        }
      },
      status: {
        description: 'Print your position and the current scene',
        usage: 'status',
        fn: function() {
        }
      },
      goto: {
        description: 'Teleport to another position',
        usage: 'goto <x> <y>',
        fn: function() {
        }
      },
      run: {
        description: 'Run scene at coordinates',
        usage: 'run <x> <y>',
        fn: function() {
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
  terminal = React.createRef()
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
