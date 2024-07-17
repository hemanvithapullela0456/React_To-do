import { createSlice } from "@reduxjs/toolkit";

const TodoFilterSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
  },
  reducers: {
    setTodo(state, action) {
      state.todo = action.payload;
    },
  },
});

export default TodoFilterSlice.reducer;
export const { setTodo } = TodoFilterSlice.actions;
