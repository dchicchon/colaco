import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SodaMachine from '../components/SodaMachine';

describe('e2e test', () => {
    test('It runs a successful test', async () => {
        expect(1 + 1).toBe(2);
    });
    test('It buys a soda and gets a response', async () => {
        render(<SodaMachine />);
        await waitFor(() => {
            expect(screen.getAllByRole('document')[0]).toHaveTextContent('Fizz');
        });
    });
});
