import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1'

export const instance = axios.create({
  baseURL: BASE_URL,
});