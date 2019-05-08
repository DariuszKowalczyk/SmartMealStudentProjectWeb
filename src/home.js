import React from 'react';
import { Container, Column, Section } from 'rbx';
import Login from './components/Login/LoginContainer';

export default function home() {
  return (
    <Section>
      <Container>
        <Column.Group centered>
          <Column size={8}>
            <Login />
          </Column>
        </Column.Group>
      </Container>
    </Section>
  );
}
