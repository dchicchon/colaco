import { reducer } from './reducer';
import { ADD_MESSAGE, REMOVE_MESSAGE } from './actions';

describe('Testing Reducer', () => {
    test('should add a message to state and remove it', () => {
        const state = {
            messages: [],
        };
        const addAction = {
            type: ADD_MESSAGE,
            payload: 'Test Message',
        };

        const updatedState = reducer(state, addAction);
        const idToDelete = updatedState.messages[0].id;
        expect(updatedState.messages.length).toBe(1);
        const deleteAction = {
            type: REMOVE_MESSAGE,
            payload: { id: idToDelete },
        };
        const updatedState2 = reducer(updatedState, deleteAction);
        expect(updatedState2.messages.length).toBe(0);
    });
});
