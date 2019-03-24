import React from 'react';
import styled from 'styled-components';
import LoginHeader from './header';
import LoginBody from './LoginBody';
import { LoginProvider } from './LoginContext';

const LoginWrapper = styled.div``;
export default function LoginContainer() {
  return (
    <LoginProvider>
      <LoginWrapper>
        <LoginHeader />
        <LoginBody />
      </LoginWrapper>
    </LoginProvider>
  );
}
