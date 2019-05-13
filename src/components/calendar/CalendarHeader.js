import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Col, Row } from 'react-bootstrap';
import './Calendar.css';

const CalendarHeader = ({ days, active, setActive, setNextWeek, setPreviousWeek }) => (
  <>
    <Row className="d-flex justify-content-center">
      <Col sm={1} className="d-flex align-items-center justify-content-end">
        <IoIosArrowBack onClick={setPreviousWeek} size={25} className="calendar-header-arrow-icon" />
      </Col>
      <Col sm={7}>
        <Row className="no-gutters flex-row">
          {days &&
            days.map((day, idx) => (
              <Col className="calendar-header-col" onClick={() => setActive(idx)} key={idx}>
                <span>
                  {moment(day).format('ddd')}. <br />
                  {moment(day).format('DD/MM/YYYY')}
                </span>
              </Col>
            ))}
        </Row>
      </Col>
      <Col sm={1} className="d-flex align-items-center justify-content-start">
        <IoIosArrowForward onClick={setNextWeek} size={25} className="calendar-header-arrow-icon" />
      </Col>
    </Row>
    <Row>
      <Col className="d-flex justify-content-center my-4">
        <div className="calendar-header-active-date">{moment(active).format('dddd DD/MM/YYYY')}</div>
      </Col>
    </Row>
  </>
);

CalendarHeader.propTypes = {};

export default CalendarHeader;
