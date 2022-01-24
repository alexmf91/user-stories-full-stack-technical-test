import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Given an App component', () => {
  describe('When the component is rendered', () => {
    test('Then "beLike" text should be in the document', () => {
      render(<App />);
      expect(screen.getByText(/beLike/i)).toBeInTheDocument();
    });
  });
});
