import React from 'react';
import styled from 'styled-components';
import { FormikErrors, FormikValues, useFormik } from 'formik';

import { Horse } from '../../types';
import { url } from '../../constants';

const Content = styled.div`
  position: absolute;
  top: 25%;
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`

const Error = styled.p`
  font-size: 12px;
  margin: 0;
  color: red;
`

type Props = {
  details: Horse;
  setDetails: (item: Horse | undefined) => void;
  setList: (value: Horse[]) => void
};

type Values = {
  name: string;
  favouriteFood?: string;
  height?: number;
  weight?: number;
}

const Modal: React.FC<Props> = ({ details, setDetails, setList }) => {
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
          height: height,
          weight: weight,
        }
      }
    };

    fetch(`${url}/horse/${details.id}`, { 
      method: 'PUT',
      body: JSON.stringify(updatedHorse),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      fetch(`${url}/horse`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setList(res))
    }).then(() => {
      setDetails(undefined);
    }).catch((err) => {
      console.error(err);
    })
  };
  

  const formik = useFormik({
    initialValues: { name, favouriteFood, height, weight },
    onSubmit: values => handleSubmit(values),
    validate: values => {
      let errors: FormikErrors<FormikValues> = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      return errors;
    },
  });

  return (
    <Content>
      <CloseIcon onClick={() => setDetails(undefined)}>
        x
      </CloseIcon>
      <form onSubmit={formik.handleSubmit}>
        <InputWrapper>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <Error>{formik.errors.name}</Error> : null}
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="food">Favourite food:</label>
          <input
            id="food"
            name="favouriteFood"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.favouriteFood}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="height">Height:</label>
          <input
            id="height"
            name="height"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.height}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="weight">Weight:</label>
          <input
            id="weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.weight}
          />
        </InputWrapper>
        <button type="submit">Save</button>
      </form>
    </Content>
  );
};

export default Modal;