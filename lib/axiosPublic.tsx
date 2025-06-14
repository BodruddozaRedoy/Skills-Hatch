import axios from "axios";

let baseURL = "";

if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  baseURL = "http://localhost:3000";
} else {
  baseURL = "https://skills-hatch.vercel.app"; // Replace with actual domain
}

export const axiosPublic = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
