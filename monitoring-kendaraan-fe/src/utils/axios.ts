// axios.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { getTokenCookie } from './handleCookie';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true, // Ensure cookies are sent with requests
});

const fetchCsrfToken = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/sanctum/csrf-cookie`, { withCredentials: true });
        
        if (response.status === 204) {
            console.log(response);
            console.log('CSRF token fetched successfully');
        }
    } catch (error) {
        console.error('Failed to fetch CSRF token', error);
    }
};

api.interceptors.request.use(
    async (config) => {
        const token = getTokenCookie();
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Fetch CSRF token if not already set
        let csrfToken = Cookies.get('XSRF-TOKEN');
        if (!csrfToken) {
            await fetchCsrfToken();
            csrfToken = Cookies.get('XSRF-TOKEN');
        }

        // Set CSRF token in headers
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = csrfToken;
        } else {
            console.error('CSRF token not found');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
