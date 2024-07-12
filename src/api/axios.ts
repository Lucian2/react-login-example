import axios from 'axios';

const baseURL = 'https://dummyjson.com/auth';

export default axios.create({
  baseURL: baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
