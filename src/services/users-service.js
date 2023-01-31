import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

export const findAllUsers = () =>
  axios.get(USERS_API).then(response => response.data);

export const findUserById = uid =>
  axios.get(`${USERS_API}/${uid}`).then(response => response.data);

export const searchUserByUsername = username =>
  axios
    .get(`${USERS_API}/search/${username}`)
    .then(response => [response.data])
    .catch(error => []);

export const deleteUser = uid =>
  axios.delete(`${USERS_API}/${uid}`).then(response => response.data);
