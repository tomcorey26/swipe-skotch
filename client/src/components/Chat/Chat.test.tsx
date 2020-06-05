import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Chat } from './Chat';

// describe is like a top level thing you use to "describe" related test cases
// for example you could make a describe for authentication
// and then have more specific tests for auth inside of it
describe('Chat', () => {
  test('renders learn react link', async () => {
    const { getByTestId, getByText } = render(<Chat />);

    const submitButton = getByTestId('submit-button');
    const inputText = getByTestId('chat-input');

    fireEvent.change(inputText, { target: { value: 'foo' } });

    fireEvent.click(submitButton);

    // await waitForDomChange();

    await waitForElement(() => getByText('foo'));
    // const linkElement = getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });

  // it is just a short hand for test
  // it('renders learn react link', () => {
  //   const { getByText } = render(<Chat />);
  //   const linkElement = getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
  // });
});
