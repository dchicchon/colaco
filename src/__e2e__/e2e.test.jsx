import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SodaMachine from '../components/SodaMachine';
import { SodaProvider } from '../utils/SodaContext/index';
import MessageBar from '../components/MessageBar';

describe('e2e test', () => {
    global.URL.createObjectURL = jest.fn();
    test('It can find a soda from the server', async () => {
        render(<SodaMachine />);
        await waitFor(() => {
            expect(screen.getAllByRole('document')[0]).toHaveTextContent('Fizz');
        });
    });
    test('It can buy a soda and have a message pop up on success', async () => {
        render(
          <SodaProvider>
            <SodaMachine />
            <MessageBar />
          </SodaProvider>,
);
        await waitFor(() => {
            expect(screen.getAllByRole('document')[0]).toBeTruthy();
        });
        userEvent.click(screen.getAllByRole('button')[0]);
        await waitFor(() => {
             expect(screen.getByRole('alert')).toBeTruthy();
        });
    });
});
