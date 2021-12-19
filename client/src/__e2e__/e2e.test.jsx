import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SodaMachine from '../components/SodaMachine';

describe('e2e test', () => {
    test('It can find a soda from the server', async () => {
        render(<SodaMachine />);
        await waitFor(() => {
            expect(screen.getAllByRole('document')[0]).toHaveTextContent('Fizz');
        });
    });
    test('It can buy a soda', async () => {
        render(<SodaMachine />);
        await waitFor(() => {
            expect(screen.getAllByRole('document')[0]).toBeTruthy();
        });
        userEvent.click(screen.getAllByRole('button')[0]);
        // expect(screen.getByText('Purchased')).toBeTruthy();
    });
});
