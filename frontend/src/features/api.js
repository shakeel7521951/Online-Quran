import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // for Vite
  withCredentials: true,
});

// Add token automatically if stored
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("accessToken"); // <- use accessToken
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => Promise.reject(err)
);

export default API;
