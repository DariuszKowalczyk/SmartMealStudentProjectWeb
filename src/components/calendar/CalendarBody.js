import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { FaTrashAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import FloatingButton from '../common/FloatingButton';
import CalendarElement from './CalendarElement';
import useCustomModal from '../../hooks/useCustomModal';
import AddMealForm from './AddMealForm';
import { getRecipes } from '../../api/recipes';
import { getCalendarDay, createNewElement, getCalendarElementById, deleteMealById } from '../../api/calendar';
import { findElementNameById } from '../../helpers/CustomSelectors';
import recipeDefault from '../../assets/default.jpg';
import { staticImages } from '../../helpers/consts';

const CalendarBody = props => {
  const { currentDate } = props;
  const meals = [
    { name: 'Śniadanie', id: 0 },
    { name: 'II Śniadanie', id: 1 },
    { name: 'Obiad', id: 2 },
    { name: 'Podwieczorek', id: 3 },
    { name: 'Kolacja', id: 4 },
  ];
  const [isModalLoading, setIsModalLoading] = useState(true);
  const [modalError, setModalError] = useState();
  const [activeElement, setActiveElement] = useState();
  const [children, setNewChild] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [Modal, { openModal, closeModal }] = useCustomModal();
  const mealDetails = useCustomModal();
  const [MealDetails, mealDetailsActions] = mealDetails;
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductById = async id => {
    setIsModalLoading(true);
    setModalError();
    mealDetailsActions.openModal();
    const element = await getCalendarElementById(id, setModalError);
    if (element) {
      setActiveElement(element);
    }
    setIsModalLoading(false);
  };

  const fetchRecipies = async () => {
    setIsLoading(true);
    const response = await getRecipes(setError);
    setRecipes(response);
    setIsLoading(false);
  };

  const addNewElement = async (day, mealTime, recipeId) => {
    console.log(day, 'DAY');
    const reponse = await createNewElement(day, mealTime, recipeId);
    setIsUpdated(true);
  };

  const fetchDayElements = async day => {
    const response = await getCalendarDay(day);
    const responseWithNames = response && response.map(f => ({ ...f, name: findElementNameById(recipes, f.recipeId) }));
    setNewChild(responseWithNames);
  };

  const deleteMeal = async id => {
    setModalError();
    const response = await deleteMealById(id, setModalError);
    mealDetailsActions.closeModal();
    setIsUpdated(true);
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
  if (isLoading) {
    return (
      <Row>
        <Col className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Col>
      </Row>
    );
  }
  if (error) {
    return (
      <Row>
        <Col className="d-flex justify-content-center">{error}</Col>
      </Row>
    );
  }
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
              <CalendarElement elements={children.filter(obj => obj.mealTime === 0)} onClick={fetchProductById} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={children.filter(obj => obj.mealTime === 1)} onClick={fetchProductById} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={children.filter(obj => obj.mealTime === 2)} onClick={fetchProductById} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={children.filter(obj => obj.mealTime === 3)} onClick={fetchProductById} />
            </Col>
            <Col className="calendar-body-column m-2">
              <CalendarElement elements={children.filter(obj => obj.mealTime === 4)} onClick={fetchProductById} />
            </Col>
          </Row>
        </Col>
        <FloatingButton action={openModal} name="Dodaj posiłek!" />
      </Row>
      <Modal>
        <AddMealForm meals={meals} addNewChild={addNewElement} closeModal={closeModal} currentDate={currentDate} />
      </Modal>
      <MealDetails>
        {isModalLoading ? (
          <Row>
            <Col>
              <Spinner animation="border" variant="primary" />
            </Col>
          </Row>
        ) : modalError ? (
          <Row>
            <Col>
              <span className="text-center" style={{ color: 'red' }}>
                {modalError}
              </span>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col className="text-center font-huge text-uppercase p-2">{findElementNameById(recipes, activeElement.recipe.id)}</Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center p-2">
                <img
                  alt="meal_day"
                  src={activeElement.recipe.imagePath ? `${staticImages}${activeElement.recipe.imagePath}` : recipeDefault}
                  className="calendar-details-image"
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center p-2">{findElementNameById(meals, activeElement.mealTime)}</Col>
            </Row>
            <Row>
              <Col className="text-center p-2">{moment(activeElement.mealDay).format('MM/DD/YYYY')}</Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  className="btn btn-danger m-1"
                  onClick={() => {
                    deleteMeal(activeElement.id);
                  }}
                >
                  <FaTrashAlt size={20} color="white" />
                </Button>
                <Button
                  className="btn btn-light m-1"
                  onClick={() => {
                    props.history.push(`/RecipeDetails/${activeElement.recipe.id}`);
                  }}
                >
                  <FaExternalLinkAlt size={20} color="" />
                </Button>
              </Col>
            </Row>
          </>
        )}
      </MealDetails>
    </>
  );
};

CalendarBody.propTypes = {};

export default withRouter(CalendarBody);
