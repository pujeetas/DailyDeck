import axios from "axios";
import { API_BASE_URL } from "@/config/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendAssistantMessage = (message, history) => {
  if (!message || !message.trim()) {
    return Promise.reject(new Error("Message cannot be empty"));
  }
  return api.post("/assistant/chat", { message: message.trim(), history });
};
