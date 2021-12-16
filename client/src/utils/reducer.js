import { SET_MESSAGE } from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
