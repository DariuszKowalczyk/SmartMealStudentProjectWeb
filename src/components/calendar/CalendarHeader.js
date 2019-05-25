import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getPdf } from '../../api/calendar';

const CalendarHeader = ({ days, active, setActive, setNextWeek, setPreviousWeek }) => {
  const generatePdf = () => {};
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col sm={1} className="d-flex align-items-center justify-content-end">
          <IoIosArrowBack onClick={setPreviousWeek} size={25} className="calendar-header-arrow-icon" />
        </Col>
        <Col sm={7}>
          <Row className="no-gutters flex-row">
            {days &&
              days.map((day, idx) => (
                <Col className="calendar-header-col d-flex flex-column" onClick={() => setActive(idx)} key={idx}>
                  <span>{moment(day).format('ddd')}.</span>
                  <span>{moment(day).format('DD/MM/YYYY')}</span>
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
          <div className="calendar-header-active-date">
            {moment(active).format('dddd')}
            <FaDownload size={25} className="calendar-header-download-icon" onClick={() => getPdf(moment(active).format('YYYY-MM-DD'))} />
          </div>
        </Col>
      </Row>
    </>
  );
};

CalendarHeader.propTypes = {};

export default CalendarHeader;
