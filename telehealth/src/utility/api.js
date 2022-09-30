import axios from 'axios';

const headers = {};
if (localStorage.token) {
  headers.token = `${localStorage.token}`;
}
export default axios.create({
  baseURL: 'http://localhost:9000',
  headers,
});