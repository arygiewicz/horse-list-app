import React, { useEffect, useState } from 'react';

import ListItem from '../ListItem/ListItem';
import Modal from '../Modal/Modal';
import { Horse } from '../../types';
import { url } from '../../constants';


const List: React.FC<{}> = () => {
  const [horseList, setHorseList] = useState<Horse[]>([]);
  const [horseDetails, setHorseDetails] = useState<Horse | undefined>(undefined);

  useEffect(() => {
    fetch(`${url}/horse`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setHorseList(res))
      .catch((err) => {
        console.error(err)
      })
  }, []);

  return (
    <div>
      <ul>
        {horseList.map((i, ix) =>
          <ListItem item={i} key={ix} setDetails={setHorseDetails} />
        )}
      </ul>
      {horseDetails ? <Modal details={horseDetails} /> : null}
    </div>
  );
};

export default List;