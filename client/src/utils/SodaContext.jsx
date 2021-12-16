import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const StateContext = createContext();
const DispatchContext = createContext();

export const useStateContext = () => useContext(StateContext);
export const useDispatchContext = () => useContext(DispatchContext);

const initialState = {
    message: 'Hey there cowboy',
};

export const SodaProvider = function SodaProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          {children}
        </StateContext.Provider>
      </DispatchContext.Provider>

    );
};
