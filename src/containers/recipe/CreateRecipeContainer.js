import React from 'react';
import { Container } from 'react-bootstrap';
import CreateRecipeForm from '../../components/recipe/CreateRecipeForm';

const CreateRecipeContainer = () => (
  <Container>
    <div className="text-center font-huge my-2">Dodaj nowy przepis</div>
    <CreateRecipeForm />
  </Container>
);

export default CreateRecipeContainer;
