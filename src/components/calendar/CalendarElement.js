import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import './Calendar.css';

const CalendarElement = props => {
  const [child, setNewChild] = useState([]);

  useEffect(() => {
    // API FETCH FOR MEALS FOR ACTIVE DAY
  });

  return (
    <Row className="">
      <Col className="list-group-item list-group-item-action">Wynik formularza</Col>
    </Row>
  );
};

CalendarElement.propTypes = {};

export default CalendarElement;
