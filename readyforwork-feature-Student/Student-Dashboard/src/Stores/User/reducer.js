/*
 *
 * user reducer
 *
 */
import { types } from "./constants";

const initialState = {
  user: null,
  usersCount: null
};

/* eslint-disable default-case, no-param-reassign */
export default function userProviderReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        user: null
      };
    case types.SET_COUNT:
      return {
        ...state,
        usersCount: action.payload
      };
    // eslint-disable-next-line
    default:
      return state;
  }
}
