import axios from "axios";
import { store } from "../store";
import { isTokenExpired } from "../utils/jwt";
import { removeToken, setToken } from "../store/auth.slice";
import { refreshToken } from "./refreshToken";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

http.interceptors.request.use(async (config) => {
  const state = store.getState();
  const token = state.auth.token;
  const refresh = state.auth.refreshToken;

  if (token && isTokenExpired(token)) {
    if (!isRefreshing && refresh) {
      isRefreshing = true;

      try {
        const res = await refreshToken(refresh);
        store.dispatch(setToken(res.accessToken));
        config.headers.Authorization = `Bearer ${res.accessToken}`;
      } catch (e) {
        store.dispatch(removeToken());
        window.location.href = "/login";
        throw e;
      } finally {
        isRefreshing = false;
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return config;
    }
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default http;
