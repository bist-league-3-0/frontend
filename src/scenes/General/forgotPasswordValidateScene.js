import React, { useState } from "react";
import axios from "axios";
import Component from "../../components/components-common";
import BackendRoutes from "../../routes/backendRoutes";

const ForgotPasswordValidateScene = (props) => {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [verdict, setVerdict] = useState({ status: "", message: "" });

  const changePassword = async (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    setVerdict({
      status: "info",
      message: "Please wait, we are sending your request to the server.",
    });
    // console.log(new URLSearchParams(window.location.search));
    await axios
      .post(BackendRoutes.forgotPasswordValidate, { email, password, token })
      .then((response) => {
        setVerdict({
          status: "success",
          message: response.data.message,
        });
        return;
      })
      .catch((err) => {
        setVerdict({
          status: "error",
          message: err.response.data.message,
        });
        return;
      });
  };

  return (
    <div className="forgot-password-scene">
      <Component.BISTHelmet title="Forgot Password Validation" />
      <div className="forgot-password-container">
        <form onSubmit={changePassword} className="form">
          <span className="form-title">Forgot Password</span>

          <div className="input-body">
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
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
                type="password"
                name="password"
                id="password"
                required
                value={retypePassword}
                onChange={(event) => {
                  setRetypePassword(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="flash-message" status={verdict.status}>
            {verdict.message}
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
      </div>

      <div className="forgot-password-asset medium-only" />
    </div>
  );
};

export default ForgotPasswordValidateScene;
