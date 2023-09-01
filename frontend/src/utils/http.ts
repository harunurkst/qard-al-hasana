import axios from 'axios';
import { getSession } from 'next-auth/react';
import { env } from '../env.mjs';

const http = axios.create({
    baseURL: env.NEXT_PUBLIC_BACKEND_API_URL,

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
