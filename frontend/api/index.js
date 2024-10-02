import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://ec2-13-60-81-212.eu-north-1.compute.amazonaws.com",
});

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token && token.length > 0) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  }
  return config;
});

export default instance;
