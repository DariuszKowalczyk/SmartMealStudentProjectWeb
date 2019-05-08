import * as actionTypes from './actionTypes';

export const switchBetweenLoginRegister = view => ({
  type: actionTypes.SWITCH_BETWEEN_LOGIN_REGISTER,
  payload: view,
});
