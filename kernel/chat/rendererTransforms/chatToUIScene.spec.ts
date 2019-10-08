import { chatReducer } from '../reducer'
import { ChatAction, chatSystemInitializing, chatSystemSuccessfulStart, chatSystemMessage } from '../actions'
import { chatToUIScene } from './chatToUIScene'

/**
 * 
const uiTemplate = {
    name: null,
    visible: true,
    opacity: 1,
    hAlign: 'center',
    vAlign: 'center',
    width: { type: 1, value: 100 } 
}
 */

describe('chat scene', () => {
    function setup(...actions: ChatAction[]) {
        return actions.reduce(chatReducer, null)
    }
    it('renders a couple of messages', () => {
        const state = setup(chatSystemInitializing(), chatSystemSuccessfulStart(), chatSystemMessage('Welcome to Decentraland!'))
        const render = chatToUIScene(state)
        expect(render).toEqual([
            ['CreateUIScene', { id: 'dcl-ui-scene', 'baseUrl': '/'}],
            ['SendSceneMessage', 'dcl-ui-scene', 'ComponentCreated', { id: 'Cb', classId: 40 }],
            ['SendSceneMessage', 'dcl-ui-scene', 'ComponentUpdated', { id: 'Cb', json: '' }],

            ['SendSceneMessage', 'dcl-ui-scene', 'ComponentCreated', { id: 'Cb', classId: 40 }],
            ['SendSceneMessage', 'dcl-ui-scene', 'ComponentCreated', { id: 'Cb', classId: 40 }],
            ['SendSceneMessage', 'dcl-ui-scene', 'ComponentCreated', { id: 'Cb', classId: 40 }],
        ])
    })
    it('renders minimized', () => {
    })
    it('renders on focus', () => {
    })
    it('renders correctly after losing focus', () => {
    })
})