import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner, Button, Modal as RModal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { MdReplay } from 'react-icons/md';
import { rawUrl, staticImages } from '../../helpers/consts';
import { findElementNameById } from '../../helpers/CustomSelectors';
import { getRecipesById, deleteRecipe } from '../../api/recipes';
import recipeDefault from '../../assets/recipe_default.png';
import useCustomModal from '../../hooks/useCustomModal';

const RecipeDetails = props => {
  const { id } = props.match.params;
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchRecipeById = async id => {
    const response = await getRecipesById(id, setError);
    setRecipe(response);
    setIsLoading(false);
  };
  const [Modal, { openModal, closeModal }] = useCustomModal();
  const openDeleteModal = () => {
    openModal();
  };
  const deleteRecipeById = async (id, history) => {
    const response = await deleteRecipe(id, setError);
    if (response) {
      history.push('/recipes');
    }
  };
  useEffect(() => {
    fetchRecipeById(id);
  }, []);
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
  if (recipe) {
    return (
      <>
        <Row className="justify-content-center">
          <Col xs={4} lg={4} className="d-flex justify-content-center align-items-center flex-column my-2">
            <img src={recipe.imagePath ? `${staticImages}${recipe.imagePath}` : recipeDefault} alt="recipe_image" className="recipe-details-image" />
            <span className="recipe-details-description">Składniki:</span>
            <ul className="my-2 recipe-details-list">
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => {
                  const string = `${ingredient.product.name} ${ingredient.amount} ${ingredient.metric}`;
                  return <li key={index}>{string}</li>;
                })}
            </ul>
          </Col>
          <Col xs={8} lg={8} className="my-5">
            <span className="text-uppercase font-huge text-center">{recipe.name}</span>
            <Row className="no-gutters my-3">
              <Col xs={3} lg={1} xl={1} className="recipe-details-description">
                Opis:
              </Col>
              <Col xs={9} lg={11} xl={11} className="d-flex justify-content-start">
                {recipe.description}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={4}>
            <Button
              type="submit"
              className="calendar-modal-submit-button text-huge text-uppercase my-1"
              variant="secondary"
              onClick={() => props.history.push('/Recipes')}
            >
              Przepisy
            </Button>
            <Button
              type="submit"
              className="calendar-modal-submit-button text-huge text-uppercase my-1"
              variant="danger"
              onClick={() => openDeleteModal()}
            >
              Usuń
            </Button>
          </Col>
        </Row>
        <Modal>
          <RModal.Header>
            <RModal.Title>Usuń Przepis</RModal.Title>
          </RModal.Header>

          <RModal.Body>
            <p>
              Czy napewno chcesz usunąć przepis? <br />
              Tej czynności nie będzie można cofnąć
            </p>
          </RModal.Body>

          <RModal.Footer>
            <Button variant="secondary" onClick={() => closeModal()}>
              Close
            </Button>
            <Button variant="danger" onClick={() => deleteRecipeById(id, props.history)}>
              Delete
            </Button>
          </RModal.Footer>
        </Modal>
      </>
    );
  }
};

RecipeDetails.propTypes = {};

export default withRouter(RecipeDetails);
