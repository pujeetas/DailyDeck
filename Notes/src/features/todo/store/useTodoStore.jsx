import axios from "axios";
import { create } from "zustand";

const useTodoStore = create((set) => ({
  detailsList: [],
  loading: false,

  fetchAllTodo: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("http://localhost:3000/getAllTodo");
      set({ detailsList: res.data, loading: false });
    } catch (err) {
      set({ loading: false });
      console.error(err);
    }
  },

  createTodo: async (data) => {
    try {
      await axios.post("http://localhost:3000/createTodo", data);
      await useTodoStore.getState().fetchAllTodo();
    } catch (err) {
      console.error(err);
    }
  },

  updateTodo: async (id, data) => {
    try {
      await axios.patch(`http://localhost:3000/updateTodo/${id}`, data);
      await useTodoStore.getState().fetchAllTodo();
    } catch (error) {
      console.log(error);
    }
  },

  deleteTodo: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteTodo/${id}`);
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
      await axios.patch(`http://localhost:3000/updateTodo/${id}`, {
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
      await axios.patch(`http://localhost:3000/updateTodo/${id}`, {
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
      await axios.patch(`http://localhost:3000/bulkUnfocus`, {
        ids,
        focused: false,
      });
      await useTodoStore.getState().fetchAllTodo();
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useTodoStore;
