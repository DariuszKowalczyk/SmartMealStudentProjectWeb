import * as actionTypes from './actionTypes';

const initialState = {
  activeScreen: 'login',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_BETWEEN_LOGIN_REGISTER: {
      return { ...state, activeScreen: action.payload };
    }
    default:
      return state;
  }
};
export default loginReducer;
