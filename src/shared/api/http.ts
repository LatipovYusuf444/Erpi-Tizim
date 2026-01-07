import axios from "axios";

/**
 * TODO: backendga ulangan paytda:
 * VITE_API_URL ni .env ga yozasiz
 * axios instance shu yerdan ishlaydi
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  withCredentials: true,
});
