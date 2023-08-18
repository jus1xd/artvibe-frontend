import { io } from "socket.io-client";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

export const socket = io(baseUrl);
