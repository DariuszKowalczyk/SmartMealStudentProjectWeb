import React, { useState } from 'react';
import { Button, Form } from 'react-bulma-components/full';
import styled from 'styled-components';
import { LoginContext } from './LoginContext';

const CustomButton = styled(Button)`
  color: ${props => (props.isActive ? 'primary' : 'info')};
`;

const Header = () => (
  <LoginContext.Consumer>
    {context => (
      <Form.Field kind="group">
        <CustomButton fullwidth size="medium" color={context.activeLogin ? 'primary' : ''} onClick={() => context.changeLoginToActive()}>
          Logowanie
        </CustomButton>
        <CustomButton
          fullwidth
          size="medium"
          color={context.activeRegister ? 'primary' : ''}
          onClick={() => context.changeRegisterToAcvite()}
          isActive={context.activeRegister}
        >
          Rejestracja
        </CustomButton>
      </Form.Field>
    )}
  </LoginContext.Consumer>
);

export default Header;
