import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    name: "",
    email: "",
    password: "",
  },
  reducers: {
    SET_REGISTER: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});
export const { SET_REGISTER } = registerSlice.actions;

export default registerSlice.reducer;
