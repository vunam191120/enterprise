import axios from "axios";
import { isLogin } from "../helpers/isLogin";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(async (config) => {
  if (isLogin()) {
    config.headers.authorization = localStorage.getItem("authenticator");
  }

  return config;
});

export default axiosClient;
