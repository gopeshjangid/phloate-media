import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

import Header from "./components/Header";
import SubmitSongs from "./pages/SubmitSongs";
import { SubmittedSongs } from "./pages/submittedSongs";
import Faq from "./pages/Faq";
import Overview from "./pages/Overview";
import TermsAndConditions from "./pages/TermsAndConditions";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import ActivateAccount from "./pages/ConfirmEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function Contest() {
  document.title = "CONTEST | PHLOTE.CO";
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/contest" />
        {!isAuthorized ? (
          <Route path="/contest/auth">
            <AuthRoutes />
          </Route>
        ) : (
          <Redirect from="/contest/auth" to="/contest/submitSongs" />
        )}
        {isAuthorized ? (
          <Route path="/contest/submitSongs">
            <AuthorizedRoutes />
          </Route>
        ) : (
          <Redirect to="/contest/auth/login" />
        )}
        <Route path="/contest/overview" component={Overview} />
        <Route path="/contest/faq" component={Faq} />
        <Route path="/contest/logout" component={Logout} />
        <Route
          path="/contest/termsAndConditions"
          component={TermsAndConditions}
        />
      </Switch>
    </>
  );
}

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path="/contest/auth/login" component={Login} />
      <Route path="/contest/auth/signup" component={Signup} />
      <Route path="/contest/auth/forgotPassword" component={ForgotPassword} />
      <Route
        path="/contest/auth/resetPassword/:token"
        component={ResetPassword}
      />
      <Route
        path="/contest/auth/confirmEmail/:token"
        component={ActivateAccount}
      />
    </Switch>
  );
};

const AuthorizedRoutes = () => {
  return (
    <Switch>
      <Route exact path="/contest/submitSongs" component={SubmittedSongs} />
      <Route exact path="/contest/submitSongs/new" component={SubmitSongs} />
    </Switch>
  );
};

export default Contest;
