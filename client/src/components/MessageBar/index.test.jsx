import React, { useReducer } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MessageBar } from '.';
import { reducer } from '../../utils/reducer';
import { DispatchContext, StateContext } from '../../utils/SodaContext';

const initialState = {
    messages: [{ id: 1, text: 'Test Message' }],
};

const Wrapper = function Wrapper() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <MessageBar />
        </StateContext.Provider>
      </DispatchContext.Provider>
    );
};

describe('Renders MessageBar Component', () => {
    test('Loads Message', async () => {
        render(<Wrapper />);
        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent('Test Message');
        });
    });
});
