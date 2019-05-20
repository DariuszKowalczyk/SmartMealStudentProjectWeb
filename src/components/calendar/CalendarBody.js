import React, { useState, useEffect } from 'react';
import { Col, Row, Button as RButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import FloatingButton from '../common/FloatingButton';
import CalendarElement from './CalendarElement';
import useCustomModal from '../../hooks/useCustomModal';
import AddMealForm from './AddMealForm';
import MealColumn from './CalendarBodyColumn';
import { getRecipes } from '../../api/recipes';
import CalendarBodyHeader from './CalendarBodyHeader';
import { getCalendarDay, createNewElement } from '../../api/calendar';
import { findElementNameById } from '../../helpers/CustomSelectors';

const CalendarBody = props => {
  const { currentDate } = props;
  const meals = [
    { name: 'Śniadanie', id: 0 },
    { name: 'II Śniadanie', id: 1 },
    { name: 'Obiad', id: 2 },
    { name: 'Podwieczorek', id: 3 },
    { name: 'Kolacja', id: 4 },
  ];
  const [children, setNewChild] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [secondBreakfast, setSecondBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [afterNoonSnack, setAfterNoonSnack] = useState([]);
  const [sapper, setSapper] = useState([]);
  const [Modal, { openModal, closeModal }] = useCustomModal();
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipies = async () => {
    const response = await getRecipes(setError);
    setRecipes(response);
    setIsLoading(false);
  };
  const addNewElement = async (day, mealTime, recipeId) => {
    const reponse = await createNewElement(day, mealTime, recipeId);
    setIsUpdated(true);
  };
  const fetchDayElements = async day => {
    const response = await getCalendarDay(day);
    const responseWithNames = response && response.map(f => ({ ...f, name: findElementNameById(recipes, f.recipeId) }));
    setNewChild(responseWithNames);
  };
  useEffect(() => {
    // API FETCH FOR MEALS FOR ACTIVE DAY
    if (isLoading) {
      fetchRecipies();
    }
    if (recipes) {
      fetchDayElements(moment(currentDate).format('YYYY-MM-DD'));
      setIsUpdated(false);
    }
  }, [currentDate, isUpdated, recipes]);
  return (
    <>
      <Row className="d-flex">
        <Col sm={{ span: 10, offset: 1 }}>
          <Row className="no-gutters d-flex justify-content-center mb-2">
            {meals.map((meal, idx) => (
              <Col key={idx} className="calendar-body-header align-items-center d-flex justify-content-center no-gutters m-2 ">
                {meal.name}
              </Col>
            ))}
          </Row>
          <Row className="no-gutters d-flex justify-content-center">
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={children.filter(obj => obj.mealTime === 0)} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={children.filter(obj => obj.mealTime === 1)} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={children.filter(obj => obj.mealTime === 2)} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={children.filter(obj => obj.mealTime === 3)} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={children.filter(obj => obj.mealTime === 4)} />
            </Col>
          </Row>
        </Col>
        <FloatingButton action={openModal} name="Dodaj posiłek!" />
      </Row>
      <Modal>
        <AddMealForm meals={meals} addNewChild={addNewElement} closeModal={closeModal} currentDate={currentDate} />
      </Modal>
    </>
  );
};

CalendarBody.propTypes = {};

export default CalendarBody;
