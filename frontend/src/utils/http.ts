import axios from 'axios';
import { getSession } from 'next-auth/react';

// eslint-disable-next-line no-console
console.log('baseUrl =>', process.env.NEXT_PUBLIC_BACKEND_API_URL);

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

http.interceptors.request.use(async (request) => {
    const session = await getSession();

    if (session) {
        request.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
    }
    return request;
});

export default http;

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
