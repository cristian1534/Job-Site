import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./reducers/contact";
import profileReducer from "./reducers/profile";

export default configureStore({
  reducer: {
    contact: contactReducer,
    profile: profileReducer,
  },
});
