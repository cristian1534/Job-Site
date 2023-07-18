import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./reducers/register";
import loginReducer from "./reducers/login";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
});
