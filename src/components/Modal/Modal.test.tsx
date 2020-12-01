import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from './Modal';


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

describe('Modal component', () => {
  const noop = () => undefined;

  it('renders horse details', () => {
    render(<Modal details={mockHorse} setDetails={noop} setList={noop} />);

    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/favourite food/i)).toBeInTheDocument();
    expect(screen.getByText(/height/i)).toBeInTheDocument();
    expect(screen.getByText(/weight/i)).toBeInTheDocument();
  });

  it('renders save button and close icon', () => {
    render(<Modal details={mockHorse} setDetails={noop} setList={noop} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('x')).toBeInTheDocument();
  });

  it('renders a name input which is required', async () => {
    render(<Modal details={mockHorse} setDetails={noop} setList={noop} />);

    userEvent.clear(screen.getByLabelText(/name/i));

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

  });
});

