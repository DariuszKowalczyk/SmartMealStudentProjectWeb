import React from 'react';
import styled from 'styled-components';
import {  Form } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import { ErrorBox } from './Notifications';

export const CustomFormInputWithError = ({ field, form: { touched, errors }, ...props }) => (
  <>
    <Form.Control {...field} {...props} isvalid={errors[field.name] && touched[field.name] ? 1 : 0} style={{margin: '5px 0 5px 0', borderColor: errors[field.name] && touched[field.name] ? 'red' : ''}} />
    <ErrorMessage name={field.name} render={msg => <ErrorBox message={msg} />} />
  </>
);
