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
    const { result: state } = renderHook(() => useStateContext(), { wrapper });
    const { result: dispatch } = renderHook(() => useDispatchContext(), { wrapper });
    expect(state.current.messages.length).toBe(0);
    expect(dispatch.current).toBeTruthy();
  });
});
