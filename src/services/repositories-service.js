import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

export const findAllRepositoriesByUser = uid =>
  axios
    .get(`${USERS_API}/${uid}/repositories`)
    .then(response => response.data)
    .catch(error => error);
