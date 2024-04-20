import {
  AUTHENTICATE,
  LOGOUT,
  SET_ROLE_PROVIDER,
  SET_ROLE_CLIENT,
} from "../constants/authConstant";

export const authReducer = (
  state = { isAuthenticated: false, role: null },
  action
) => {
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
        role: null,
      };

    case SET_ROLE_PROVIDER:
      return {
        ...state,
        role: "Provider",
      };
    case SET_ROLE_CLIENT:
      return {
        ...state,
        role: "Client",
      };

    default:
      return state;
  }
};
