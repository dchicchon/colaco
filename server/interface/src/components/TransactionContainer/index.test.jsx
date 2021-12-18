import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import TransactionContainer from '.';

const sodas = [{
  id: 1, label: 'Pop', price: 1.5, time: new Date().toLocaleString(),
}];

const server = setupServer(
  rest.get('/api/transactions', (req, res, ctx) => res(ctx.json(sodas))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Loads Transactions Into the Table', async () => {
  render(<TransactionContainer />);
  await waitFor(() => {
    expect(screen.getByRole('document')).toHaveTextContent('Pop');
  });
});
