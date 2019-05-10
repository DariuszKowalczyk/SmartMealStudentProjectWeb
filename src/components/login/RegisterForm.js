import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Button, Field, Input } from 'rbx';
import { Formik, Form as FormikForm, ErrorMessage, Field } from 'formik';
import { useAlert } from 'react-alert';
import { Button, Form } from 'react-bulma-components/full';
import styled from 'styled-components';
import axios from 'axios';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import { CustomFormInputWithError } from '../common/CustomFormInputWithError';
import { ErrorBox, SuccessBox } from '../common/Notifications';

const SubmitButton = styled(Button)`
  background-color: #1a5e63;
  color: #fff;
  margin-top: 15px;
`;
const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('No e-mail provided'),
  password: Yup.string()
    .required('No password provided.')
    .min(4, 'Password is too short - should be 4 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('No password confirm provided.'),
});

const RegisterForm = props => {
  const alert = useAlert();
  const registerRequest = async (email, password, setStatus, resetForm) => {
    try {
      await axios.post('http://localhost:56829/api/Account/register', { email, password });
      resetForm();
      setStatus({ msg: 'Register Sucessful' });
    } catch (fetchError) {
      setStatus({ fetchError: 'Wrong e-mail or password' });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', passwordConfirmation: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
          await registerRequest(values.email, values.password, setStatus, resetForm);
          setSubmitting(false);
        }}
      >
        {({ status, handleSubmit, isSubmitting }) => (
          <FormikForm onSubmit={handleSubmit}>
            <Field name="email" type="email" component={CustomFormInputWithError} placeholder="E-mail" />
            <Field name="password" type="password" component={CustomFormInputWithError} placeholder="Password" />
            <Field name="passwordConfirmation" type="password" component={CustomFormInputWithError} placeholder="Confirm password" />
            {status && status.msg ? <SuccessBox message={status.msg} /> : null}
            {status && status.fetchError ? <ErrorBox message={status.fetchError} /> : null}
            <SubmitButton type="submit" fullwidth disabled={isSubmitting}>
              {isSubmitting ? <ClipLoader sizeUnit="px" size={20} /> : 'Login'}
            </SubmitButton>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
