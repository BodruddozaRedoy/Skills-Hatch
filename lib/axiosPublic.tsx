import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: window.location.hostname === "localhost" ? "http://localhost:3000" : "https://skills-hatch.vercel.app",
    headers: {
        "Content-Type": "application/json",
    },
});
