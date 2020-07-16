import React, { useState, useEffect } from "react";
import axios from "axios";
import BackendRoutes from "./../../routes/backendRoutes";
import Component from "./../../components/components-common";
import FrontendRoutes from "../../routes/frontendRoutes";

const LoginScene = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verdict, setVerdict] = useState({ status: "", message: "" });

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
        window.location.replace("/");
        return;
      })
      .catch((err) => {
        console.log(err);
        setVerdict({
          status: "error",
          message: err.response.data.message,
        });
        return;
      });
  };

  useEffect(() => {
    document.title = "Log in | BIST League 3.0";

    axios
      .get(BackendRoutes.checkAuth, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          window.location.replace("/");
        }
      });
  }, []);

  return (
    <div className="login-scene">
      <Component.Navigation width={props.width} />
      <div className="login-form-container">
        <form onSubmit={onLogin} className="form">
          <div className="flash-message" status={verdict.status}>
            {verdict.message}
          </div>
          <span className="form-title">Welcome Back!</span>
          <div className="input-body">
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
              <div className="input-text">
                <a href={FrontendRoutes.forgotPassword}>
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
          <div className="input-footer">
            <input
              type="submit"
              value="LOG IN"
              className="button-primary-filled"
            />
            <div className="input-text">
              Don't have an account? &ensp;
              <a href={BackendRoutes.register}>Register</a>
            </div>
          </div>
        </form>
      </div>
      <div className="login-asset medium-only"></div>
    </div>
  );
};

export default LoginScene;

/* <h1>Welcome Back</h1>
  <form onSubmit={onLogin}>
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
    </div>
    <input type="submit" value="go on" />
  </form>
  <div>{verdict}</div> */
