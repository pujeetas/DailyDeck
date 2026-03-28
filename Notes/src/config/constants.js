export const MESSAGES = {
  LOGIN_SUCCESS: "Welcome back.",
  LOGIN_ERROR: "Invalid credentials.",
  SERVER_ERROR: "Server unreachable.",
  GENERIC_ERROR: "Login failed.",

  SIGNUP_SUCCESS: "Signup successful.",
  SIGNUP_ERROR: "Signup failed. Try again.",

  EMAIL_REQUIRED: "Please enter your email address to continue.",
  RESET_PASSWORD_SUCCESS: "Reset link sent if email exists.",
  RESET_PASSWORD_ERROR: "Password Reset failed. Try again.",

  INVALID_RESET_LINK: "Invalid or expired reset link.",
  PASSWORDS_MISMATCH: "Passwords do not match!",
  RESET_PASSWORD_UPDATE_SUCCESS: "Password updated successfully!",
  RESET_LINK_EXPIRED: "Link expired or invalid.",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters.",
};

export const ROUTES = {
  MAIN: "/main",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

export const VALIDATION = {
  FIRST_NAME_REQUIRED: "First name required",
  LAST_NAME_REQUIRED: "Last name required",
  EMAIL_INVALID: "Valid email required",
  PASSWORD_TOO_SHORT: "Min 6 characters",
};

export const REGEX = {
  EMAIL: /^\S+@\S+\.\S+$/,
};
