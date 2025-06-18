import axios from "axios";

const baseURL = "https://medicare-pro-backend.vercel.app";

const apiClient = axios.create({
  baseURL: `${baseURL}/api/v1`,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Attach token from localStorage if available
apiClient.interceptors.request.use(
  (config) => {
    // Only run on client-side (avoid SSR issues)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle tokens and errors
apiClient.interceptors.response.use(
  (response) => {
    // Store token and user data if received
    if (typeof window !== "undefined") {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Primary token storage
        document.cookie = `token=${response.data.token}; path=/;`; // Fallback
      }
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        document.cookie = `user=${JSON.stringify(response.data.user)}; path=/;`;
      }
    }
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (typeof window !== "undefined") {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
    }

    // Enhanced error logging
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;