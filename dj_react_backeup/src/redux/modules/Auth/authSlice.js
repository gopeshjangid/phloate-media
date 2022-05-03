import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialAuthState = {
  accessToken: "",
  refreshToken: "",
  user: undefined,
  isLoading: false,
  isRegistrationSuccess: false,
  registrationerror: "",
  loginError: "",
};

export const callTypes = {
  login: "login",
  signup: "signup",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      // state.refreshToken = refreshToken;
    },

    setUserDetails: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },

    setIsLoading: (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    },

    userRegistered: (state, action) => {
      const { isRegistered } = action.payload;
      state.isRegistrationSuccess = isRegistered;
    },

    setRegistrationError: (state, action) => {
      const { error } = action.payload;
      state.registrationerror = error;
    },

    setLoginError: (state, action) => {
      const { error } = action.payload;
      state.loginError = error;
    },

    logout: (state, action) => {
      state.user = undefined;
      state.accessToken = "";
    },
  },
});

export const authReducer = persistReducer(
  {
    storage,
    key: "phlote-auth",
    whitelist: ["accessToken", "refreshToken", "user"],
  },
  authSlice.reducer
);
