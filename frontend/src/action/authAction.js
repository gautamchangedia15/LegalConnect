import {
  AUTHENTICATE,
  LOGOUT,
  SET_ROLE_PROVIDER,
  SET_ROLE_CLIENT,
} from "../constants/authConstant";

export const authenticate = () => ({ type: AUTHENTICATE });
export const logout = () => ({ type: LOGOUT });

export const setRoleProvider = () => ({ type: SET_ROLE_PROVIDER });
export const setRoleClient = () => ({ type: SET_ROLE_CLIENT });
