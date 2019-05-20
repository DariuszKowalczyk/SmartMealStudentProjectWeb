import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { rawUrl, staticImages } from '../../helpers/consts';
import { getRecipesById } from '../../api/recipes';
import recipeDefault from '../../assets/recipe_default.png';

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
  useEffect(() => {
    fetchRecipeById(id);
  }, []);
  console.log(recipe, 'RECIPE');
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
      <Row>
        <Col xs={4} className="d-flex justify-content-center">
          <img src={recipe.imagePath ? `${staticImages}${recipe.imagePath}` : recipeDefault} alt="recipe_image" />
        </Col>
        <Col xs={8} className="d-flex flex-column">
          <Row className="no-gutters">
            <Col className="d-flex justify-content-center">
              <span className="text-uppercase font-huge">{recipe.name}</span>
            </Col>
          </Row>
          <Row className="no-gutters justify-content-start">
            <Col className="d-flex justify-content-start">aaaaaaaa</Col>
          </Row>
        </Col>
      </Row>
    );
  }
};

RecipeDetails.propTypes = {};

export default withRouter(RecipeDetails);
