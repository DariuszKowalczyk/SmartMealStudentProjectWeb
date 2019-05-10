import React from 'react';
import styled from 'styled-components';
import { Button, Form } from 'react-bulma-components/full';
import { ErrorMessage } from 'formik';
import { ErrorBox } from './Notifications';

const TextInput = styled(Form.Input)`
  margin: 5px 0 5px 0;
  border-color: ${props => (props.isvalid ? 'red' : '')};
`;
export const CustomFormInputWithError = ({ field, form: { touched, errors }, ...props }) => (
  <>
    <TextInput {...field} {...props} isvalid={errors[field.name] && touched[field.name] ? 1 : 0} />{' '}
    <ErrorMessage name={field.name} render={msg => <ErrorBox message={msg} />} />
  </>
);
