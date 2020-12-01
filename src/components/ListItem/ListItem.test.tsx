import React from 'react';
import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

const mockHorse = {
  id: '000',
  name: 'Name',
  profile: {
    favouriteFood: 'food',
    physical: {
      height: 500.4,
      weight: 400,
    },
  },
};

describe('ListItem component', () => {
  it('renders list item', async () => {
    render(<ListItem item={mockHorse} />);
    expect(screen.getByText(/name/i)).toBeInTheDocument();
  });
});

