import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Button, Field, Input } from 'rbx';
import { Button, Form } from 'react-bulma-components/full';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { useFormInput } from '../../hooks/useFormInput';

const TextInput = styled(Form.Input)`
  margin: 5px 0 5px 0;
  border-color: ${props => (props.isvalid ? null : 'red')};
`;
const SubmitButton = styled(Button)`
  background-color: #1a5e63;
  color: #fff;
  margin-top: 15px;
`;

const LoginForm = props => {
  const loginEmail = useFormInput('');
  const loginPassword = useFormInput('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const handleValidationAndLogin = () => {
    const emailValid = !!loginEmail.value;
    const passwordValid = !!loginPassword.value;
    setEmailValid(emailValid);
    setPasswordValid(passwordValid);
    if (emailValid && passwordValid) {
      axios.post('http://localhost:56829/api/Auth', { email: loginEmail.value, password: loginPassword.value });
    }
  };
  const responseFacebook = response => {
    console.log(response);
  };
  return (
    <Form.Field>
      <TextInput type="text" placeholder="E-mail" {...loginEmail} isvalid={emailValid} />
      <TextInput type="password" placeholder="Password" {...loginPassword} isvalid={passwordValid.toString} />
      <SubmitButton fullwidth onClick={() => handleValidationAndLogin()}>
        Login
      </SubmitButton>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FacebookLogin appId="2019472508359422" autoLoad fields="name,email,picture" onClick={() => {}} callback={responseFacebook} />
      </div>
    </Form.Field>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
