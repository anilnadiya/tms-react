import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your actual environment variable
  headers: {
    "Content-Type": "application/json",
  },
});
console.log('process.env.REACT_API_URL: ', process.env.REACT_APP_API_URL);

// const dispatchLogout = () => {
//   store.dispatch(logout());
//   localStorage.clear();
//   window.location.href = "/login";
// };

// Add a request interceptor
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // dispatchLogout();
    }
    return Promise.reject(error);
  }
);

export default authApi;
