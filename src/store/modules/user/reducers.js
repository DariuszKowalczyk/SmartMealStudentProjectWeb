import * as actionTypes from './actionTypes';

const initialState = {
  currentUser: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER: {
      return { ...state, currentUser: action.payload };
    }
    case actionTypes.LOGOUT_CURRENT_USER: {
      return { ...state, currentUser: '' };
    }
    default:
      return state;
  }
};
export default userReducer;
