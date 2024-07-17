import { createSlice } from "@reduxjs/toolkit";

const Loader = createSlice({
  name: "loader",
  initialState: {
    loader: false,
    preloader: false,
  },
  reducers: {
    setLoader(state, action) {
      state.loader = action.payload;
    },
    setPreLoader(state, action) {
      state.preloader = action.payload;
    },
  },
});

export default Loader.reducer;

export const { setLoader, setPreLoader } = Loader.actions;
