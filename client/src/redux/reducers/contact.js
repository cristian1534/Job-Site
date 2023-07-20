import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    name: "",
    email: "",
    message: "",
  },
  reducers: {
    SET_MESSAGE: (state, action) => {
      const { name, email, message } = action.payload;
      state.name = name;
      state.email = email;
      state.message = message;
    },
  },
});

export const { SET_MESSAGE } = contactSlice.actions;

export default contactSlice.reducer;
