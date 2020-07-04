import React, { useState } from "react";
import axios from "axios";

const LoginScene = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verdict, setVerdict] = useState("");

  const onLogin = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:9000/api/bistleague3/auth/login", {
        email,
        password,
      })
      .then((response) => {
        return;
      })
      .catch((err) => {
        setVerdict(err.response.data.message);
        return;
      });
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={onLogin}>
        <div>
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Password:</label>
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
      <div>{verdict}</div>
    </div>
  );
};

export default LoginScene;
