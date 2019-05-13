import React from 'react';
// import { Container, Column, Section } from 'rbx';
import { Col, Row, Container } from 'react-bootstrap';
import LoginHeader from '../../components/login/Header';
import LoginBody from '../../components/login/LoginBody';

export default function home() {
  return (
    <Container>
      <Row>
        <Col className="my-2">
          <LoginHeader />
          <LoginBody />
        </Col>
      </Row>
    </Container>
  );
}
