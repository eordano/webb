import { chatReducer, SYSTEM } from "./reducer"
import { chatSystemMessage, chatOtherUserYell } from "./actions"

describe('chat reducer', () => {
    function setup() {
        return chatReducer()
    }
    it('appends messages correctly', () => {
        const initial = setup()
        const afterState = [
            chatSystemMessage('Welcome to Decentraland'),
            chatOtherUserYell('fakeUserId', 'Hi!')
        ].reduce(chatReducer, initial)
        expect(afterState.messages[0].from).toBe(SYSTEM)
    })
})