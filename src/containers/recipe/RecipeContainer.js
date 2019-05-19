import React from 'react';
import { Container } from 'react-bootstrap';
import RecipeList from '../../components/recipe/RecipeList';

const RecipeContainer = props => (
  <Container>
    <div className="text-center font-huge my-2">Przepisy</div>
    <RecipeList />
  </Container>
);

RecipeContainer.propTypes = {};

export default RecipeContainer;
