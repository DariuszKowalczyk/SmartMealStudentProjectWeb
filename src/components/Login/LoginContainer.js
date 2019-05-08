import React from 'react';
import styled from 'styled-components';
import LoginHeader from './Header';
import LoginBody from './LoginBody';

const LoginWrapper = styled.div``;

export default function LoginContainer() {
  return (
    <LoginWrapper>
      <LoginHeader />
      <LoginBody />
    </LoginWrapper>
  );
}
