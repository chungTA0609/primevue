// src/axiosInstance.js

import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: 'https://e11e-171-242-43-39.ngrok-free.app/api/', // Replace with your API base URL
    timeout: 10000 // Set a timeout for requests,
});

// Request interceptor to add authorization headers or other transformations
axiosInstance.interceptors.request.use(
    (config) => {
        let returnConfig = { ...config, 'Content-Type': 'application/json', accept: '*/*' };
        // Add any custom headers, like authorization tokens
        const token = localStorage.getItem('token'); // Example: Get token from localStorage
        if (token) {
            returnConfig.headers.Authorization = `Bearer ${token}`;
        }
        return returnConfig;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx causes this function to trigger
        return response;
    },
    (error) => {
        // Handle response errors globally, such as 401 unauthorized errors
        if (error.response && error.response.status === 401) {
            // Redirect to login page or handle unauthorized errors
            console.log('Unauthorized access - redirecting to login...');
            // Example: window.location = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
