import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    email: "",
    telephone: "",
    address: "",
  },
  reducers: {
    SET_PROFILE: (state, action) => {
      const { name, email, telephone, address } = action.payload;
      state.name = name;
      state.email = email;
      state.telephone = telephone;
      state.address = address;
    },
  },
});

export const { SET_PROFILE } = profileSlice.actions;

export default profileSlice.reducer;
