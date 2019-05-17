import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import defaultImage from '../../assets/default.jpg';

const CalendarElement = ({ elements }) => {
  if (elements.length > 0) {
    return elements.map((element, idx) => (
      <Row className="calendar-element no-gutters d-flex align-items-center" key={idx}>
        <Col md={12} lg={4} xl={3} className="d-flex justify-content-center">
          <div className="flex-shrink-0 flex-grow-0 p-2">
            <img src={element.image || defaultImage} alt="dish" className="calendar-element-image" />
          </div>
        </Col>
        <Col md={12} lg={8} xl={9} className=" p-1 calendar-element-name">
          {element.name}
        </Col>
      </Row>
    ));
  }

  return null;
};

CalendarElement.propTypes = {};

export default CalendarElement;
