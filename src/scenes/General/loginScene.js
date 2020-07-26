import React, { useState } from "react";
import axios from "axios";
import BackendRoutes from "../../routes/backendRoutes";
import { NavLink, Redirect } from "react-router-dom";
import FrontendRoutes from "../../routes/frontendRoutes";
import Component from "../../components/components-common";

const LoginScene = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verdict, setVerdict] = useState({ status: "", message: "" });
  
  const checkAuth = () => {
    let roles = [2, 3, 4];
    if (roles.includes(props.user.role)) {
      return <Redirect to={FrontendRoutes.dashboard}/>
    }
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let endpoint = BackendRoutes.login;

    await axios
      .post(endpoint, { email, password }, { withCredentials: true })
      .then(() => {
        setVerdict({
          status: "success",
          message: "Successfully Logged In, Please Wait",
        });
        window.location.replace(FrontendRoutes.dashboard);
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
    <div className="login-scene">
      {checkAuth()}
      <Component.BISTHelmet title="Log in"/>
      <div className="login-form-container">
        <form onSubmit={onLogin} className="form">
          <span className="form-title">Welcome Back!</span>
          <div className="input-body">
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input type="email" name="email" id="email" required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input type="password" name="password" id="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }} required
              />

              <div className="input-text">
                <NavLink to={FrontendRoutes.forgotPassword}>
                  Forgot your password?
                </NavLink>
              </div>
              
            </div>
          </div>

          <div className="flash-message" status={verdict.status}>
            {verdict.message}
          </div>

          <div className="input-footer">
            <input
              type="submit"
              value="LOG IN"
              className="button-primary-filled"
            />
            <div className="input-text">
              Don't have a team account? &ensp;
              <NavLink to={FrontendRoutes.register}>
                Register
              </NavLink>
            </div>
          </div>
          
        </form>

      </div>
      <div className="login-asset medium-only"/>
    </div>
  );
};

export default LoginScene;
