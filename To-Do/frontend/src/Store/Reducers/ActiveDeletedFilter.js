import { createSlice } from "@reduxjs/toolkit";

const ActiveDeletedFilterSlice = createSlice({
  name: "ActiveDeletedFilter",
  initialState: "",
  reducers: {
    setActiveDeletedFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setActiveDeletedFilter } = ActiveDeletedFilterSlice.actions;
export default ActiveDeletedFilterSlice.reducer;
