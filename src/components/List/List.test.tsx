import React from 'react';
import { render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';

import List from './List';


describe('List component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders list elements', async () => {
    fetch.mockResponseOnce(JSON.stringify([
      {
        id: '000',
        name: 'Name',
        profile: {
          favouriteFood: 'potatoes',
          physical: {
            height: 300.53,
            width: 500
          }
        }
      },
      {
        id: '001',
        name: 'Name2',
        profile: {
          favouriteFood: 'food',
          physical: {
            height: 400.4,
            width: 500
          }
        }
      },
    ]));

    render(<List />);
    const list = await screen.findAllByRole('listitem');
    expect(list).toHaveLength(2);
  });
});

