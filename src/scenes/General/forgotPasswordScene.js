import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import FrontendRoutes from "../../routes/frontendRoutes";

const ForgotPasswordScene = () => {
  const [email, setEmail] = useState("");
  const [verdict, setVerdict] = useState({ status: "", message: "" });

  const sendMail = async (event) => {
    event.preventDefault();
    console.log(
      `${process.env.REACT_APP_API_URL}/api/bistleague3/auth/forgot-password/`
    );

    setVerdict({
      status: "info",
      message: "Please wait, we are sending your request to the server.",
    });

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/bistleague3/auth/forgot-password/`,
        { email },
        { withCredentials: true }
      )
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
      <div className="forgot-password-container">
        <form onSubmit={sendMail} className="form">
          <span className="form-title">
            Forgot Password
          </span>

          <div className="input-body">
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <span className="input-text">
                Insert your team account email here, then we will send you a mail for further instructions
              </span>
              <input
                type="email" name="email" id="email" required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="flash-message" status={verdict.status}>
            {verdict.message}
          </div>

          <div className="input-footer">
            <input 
              type="submit"
              value="Send Mail"
              className="button-primary-filled"
            />
            <div className="input-text">
              Perhaps you have remembered your password?&ensp;
              <NavLink to={FrontendRoutes.login}>
                Login
              </NavLink>
            </div>
          </div>

        </form>
      </div>
      <div className="forgot-password-asset medium-only"/>
    </div>
  );
};

export default ForgotPasswordScene;


