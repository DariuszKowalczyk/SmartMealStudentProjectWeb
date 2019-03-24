import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Columns, Form, Section, Field } from 'react-bulma-components/full';
import Login from './components/Login/LoginContainer';

export default function home() {
  return (
    <Section>
      <Container>
        <Columns centered>
          <Columns.Column size={8}>
            <Login />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  );
}
