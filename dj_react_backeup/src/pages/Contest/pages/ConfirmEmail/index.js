import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { activateUserByToken } from "../../../../redux/modules/Auth/authApi";

function ConfirmEmail() {
  const { token } = useParams();
  const [error, setError] = useState();

  console.log(token);

  useEffect(() => {
    activateUser();
  });

  const activateUser = async () => {
    try {
      if (token) {
        await activateUserByToken(token);
      } else {
        throw new Error("Invalid link.");
      }
    } catch (error) {
      setError("Invalid Link");
    }
  };

  return (
    <div className="container mt-5 text-center">
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          Your account is successfully acivated. Please
          <Link to={"/contest/auth/login"}> login </Link> to continue.
        </div>
      )}
    </div>
  );
}

export default ConfirmEmail;
