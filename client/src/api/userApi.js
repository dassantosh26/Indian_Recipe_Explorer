/** @format */

import axios from "axios";

const api_url = import.meta.env.VITE_USER_API_URL;

const userApi = axios.create({
  baseURL: api_url,
});

//Response interceptor
userApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => userApi.post("/register", userData);

export const loginUser = (credentials) => userApi.post("/login", credentials);

export const logoutUser = () => userApi.post("/logout");

export default userApi;
