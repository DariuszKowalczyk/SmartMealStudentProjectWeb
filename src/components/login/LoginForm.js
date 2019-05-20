import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Formik, Form as FormikForm, ErrorMessage, Field } from 'formik';
import { Button, Form } from 'react-bulma-components/full';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import { ErrorBox, SuccessBox } from '../common/Notifications';
import { CustomFormInputWithError } from '../common/CustomFormInputWithError';
import AuthHeader from '../../helpers/AuthHeader';

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
  const loginRequest = async (email, password, setStatus) => {
    try {
      const result = await axios.post('http://localhost:56829/api/Auth', { email, password });
      cookies.set('jwt', result.data.token);
      AuthHeader(result.data.token);
      props.history.push('/');
      return result;
    } catch (fetchError) {
      setStatus({ msg: 'Wrong e-mail or password' });
    }
  };
  const responseFacebook = async (response, setStatus) => {
    console.log(response, 'RESPONSE');
    try {
      const result = await axios.post('http://localhost:56829/api/FacebookAuth', { accessToken: response.accessToken });
      cookies.set('jwt', result.data.token);
      AuthHeader(result.data.token);
      props.history.push('/');
    } catch (err) {
      setStatus({ msg: 'Something went wrong.' });
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      initialStatus={{ form: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus({});
        await loginRequest(values.email, values.password, setStatus);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting, status, setSubmitting, setStatus }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Field name="email" type="email" component={CustomFormInputWithError} placeholder="E-mail" />
          <Field name="password" type="password" component={CustomFormInputWithError} placeholder="Password" />
          {status && status.msg ? <ErrorBox message={status.msg} /> : null}
          <SubmitButton type="submit" fullwidth disabled={isSubmitting}>
            {isSubmitting ? <ClipLoader sizeUnit="px" size={20} /> : 'Login'}
          </SubmitButton>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <FacebookLogin
              appId="2019472508359422"
              fields="name,email,picture"
              onClick={() => setSubmitting(true)}
              callback={e => responseFacebook(e, setStatus)}
              isDisabled={isSubmitting}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {};

export default withRouter(LoginForm);
