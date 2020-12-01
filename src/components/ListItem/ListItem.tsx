import React from 'react';
import styled from 'styled-components';

import { Horse } from '../../types';

const Item = styled.span`
  &:hover {
    cursor: pointer;
  }
`

type Props = {
  item: Horse;
  setDetails: (item: Horse) => void;
};

const ListItem: React.FC<Props> = ({ item, setDetails }) => (
  <li>
    <Item onClick={() => {
      setDetails(item)
    }}>
      {item.name}
    </Item>
  </li>
);

export default ListItem;