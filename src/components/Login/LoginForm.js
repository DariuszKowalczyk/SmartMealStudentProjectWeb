import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Button, Field, Input } from 'rbx';
import { Formik, Form as FormikForm } from 'formik';
import { Button, Form } from 'react-bulma-components/full';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import AuthHeader from '../../helpers/AuthHeader';
import { useFormInput } from '../../hooks/useFormInput';

const TextInput = styled(Form.Input)`
  margin: 5px 0 5px 0;
`;
const SubmitButton = styled(Button)`
  background-color: #1a5e63;
  color: #fff;
  margin-top: 15px;
`;

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(4, 'Password is too short - should be 4 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});
const cookies = new Cookies();

const LoginForm = props => {
  const loginRequest = async (email, password, setErrors) => {
    try {
      const result = await axios.post('http://localhost:56829/api/Auth', { email, password });
      cookies.set('jwt', result.data.token);
      AuthHeader(result.data.token);
      return result;
    } catch (fetchError) {
      setErrors({ fetchError: 'Wrong e-mail or password' });
    }
  };
  const responseFacebook = response => {
    console.log(response);
    axios.post('http://localhost:56829/api/FacebookAuth', { accessToken: response.accessToken });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        await loginRequest(values.email, values.password, setErrors);
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <FormikForm onSubmit={handleSubmit}>
          <TextInput name="email" type="email" placeholder="E-mail" value={values.email} onChange={handleChange} />

          <span style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</span>
          <TextInput name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />

          <span style={{ color: 'red' }}>{errors.password && touched.password && errors.password}</span>
          <span style={{ color: 'red' }}>{errors && errors.fetchError}</span>

          <SubmitButton type="submit" fullwidth disabled={isSubmitting}>
            {isSubmitting ? <ClipLoader sizeUnit="px" size={20} /> : 'Login'}
          </SubmitButton>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <FacebookLogin appId="2019472508359422" fields="name,email,picture" onClick={() => {}} callback={responseFacebook} />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
