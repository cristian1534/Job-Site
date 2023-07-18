import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    SET_LOGIN: (state, action) => {
      (state.email = action.payload.email),
        (state.password = action.payload.password);
    },
  },
});
export const { SET_LOGIN } = loginSlice.actions;

export default loginSlice.reducer;
