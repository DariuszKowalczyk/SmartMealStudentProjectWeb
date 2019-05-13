import React, { useState, useEffect } from 'react';
import { Col, Row, Button as RButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Button } from 'react-floating-action-button';
import { FaPlus } from 'react-icons/fa';
import CalendarElement from './CalendarElement';
import useModal from '../../hooks/useModal';
import Modal from '../common/Modal';
import './Calendar.css';

const CalendarBody = props => {
  const [child, setNewChild] = useState([]);
  const modal = useModal();
  const addNewChild = () => {
    const childs = [...child];
    childs.push(<CalendarElement />);
    setNewChild(childs);
  };
  useEffect(() => {
    // API FETCH FOR MEALS FOR ACTIVE DAY
  });

  return (
    <Row className="d-flex justify-content-center">
      <Col sm={7}>
        <div className="calendar-body">
          {child}
          <div>
            <Button className="custom-floating-button" onClick={() => modal.toggle()}>
              <FaPlus />
            </Button>
          </div>
        </div>
      </Col>
      <Modal {...modal}>
        <div>
          Jakis formularz
          <br />
          <RButton
            onClick={() => {
              modal.onHide();
            }}
          >
            Odrzuć
          </RButton>
          <RButton
            onClick={() => {
              addNewChild();
              modal.onHide();
            }}
          >
            Zapisz
          </RButton>
        </div>
      </Modal>
    </Row>
  );
};

CalendarBody.propTypes = {};

export default CalendarBody;
