import axios from 'axios';

const headers = {};
if (localStorage.token) {
  headers.Authorization = `${localStorage.token}`;
}
export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers,
});
