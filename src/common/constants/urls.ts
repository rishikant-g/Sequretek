import { SYSTEM_CONSTANTS } from "../constants/constants";
const BASE_URL = `${SYSTEM_CONSTANTS.BASE_URL}/api`;
export const URLS = {
  REGISTER: BASE_URL + "/register",
  LOGIN: BASE_URL + "/login",
  LOGOUT: BASE_URL + "/logout",
  USERS: BASE_URL + "/users",
  SINGLE_USER: BASE_URL + "/users",
  CREATE_USER: BASE_URL + "/users",
  UPDATE_USER_PUT: BASE_URL + "/users",
  GET_RESOURCES: BASE_URL + "/resources",
  DELETE_USER: BASE_URL + "/users",

  // SANCTUM_TOKEN: "/sanctum/csrf-cookie",
};
