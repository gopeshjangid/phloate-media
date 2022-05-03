// import { AxiosInstance } from "axios";

import { authSlice } from "../redux/modules/Auth/authSlice";

const { actions } = authSlice;

export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { accessToken },
      } = store.getState();
      if (accessToken) {
        config.headers.accessToken = `${accessToken}`;
      }
      console.log(config);
      return config;
    },
    (err) => Promise.reject(err)
  );
  axios.interceptors.response.use(undefined, (err) => {
    console.log(err.response);
    if (err.response.status === 401) {
      store.dispatch(actions.logout());
    }
    return Promise.reject(err);
  });
  axios.defaults.baseURL = "http://localhost:8000"; // the prefix of the URL
}
