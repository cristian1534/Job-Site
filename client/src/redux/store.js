import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./reducers/contact";
import profileReducer from "./reducers/profile";
import profileByIdReducer from "./reducers/profileById";
import thunkMiddleware from "redux-thunk"; 

export default configureStore({
  reducer: {
    contact: contactReducer,
    profile: profileReducer,
    profileById: profileByIdReducer, 
  },
  middleware: [thunkMiddleware],
});
