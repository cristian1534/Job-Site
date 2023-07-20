import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    name: "",
    email: "",
    password: "",
  },
  reducers: {
    SET_REGISTER: (state, action) => {
      const { name, email, password } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
    },
  },
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    SET_LOGIN: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
  },
});

const authReducer = combineReducers({
  register: registerSlice.reducer,
  login: loginSlice.reducer,
});

export const { SET_REGISTER } = registerSlice.actions;
export const { SET_LOGIN } = loginSlice.actions;

export default authReducer;
