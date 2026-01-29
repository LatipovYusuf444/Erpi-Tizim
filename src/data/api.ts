import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use((config) => {
   config.headers.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5NzgxNjg2LCJpYXQiOjE3Njk2MDg4ODYsImp0aSI6ImY4MDc4MzQ2N2E3NTQ0ZjI4NDg5ZDcyZmE0OWI5OWQ3IiwidXNlcl9pZCI6IjEifQ.g0NZwRkVZ1pOfm7c2ohnIE3YgitoqSeA0HGNZdRpqdU";
  
  return config;
});
