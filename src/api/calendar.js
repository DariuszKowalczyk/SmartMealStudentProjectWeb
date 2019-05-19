import axios from 'axios';
import { basicUrl } from '../helpers/consts';

export const getCalendarDay = async day => {
  try {
    const response = await axios.get(`${basicUrl}/Timetable/by?day=${day}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const createNewElement = async (mealDay, mealTime, recipeId) => {
  try {
    const response = await axios.post(`${basicUrl}/Timetable/`, { mealDay, mealTime, recipeId });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
