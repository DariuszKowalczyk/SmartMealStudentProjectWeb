import React, { useState, useEffect } from 'react';
import { Col, Row, Button as RButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Button } from 'react-floating-action-button';
import { FaPlus } from 'react-icons/fa';
import CalendarElement from './CalendarElement';
import useModal from '../../hooks/useModal';
import Modal from '../common/Modal';
import MealColumn from './CalendarBodyColumn';
import CalendarBodyHeader from './CalendarBodyHeader';
import './Calendar.css';

const CalendarBody = props => {
  const meals = ['Śniadanie', 'II Śniadanie', 'Obiad', 'Podwieczorek', 'Kolacja'];
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
    <>
      <Row className="d-flex">
        <Col sm={{ span: 10, offset: 1 }}>
          <CalendarBodyHeader meals={meals} />
          <Row className="calendar-body no-gutters d-flex justify-content-center">
            {meals.map(name => (
              <Col className="calendar-body-column">
                <MealColumn header={name} />
              </Col>
            ))}
          </Row>
        </Col>

        <Button className="custom-floating-button" onClick={() => modal.toggle()}>
          <FaPlus />
        </Button>
      </Row>
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
    </>
  );
};

CalendarBody.propTypes = {};

export default CalendarBody;
