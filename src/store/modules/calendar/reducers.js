import moment from 'moment';
import * as actionTypes from './actionTypes';

const initialState = {
  selectedDate: moment(),
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_DATE: {
      return { ...state, selectedDate: action.payload };
    }
    default:
      return state;
  }
};
export default calendarReducer;
