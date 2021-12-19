import { reducer } from './reducer';
import { ADD_MESSAGE } from './actions';

describe('Testing Reducer', () => {
    test('should add a message to state', () => {
        const state = {
            messages: [],
        };
        const action = {
            type: ADD_MESSAGE,
            payload: 'Test Message',
        };

        const updatedState = reducer(state, action);
        expect(updatedState.messages.length).toBe(1);
    });
});
