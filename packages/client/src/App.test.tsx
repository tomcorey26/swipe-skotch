import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  test('renders learn react link', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const link = screen.getByRole('button', { name: /Play Now/i });
    // userEvent.click(link);
    // screen.debug();
  });
});
