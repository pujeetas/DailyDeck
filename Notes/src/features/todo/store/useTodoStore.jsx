import axios from "axios";
import { create } from "zustand";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const useTodoStore = create((set) => ({
  detailsList: [],
  loading: false,

  fetchAllTodo: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/getAllTodo");
      set({ detailsList: res.data, loading: false });
    } catch (err) {
      set({ loading: false });
      console.error(err);
    }
  },

  createTodo: async (data) => {
    try {
      await api.post("/createTodo", data);
      await useTodoStore.getState().fetchAllTodo();
    } catch (err) {
      console.error(err);
    }
  },

  updateTodo: async (id, data) => {
    try {
      await api.patch(`/updateTodo/${id}`, data);
      await useTodoStore.getState().fetchAllTodo();
    } catch (error) {
      console.log(error);
    }
  },

  deleteTodo: async (id) => {
    try {
      await api.delete(`/deleteTodo/${id}`);
      await useTodoStore.getState().fetchAllTodo();
    } catch (error) {
      console.error(error);
    }
  },

  toggleFocus: async (id, focused) => {
    try {
      set((state) => ({
        detailsList: state.detailsList.map((t) =>
          t._id === id ? { ...t, focused: !t.focused } : t
        ),
      }));
      await api.patch(`/updateTodo/${id}`, {
        // Changed
        focused: !focused,
      });
      await useTodoStore.getState().fetchAllTodo();
    } catch (error) {
      console.error(error);
    }
  },

  markDone: async (id, status, focused) => {
    try {
      set((state) => ({
        detailsList: state.detailsList.map((t) =>
          t._id === id ? { ...t, status: "done", focused: false } : t
        ),
      }));
      await api.patch(`/updateTodo/${id}`, {
        // Changed
        status: "done",
        focused: !focused,
      });
      await useTodoStore.getState().fetchAllTodo();
    } catch (error) {
      console.log(error);
    }
  },

  subTaskStatus: async (todoId, subTaskId) => {
    try {
      set((state) => ({
        detailsList: state.detailsList.map((todo) =>
          todo._id === todoId
            ? {
                ...todo,
                subTask: todo.subTask.map((st) =>
                  st.id === subTaskId ? { ...st, complete: !st.complete } : st
                ),
              }
            : todo
        ),
      })),
        await useTodoStore.getState().fetchAllTodo();
    } catch (error) {
      console.log(error);
    }
  },

  bulkUnfocus: async (ids) => {
    try {
      set((state) => ({
        detailsList: state.detailsList.map((t) =>
          ids.includes(t._id) ? { ...t, focused: false } : t
        ),
      }));
      await api.patch(`/bulkUnfocus`, {
        // Changed
        ids,
        focused: false,
      });
      await useTodoStore.getState().fetchAllTodo();
    } catch (error) {
      console.log(error);
    }
  },

  getGitDetails: async (url) => {
    set({ loading: true });

    try {
      const response = await api.post("/getGitDetails", {
        // Changed
        url,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      const errorText =
        error.response?.data?.message || error.message || "Unknown error";
      return { success: false, message: errorText };
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTodoStore;
