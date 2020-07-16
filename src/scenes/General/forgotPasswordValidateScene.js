import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordValidateScene = (props) => {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [message, setMessage] = useState("");

  const changePassword = async (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    // console.log(new URLSearchParams(window.location.search));
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/bistleague3/auth/forgot-password/validate`,
        { email, password, token }
      )
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <form onSubmit={changePassword}>
        <div>
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            value={retypePassword}
            onChange={(event) => {
              setRetypePassword(event.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          disabled={password !== retypePassword || password.length < 8}
        >
          Change password
        </button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default ForgotPasswordValidateScene;
