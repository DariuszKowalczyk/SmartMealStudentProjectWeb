import axios from 'axios';
import moment from 'moment';
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
    console.log(mealTime, mealDay, 'MEAL');
    const response = await axios.post(`${basicUrl}/Timetable`, { mealDay: moment(mealDay).format('YYYY/MM/DD'), mealTime, recipeId });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getPdf = async day => {
  try {
    const response = await axios.get(`${basicUrl}/Timetable/pdf?day=${day}`, { method: 'GET', responseType: 'blob' });
    console.log(new Blob([response.data]), response.data, 'DATA');
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `harmonogram-${moment(day).format('YYYY/MM/DD')}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.log(err);
  }
};
export const getCalendarElementById = async (id, setError) => {
  try {
    const response = await axios.get(`${basicUrl}/Timetable/${id}`);
    console.log(response);
    return response.data;
  } catch (err) {
    setError('Wystąpił problem z serwerem. Proszę spróbować później.');
  }
};
export const deleteMealById = async (id, setError) => {
  try {
    const response = await axios.delete(`${basicUrl}/Timetable?id=${id}`);
    return response.data;
  } catch (err) {
    setError(err);
  }
};
