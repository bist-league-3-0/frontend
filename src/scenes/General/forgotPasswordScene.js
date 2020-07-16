import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordScene = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMail = async (event) => {
    event.preventDefault();
    console.log(
      `${process.env.REACT_APP_API_URL}/api/bistleague3/auth/forgot-password/`
    );
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/bistleague3/auth/forgot-password/`,
        { email },
        { withCredentials: true }
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
      <form onSubmit={sendMail}>
        <input
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <button type="submit">Send mail</button>
        <div>{message}</div>
        <div>{process.env.REACT_APP_WEB_URL}</div>
        <div>{process.env.REACT_APP_API_URL}</div>
      </form>
    </div>
  );
};

export default ForgotPasswordScene;
