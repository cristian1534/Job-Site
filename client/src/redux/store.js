// store.js (o donde estés creando tu store)
import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "@/redux/reducers/auth";
import contactReducer from "./reducers/contact";

export default configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
  },
});
