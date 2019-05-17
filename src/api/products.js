import axios from 'axios';
import { basicUrl } from './consts';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${basicUrl}/Product`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const createProduct = async (name, description, image) => {
  try {
    let imageResult;
    if (image) {
      const file = new FormData();
      file.append('file', image, image.name);
      imageResult = await axios.post(`${basicUrl}/Product/photo`, file);
    }
    const response = await axios.post(`${basicUrl}/Product`, { name, description, imagePath: imageResult ? imageResult.data : '' });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteProductById = async id => {
  try {
    await axios.delete(`${basicUrl}/Product/${id}`);
  } catch (e) {
    console.log(e, 'err');
  }
};

export const editProductById = async (name, description, image, category, id) => {
  try {
    let imageResult;
    if (image instanceof File) {
      const file = new FormData();
      file.append('file', image, image.name);
      imageResult = await axios.post(`${basicUrl}/Product/photo`, file);
    }
    await axios.patch(`${basicUrl}/Product/${id}`, { name, description, imagePath: imageResult ? imageResult.data : image });
  } catch (e) {
    console.log(e, 'err');
  }
};
