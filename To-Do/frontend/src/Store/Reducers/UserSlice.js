import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "userinfo",
  initialState: {
    userId: "",
    name: "",
    username: "",
    email: "",
    dateOfAccountCreation: "",
  },
  reducers: {
    setUserInfo(state, action) {
      const { _id, name, username, email, date } = action.payload;
      (state.userId = _id),
        (state.name = name),
        (state.username = username),
        (state.email = email),
        (state.dateOfAccountCreation = date);
    },
  },
});

export default UserSlice.reducer;
export const { setUserInfo } = UserSlice.actions;
