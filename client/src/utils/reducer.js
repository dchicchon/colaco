import { v4 as uuid4 } from 'uuid';
import { REMOVE_MESSAGE, ADD_MESSAGE } from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const message = {
                id: uuid4(),
                text: action.payload,
            };
            return {
                ...state,
                messages: [...state.messages, message],
            };
        }

        case REMOVE_MESSAGE: {
            const messages = state.messages.filter((message) => message.id !== action.payload.id);
            return {
                ...state,
                messages,
            };
        }

        default:
            return state;
    }
};
