import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default api;

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
