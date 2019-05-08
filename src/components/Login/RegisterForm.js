import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Button, Field, Input } from 'rbx';
import { Button, Form } from 'react-bulma-components/full';
import styled from 'styled-components';
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

const RegisterForm = props => {
  const registerEmail = useFormInput('');
  const registerPassword = useFormInput('');
  const registerConfirmPassword = useFormInput('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const handleValidationAndRegister = () => {
    setEmailValid(!!registerEmail.value);
    setPasswordValid(!!registerPassword.value);
    setConfirmPasswordValid(!!registerConfirmPassword.value);
    if (registerEmail && registerPassword && registerConfirmPassword) {
      axios.post('http://localhost:56829/api/Account/register', { email: registerEmail.value, password: registerPassword.value });
    }
  };
  return (
    <Form.Field>
      <TextInput type="text" placeholder="E-mail" {...registerEmail} isvalid={emailValid} />
      <TextInput type="password" placeholder="Password" {...registerPassword} isvalid={passwordValid} />
      <TextInput type="password" placeholder="Confirm Password" {...registerConfirmPassword} isvalid={confirmPasswordValid} />
      <SubmitButton fullwidth onClick={() => handleValidationAndRegister()}>
        Register
      </SubmitButton>
    </Form.Field>
    // TODO ZMIENIC SPRAWDZANIE VALIDACJI (HOOK VALUE)
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
