import axios from 'axios';

const headers = {};
if (localStorage.token) {
  headers.token = `${localStorage.token}`;
}
export default axios.create({
  baseURL: 'https://telehealth-frontend-telehealth-islx.vercel.app',
  headers,
});