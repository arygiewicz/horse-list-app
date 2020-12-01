import React from 'react';

type Horse = {
  id: string;
  name: string;
  profile: {
    favouriteFood?: string;
    physical: {
      height?: number;
      weight?: number;
    };
  };
}; 

type Props = {
  item: Horse;
};

const ListItem: React.FC<Props> = ({ item }) => (
  <li>
    <span>
      {item.name}
    </span>
  </li>
);

export default ListItem;