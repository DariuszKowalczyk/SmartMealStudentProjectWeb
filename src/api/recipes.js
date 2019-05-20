import axios from 'axios';
import { basicUrl } from '../helpers/consts';

export const createRecipe = async (name, description, image, ingredients, resetForm) => {
  try {
    let imageResult;
    if (image) {
      const file = new FormData();
      file.append('file', image, image.name);
      imageResult = await axios.post(`${basicUrl}/Photo`, file);
    }
    const response = await axios.post(`${basicUrl}/Recipe`, { name, description, imagePath: imageResult ? imageResult.data.imagePath : null, ingredients });
    resetForm();
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getRecipes = async setError => {
  try {
    const response = await axios.get(`${basicUrl}/Recipe`);
    return response.data;
  } catch (err) {
    setError(err);
    console.log(err);
  }
};
export const getRecipesById = async (id, setError) => {
  try {
    const response = await axios.get(`${basicUrl}/Recipe/${id}`);

    return response.data;
  } catch (err) {
    setError(err);
  }
};
export const deleteRecipeById = async (id, setError) => {
  try {
    const response = await axios.delete(`${basicUrl}/Recipe/${id}`);
    return response.data;
  } catch (err) {
    setError(err);
  }
};
