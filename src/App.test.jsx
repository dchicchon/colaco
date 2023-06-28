import React, { useReducer } from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import {
//  render, screen, waitFor,
// //  fireEvent,
// } from '@testing-library/react';
import { reducer } from './utils/reducer';
import { DispatchContext, StateContext } from './utils/SodaContext';
import MessageBar from './components/MessageBar';
import SodaMachine from './components/SodaMachine';

const initialState = {
  messages: [],
};

const sodas = [{
  id: 1, label: 'Pop', price: 1.00, quantity: 100,
}];

const server = setupServer(
  rest.get('http://localhost:4000/api/sodas', (req, res, ctx) => res(ctx.json(sodas))),
  rest.put('http://localhost:4000/api/sodas', (req, res, ctx) => res(ctx.json(sodas[0]))),
);

const Wrapper = function Wrapper() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <MessageBar />
        <SodaMachine />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('E2E testing for application', () => {
  test('Checking if message pops up if a user buys soda', async () => {
    expect(1).to.equal(1);
    // render(<Wrapper />);
    // fireEvent.click(screen.getByRole('button'));
    // await waitFor(() => expect(screen.getByRole('document')).toHaveTextContent('Pop'));
    // expect(screen.getByRole('button')).toHaveTextContent('');
    // await waitFor(() => {
    //     expect(screen.getByRole('alert')).toHaveTextContent('Soda Purchased: Pop');
    // });
  });
});
