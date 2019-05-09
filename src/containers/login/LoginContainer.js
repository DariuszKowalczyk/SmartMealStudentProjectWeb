import React from 'react';
import { Container, Column, Section } from 'rbx';
import LoginHeader from '../../components/Login/Header';
import LoginBody from '../../components/Login/LoginBody';

export default function home() {
  return (
    <Section>
      <Container>
        <Column.Group centered>
          <Column size={8}>
            <LoginHeader />
            <LoginBody />
          </Column>
        </Column.Group>
      </Container>
    </Section>
  );
}
