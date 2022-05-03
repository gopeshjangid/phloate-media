import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { authSlice } from "../../../../redux/modules/Auth/authSlice";

const { actions } = authSlice;

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.logout());
  });
  return <div>Logging Out...</div>;
}
