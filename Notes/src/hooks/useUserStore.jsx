import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      //function to verify token
      checkAuth: async () => {
        try {
          const response = await axios.get("/api/verify", {
            withCredentials: true,
          });
          if (response.data.user) {
            set({
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },

      login: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),

      signUp: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useUserStore;
