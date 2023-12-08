import axios, { AxiosInstance } from "axios";

// non-member token 호출시 사용할 Instance
export const tokenInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SPOTIFY_ACCOUNT_URL,
});

// 기본적인 api 호출시 사용할 Instance
export const baseInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SPOTIFY_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
