// import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import { authReducer } from "./modules/Auth/authSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
});
