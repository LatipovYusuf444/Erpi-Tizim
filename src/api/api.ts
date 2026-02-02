import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use((config) => {
   config.headers.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5ODY4OTY1LCJpYXQiOjE3Njk4NjUzNjUsImp0aSI6IjAzMzQyOTJlMTU1YTQzMWY5MGQ0ZTY0ZDYxZTBmZjI4IiwidXNlcl9pZCI6IjEifQ.Zyj4rTf6IiAb00TlAIWwUGOwFIGx-FkGdYFjLEMrZbg";
  
  return config;
});
