import React, { useEffect, useState } from 'react';
import ListItem from '../ListItem/ListItem';

const List: React.FC<{}> = () => {
  const [horseList, setHorseList] = useState([]);

  const url = 'http://localhost:3016';

  useEffect(() => {
    fetch(`${url}/horse`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setHorseList(res))
      .catch((err) => {
        console.error(err)
      })
  }, []);

  return (
    <ul>
      {horseList.map((i, ix) =>
        <ListItem item={i} key={ix} />
      )}
    </ul>
  );
};

export default List;