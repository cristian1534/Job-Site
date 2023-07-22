import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./reducers/contact";
import profileReducer from "./reducers/profile";
import thunkMiddleware from "redux-thunk"; // Correct the import

export default configureStore({
  reducer: {
    contact: contactReducer,
    profile: profileReducer,
  },
  middleware: [thunkMiddleware],
});
