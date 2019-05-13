import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CalendarBodyColumn = ({ listOfMeals }) => (
  <Row>
    <Col>
      <Row>
        <Col>Zwrotka z API</Col>
      </Row>
    </Col>
  </Row>
);

CalendarBodyColumn.propTypes = {};

export default CalendarBodyColumn;
