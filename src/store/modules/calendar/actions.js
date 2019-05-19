import * as actionTypes from './actionTypes';

export const setActiveDate = date => ({
  type: actionTypes.SET_ACTIVE_DATE,
  payload: date,
});
