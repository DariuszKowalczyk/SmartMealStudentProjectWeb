import * as actionTypes from './actionTypes';

export const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user,
});
export const logoutCurrentUser = () => ({
  type: actionTypes.LOGOUT_CURRENT_USER,
})