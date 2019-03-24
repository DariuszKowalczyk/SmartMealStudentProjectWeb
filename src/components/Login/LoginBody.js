import React, { useState } from 'react';
import { Button, Form } from 'react-bulma-components/full';
import styled from 'styled-components';
import { LoginContext } from './LoginContext';

const TextInput = styled(Form.Input)`
  margin: 5px 0 5px 0;
`;
const SubmitButton = styled(Button)`
  background-color: #1a5e63;
  color: #fff;
  margin-top: 15px;
`;

const LoginBody = () => (
  <LoginContext.Consumer>
    {context => {
      if (context.activeLogin) {
        return (
          <Form.Field>
            <TextInput type="text" placeholder="E-mail" />
            <TextInput type="text" placeholder="Password" />
            <SubmitButton fullwidth>Login</SubmitButton>
          </Form.Field>
        );
      }
      if (context.activeRegister) {
        return (
          <Form.Field>
            <TextInput type="text" placeholder="E-mail" />
            <TextInput type="text" placeholder="Password" />
            <TextInput type="text" placeholder="Password Confirmation" />
            <SubmitButton fullwidth>Submit</SubmitButton>
          </Form.Field>
        );
      }
    }}
  </LoginContext.Consumer>
);
export default LoginBody;
