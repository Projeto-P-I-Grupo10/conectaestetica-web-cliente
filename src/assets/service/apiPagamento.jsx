import axios from "axios";

const apiPag = axios.create({
  baseURL: "http://localhost:8081/api",
});

apiPag.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiPag;