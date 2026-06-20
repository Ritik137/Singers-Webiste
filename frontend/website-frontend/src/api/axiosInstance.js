import axios from "axios";

const axiosInstance = axios.create({
  // No baseURL because your services run on different ports,
  // use full URLs in api modules or set baseURL dynamically if you prefer.
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if present in localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;