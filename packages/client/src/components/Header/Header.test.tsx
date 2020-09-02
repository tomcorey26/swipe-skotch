import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  test('"How it works" link points to the correct page', () => {
    render(<Header />);

    // screen.debug();
  });
});
