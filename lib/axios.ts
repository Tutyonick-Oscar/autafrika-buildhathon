import axios from "axios";


export const apiClient = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
  },
});