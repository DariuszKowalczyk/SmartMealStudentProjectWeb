import React, { useState, useEffect } from 'react';
import { Col, Row, Button as RButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FloatingButton from '../common/FloatingButton';
import CalendarElement from './CalendarElement';
import useCustomModal from '../../hooks/useCustomModal';
import AddMealForm from './AddMealForm';
import MealColumn from './CalendarBodyColumn';
import CalendarBodyHeader from './CalendarBodyHeader';

const CalendarBody = props => {
  const meals = ['Śniadanie', 'II Śniadanie', 'Obiad', 'Podwieczorek', 'Kolacja'];
  const [children, setNewChild] = useState([
    { type: 0, elements: [{ image: '', name: 'płatki z mlekiem' }, { image: '', name: 'sok pomaranczowy' }] },
    { type: 1, elements: [{ image: '', name: 'jabłko' }, { image: '', name: 'gruszka' }] },
  ]);
  const [breakfast, setBreakfast] = useState([]);
  const [secondBreakfast, setSecondBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [afterNoonSnack, setAfterNoonSnack] = useState([]);
  const [sapper, setSapper] = useState([]);
  const [Modal, { openModal, closeModal }] = useCustomModal();

  const addNewChild = (name, type, image) => {
    children.map(child => {
      console.log(child.type, type);
      if (child.type === type) {
        return setNewChild(() => [{ type: child.type, elements: [...child.elements, { name, image }] }]);
      }
      if (child.type > 0 && child.type < 5) {
        return setNewChild(() => [{ type, elements: [{ name, image }] }]);
      }
    });
  };

  useEffect(() => {
    // API FETCH FOR MEALS FOR ACTIVE DAY
    children.map(child => {
      if (child.type === 0) {
        setBreakfast(child.elements);
      }
      if (child.type === 1) {
        setSecondBreakfast(child.elements);
      }
      if (child.type === 2) {
        setDinner(child.elements);
      }
      if (child.type === 3) {
        setAfterNoonSnack(child.elements);
      }
      if (child.type === 4) {
        setSapper(child.elements);
      }
    });
  }, [children]);

  return (
    <>
      <Row className="d-flex">
        <Col sm={{ span: 10, offset: 1 }}>
          <Row className="no-gutters d-flex justify-content-center mb-2">
            {meals.map((name, idx) => (
              <Col className="calendar-body-header align-items-center d-flex justify-content-center no-gutters m-2 ">{name}</Col>
            ))}
          </Row>
          <Row className="no-gutters d-flex justify-content-center">
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={breakfast} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={secondBreakfast} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={dinner} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={afterNoonSnack} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={sapper} />
            </Col>
          </Row>
        </Col>
        <FloatingButton action={openModal} name="Add new meal!" />
      </Row>
      <Modal>
        <AddMealForm meals={meals} addNewChild={addNewChild} closeModal={closeModal} />
      </Modal>
    </>
  );
};

CalendarBody.propTypes = {};

export default CalendarBody;
