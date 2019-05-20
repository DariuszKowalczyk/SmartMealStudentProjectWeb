import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import defaultImage from '../../assets/default.jpg';
import useCustomModal from '../../hooks/useCustomModal';
import { staticImages } from '../../helpers/consts';

const CalendarElement = ({ elements, onClick }) =>
  elements &&
  elements.map((element, idx) => (
    <Row className="calendar-element no-gutters d-flex align-items-center" key={idx} onClick={() => onClick(element.id)}>
      <Col md={12} lg={4} xl={3} className="d-flex justify-content-center">
        <div className="flex-shrink-0 flex-grow-0 p-2">
          <img
            src={element.recipe.imagePath ? `${staticImages}${element.recipe.imagePath}` : defaultImage}
            alt="dish"
            className="calendar-element-image"
          />
        </div>
      </Col>
      <Col md={12} lg={8} xl={9} className="d-sm-none d-md-flex p-1 calendar-element-name">
        {element.recipe.name}
      </Col>
    </Row>
  ));

CalendarElement.propTypes = {};

export default CalendarElement;
