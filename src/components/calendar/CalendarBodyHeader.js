import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CalendarBodyColumn = ({ meals }) => (
  <Row className="no-gutters d-flex justify-content-center mb-3">
    {meals.map(name => (
      <Col>
        <Row>
          <Col className="d-flex justify-content-center no-gutters">{name}</Col>
        </Row>
      </Col>
    ))}
  </Row>
);

CalendarBodyColumn.propTypes = {};

export default CalendarBodyColumn;
