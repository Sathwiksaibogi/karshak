// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'http://localhost:3000/api', // Your backend API URL
// });

// // Interceptor to add the auth token to every request
// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('token'); // Or get it from cookies
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default apiClient;


import axios from 'axios';

// This line reads the environment variable you will set.
// In local development, it will be 'http://localhost:3000/api'.
// In production on Vercel, it will be 'https://your-backend.vercel.app/api'.
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const VITE_API_BASE_URL ='http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: VITE_API_BASE_URL, // Use the dynamic variable here
});

// Interceptor to add the auth token to every request - This is correct, do not change it.
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;