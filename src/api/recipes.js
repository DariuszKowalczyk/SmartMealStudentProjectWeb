import axios from 'axios';
import { basicUrl } from '../helpers/consts';

export const createRecipe = async (name, description, image, ingredients, resetForm, setStatus) => {
  try {
    let imageResult;
    if (image) {
      const file = new FormData();
      file.append('file', image, image.name);
      imageResult = await axios.post(`${basicUrl}/Photo`, file);
    }
    const response = await axios.post(`${basicUrl}/Recipe`, {
      name,
      description,
      imagePath: imageResult ? imageResult.data.imagePath : null,
      ingredients,
    });
    resetForm();
    return response.data;
  } catch (err) {
    setStatus({ msg: 'Something went wrong.' });
    console.log(err.message, 'ERROR');
  }
};
export const getRecipes = async setError => {
  try {
    const response = await axios.get(`${basicUrl}/Recipe`);
    console.log(response.data, 'DATA');
    return response.data;
  } catch (err) {
    setError(err);
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
export const deleteRecipe = async (id, setError) => {
  try {
    const response = await axios.delete(`${basicUrl}/Recipe/${id}`);
    return response;
  } catch (err) {
    console.log(err, 'ERR');
    setError('Wystąpił problem z serwerem, spróbuj ponownie później.');
  }
};
