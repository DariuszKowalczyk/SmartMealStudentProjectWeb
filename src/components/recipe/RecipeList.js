import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import FloatingButton from '../common/FloatingButton';
import { useRecipeFetchHook } from '../../hooks/useRecipeFetchHook';
import { getRecipes } from '../../api/recipes';
import { rawUrl, staticImages } from '../../helpers/consts';
import recipeDefault from '../../assets/recipe_default.png';

const RecipeList = props => {
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState('');
  const fetchRecipes = async () => {
    const result = await getRecipes(setError);
    setRecipes(result);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (recipes === null) {
    return (
      <Row>
        <Col className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Col>
      </Row>
    );
  }
  if (recipes.length === 0) {
    return (
      <Row>
        <Col className="d-flex justify-content-center">Brak przepisów</Col>
        <FloatingButton
          action={() => {
            props.history.push('/CreateRecipe');
          }}
          name="Dodaj nowy przepis!"
        />
      </Row>
    );
  }
  if (recipes) {
    return (
      <Row>
        {recipes &&
          recipes.map(recipe => (
            <Col xs={12} sm={6} md={4} className="d-flex justify-content-center flex-column align-items-center mb-4" key={recipe.id}>
              <img
                src={recipe.imagePath ? `${staticImages}${recipe.imagePath}` : recipeDefault}
                alt="recipe_image"
                className="recipie-list-image"
                onClick={() => {
                  props.history.push(`/RecipeDetails/${recipe.id}`);
                }}
              />
              <span className="text-uppercase">{recipe.name}</span>
            </Col>
          ))}
        <FloatingButton
          action={() => {
            props.history.push('/CreateRecipe');
          }}
          name="Dodaj nowy przepis!"
        />
      </Row>
    );
  }
};

RecipeList.propTypes = {};

export default withRouter(RecipeList);
