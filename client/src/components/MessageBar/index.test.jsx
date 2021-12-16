import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { SodaProvider } from '../../utils/SodaContext';

import MessageBar from '.';

beforeEach(() => {
  // setup a DOM element as a render target
});

afterEach(() => {
  // cleanup on exiting
});

it('renders', () => {
    act(() => {
        render(<SodaProvider>
          <MessageBar />
        </SodaProvider>);
    });
});
