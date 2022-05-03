import { authSlice } from "./authSlice";
import { loginUser, signupUser } from "./authApi";

const { actions } = authSlice;

export const login = (username, password) => async (dispatch) => {
  dispatch(actions.setIsLoading({ isLoading: true }));
  dispatch(actions.setLoginError({ error: "" }));
  try {
    const loginResponse = await loginUser(username, password);
    console.log(loginResponse.data);
    const { accessToken, ...userDetails } = loginResponse.data;
    dispatch(actions.login({ accessToken: accessToken }));
    dispatch(
      actions.setUserDetails({
        user: userDetails,
      })
    );
  } catch (error) {
    console.log(error.response);
    dispatch(actions.setLoginError({ error: error.response.data.error }));
  }
  dispatch(actions.setIsLoading({ isLoading: false }));
};

export const signup = (user) => async (dispatch) => {
  dispatch(
    actions.setRegistrationError({
      error: "",
    })
  );
  dispatch(actions.setIsLoading({ isLoading: true }));
  try {
    await signupUser(user);
    dispatch(actions.userRegistered({ isRegistered: true }));
    dispatch(
      actions.setRegistrationError({
        error: "",
      })
    );
  } catch (error) {
    console.log(error.response);
    if (error.response.data) {
      dispatch(
        actions.setRegistrationError({
          error: error.response.data.error,
        })
      );
    } else
      dispatch({
        error: actions.setRegistrationError(
          "Something went wrong. Please try again"
        ),
      });
  }
  dispatch(actions.setIsLoading({ isLoading: false }));
};

export const setOffIsRegistered = () => async (dispatch) => {
  dispatch(actions.userRegistered({ isRegistered: false }));
};

export const resetErrors = () => async (dispatch) => {
  dispatch(actions.setLoginError({ error: "" }));
  dispatch(actions.setRegistrationError({ error: "" }));
};
