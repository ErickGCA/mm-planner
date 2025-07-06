import axios from "axios";

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}); 