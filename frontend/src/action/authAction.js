import { AUTHENTICATE, LOGOUT } from "../constants/authConstant";

export const authenticate = () => ({ type: AUTHENTICATE });
export const logout = () => ({ type: LOGOUT });
