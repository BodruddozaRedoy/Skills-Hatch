import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:3000",
});
