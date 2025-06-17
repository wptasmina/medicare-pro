import axios from "axios";

const baseURL = "https://medicare-pro-backend.vercel.app";

const apiClient = axios.create({
  baseURL: baseURL + "/api/v1",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // Include cookies in requests
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace 'token' with your token key

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful response here
    if (response.data.token) {
      // Set token in a cookie (client-side)
      document.cookie = `token=${response.data.token}; path=/;`;
    }

    if (response.data.user) {
      document.cookie = `user=${JSON.stringify(response.data.user)}; path=/;`;
    }

    return response;
  },
  (error) => {
    // Handle response error here

    if (error.response?.status === 401) {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }

    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something else caused the error
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;