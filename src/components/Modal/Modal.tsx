import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

import { Horse } from '../../types';
import { url } from '../../constants';

const Content = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #D2D2D2;
  border: 2px solid #000;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  padding: 16px;
`

const CloseIcon = styled.span`
  position: absolute;
  top: 0;
  right: 8px;
  font-weight: bold;
  font-size: 28px;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  margin-bottom: 8px;
`

type Props = {
  details: Horse;
};

type Values = {
  name: string;
  favouriteFood?: string;
  height?: number;
  weight?: number;
}

const Modal: React.FC<Props> = ({ details }) => {
  const { name, profile } = details;
  const { physical, favouriteFood } = profile;
  const { height, weight } = physical;

  const handleSubmit = (values: Values) => {
    const { name, favouriteFood, height, weight } = values || {}

    const updatedHorse = {
      name,
      profile: {
        favouriteFood,
        physical: {
          height: Number(height),
          weight: Number(weight),
        }
      }
    };

    fetch(`${url}/horse/${details.id}`, { 
      method: 'PUT',
      body: JSON.stringify(updatedHorse),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => {
      console.error(err);
    })
  };

  const formik = useFormik({
    initialValues: { name, favouriteFood, height, weight },
    onSubmit: values => handleSubmit(values),
  });

  return (
    <Content>
      <CloseIcon>
        x
      </CloseIcon>
      <Form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <Input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label htmlFor="food">Favourite food:</label>
        <Input
          id="food"
          name="favouriteFood"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.favouriteFood}
        />
        <label htmlFor="height">Height:</label>
        <Input
          id="height"
          name="height"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.height}
        />
        <label htmlFor="weight">Weight:</label>
        <Input
          id="weight"
          name="weight"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.weight}
        />
        <button type="submit">Save</button>
      </Form>
    </Content>
  );
};

export default Modal;