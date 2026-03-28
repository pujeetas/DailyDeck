import { API_BASE_URL } from "./api";

export const ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/login`,
  LOGOUT: `${API_BASE_URL}/api/logout`,
  SIGNUP: `${API_BASE_URL}/api/signup`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/forgotPassword`,
  RESET_PASSWORD: (userId, token) =>
    `${API_BASE_URL}/api/reset-password/${userId}/${token}`,
  VERIFY: `${API_BASE_URL}/api/verify`,
  GET_USER_DETAILS: `${API_BASE_URL}/api/user/getUserDetails`,

  // OAuth
  GOOGLE_AUTH: `${API_BASE_URL}/api/auth/google`,
  GITHUB_AUTH: `${API_BASE_URL}/api/auth/github`,
};
