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
    <div className="forgot-password-scene">
      <div className="forgot-password-container">
        <form onSubmit={changePassword} className="form">

          <span className="form-title">
            Forgot Password
          </span>
          
          <div className="input-body">
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <input
                type="password" name="password" id="password" required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="retype-password" className="input-label">
                RETYPE PASSWORD
              </label>
              <input
                type="password" name="password" id="password" required
                value={retypePassword}
                onChange={(event) => {
                  setRetypePassword(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-footer">
              <button
                type="submit"
                className="button-primary-filled"
                disabled={password !== retypePassword || password.length < 8}
              >
              Change password
            </button>
          </div>
        </form>
        <div>{message}</div>
      </div>

      <div className="forgot-password-asset medium-only"/>
    </div>
  );
};

export default ForgotPasswordValidateScene;
