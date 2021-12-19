import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import {
 StateContext, DispatchContext, useStateContext, SodaProvider, useDispatchContext,
} from '.';

const initialState = {
  messages: [],
};
const initialDispatch = jest.fn();

 const wrapper = ({ children }) => (
   <DispatchContext.Provider value={initialDispatch}>
     <StateContext.Provider value={initialState}>
       {children}
     </StateContext.Provider>
   </DispatchContext.Provider>
);

describe('useContext test', () => {
  test('should return state and dispatch from both providers ', () => {
    render(<SodaProvider />);
    const { result: stateTest } = renderHook(() => useStateContext(), { wrapper });
    const { result: dispatchTest } = renderHook(() => useDispatchContext(), { wrapper });
    expect(dispatchTest.current).toEqual(initialDispatch);
    expect(stateTest.current).toEqual(initialState);
  });
});
