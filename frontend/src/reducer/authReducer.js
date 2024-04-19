import { AUTHENTICATE, LOGOUT } from "../constants/authConstant";

export const authReducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
