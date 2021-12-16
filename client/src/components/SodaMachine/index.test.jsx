import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import SodaMachine from '.';

const sodas = [{
    id: 1, label: 'Pop', price: 1.00, quantity: 100,
   }];

const server = setupServer(
    rest.get('http://localhost:3000/api/sodas', (req, res, ctx) => res(ctx.json(sodas))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Loads Sodas into the machine', async () => {
    render(<SodaMachine />);
    await waitFor(() => {
        expect(screen.getByRole('document')).toHaveTextContent('Pop');
    });
});
