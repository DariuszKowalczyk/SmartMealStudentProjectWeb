import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Button, Field, Input } from 'rbx';
import { Formik, Form as FormikForm } from 'formik';
import { useAlert } from 'react-alert';
import { Button, Form } from 'react-bulma-components/full';
import styled from 'styled-components';
import axios from 'axios';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';

const TextInput = styled(Form.Input)`
  margin: 5px 0 5px 0;
`;

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
  const registerRequest = async (email, password, setErrors) => {
    try {
      await axios.post('http://localhost:56829/api/Account/register', { email, password });
      alert.success('Register successful');
    } catch (fetchError) {
      setErrors({ fetchError: 'Wrong e-mail or password' });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', passwordConfirmation: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          await registerRequest(values.email, values.password, setErrors);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <FormikForm onSubmit={handleSubmit}>
            <TextInput name="email" type="email" placeholder="E-mail" value={values.email} onChange={handleChange} />

            <span style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</span>
            <TextInput name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />

            <span style={{ color: 'red' }}>{errors.password && touched.password && errors.password}</span>
            <TextInput
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm Password"
              value={values.passwordConfirmation}
              onChange={handleChange}
            />
            <span style={{ color: 'red' }}>{errors && touched.passwordConfirmation && errors.passwordConfirmation}</span>
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
