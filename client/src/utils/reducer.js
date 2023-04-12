import { v4 as uuid4 } from 'uuid';
import {
    REMOVE_MESSAGE,
    ADD_MESSAGE,
    ADD_SODA,
    SET_VERSION,
    ADD_TRANSACTION,
    CLEAR_SODAS,
} from './actions';

export const reducer = (state, action) => {
    // console.log({ state, action })
    switch (action.type) {
        case SET_VERSION: {
            return {
                ...state,
                dbVersion: action.payload,
            };
        }
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
        case ADD_SODA: {
            const soda = action.payload;
            const sodas = state.sodas.slice();
            const dupeIndex = state.sodas.findIndex(
                (storedSoda) => storedSoda.key === soda.key
            );
            if (dupeIndex >= 0) {
                const updated = JSON.stringify(soda) !== JSON.stringify(sodas[dupeIndex]);
                if (updated) {
                    sodas[dupeIndex] = soda;
                    return {
                        ...state,
                        sodas,
                    };
                }
                return state;
            }
            return {
                ...state,
                sodas: [...sodas, soda],
            };
        }
        case ADD_TRANSACTION: {
            const transaction = action.payload;
            const dupeIndex = state.transactions.findIndex(
                (storedTransaction) => storedTransaction.key === transaction.key
            );
            if (dupeIndex >= 0) {
                return state;
            }
            return {
                ...state,
                transactions: [...state.transactions, transaction],
            };
        }

        case CLEAR_SODAS: {
            return {
                ...state,
                sodas: [],
            }
        }

        case REMOVE_MESSAGE: {
            const messages = state.messages.filter((message) => message.id !== action.payload);
            return {
                ...state,
                messages,
            };
        }

        default:
            return state;
    }
};
