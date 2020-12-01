import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders without error', () => {
    render(<Header />);
    expect(screen.getByText(/available horses:/i)).toBeInTheDocument();
  });
});

