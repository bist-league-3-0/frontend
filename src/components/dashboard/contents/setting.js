import React, { useState } from 'react';
import DashboardComponent from './components/components-common';
import axios from 'axios';
import BackendRoutes from '../../../routes/backendRoutes';

const SettingContent = ({user, refresh}) => {
  const [email, setEmail] = useState(user?.account?.email);
  const [password, setPassword] = useState("");
  const [verdict, setVerdict] = useState({status: "", message: ""});
  const [requestRunning, setRequestRunning] = useState(false);

  const submitAccountChange = (e) => {
    e.preventDefault();

    if (requestRunning) {
      return;
    }

    setRequestRunning(true);

    axios.post(
      BackendRoutes.auth,
      {email: user?.account?.email},
      {withCredentials: true}
    )
    .then(
      (res) => {
        return axios.post(
          BackendRoutes.bistAccount.changeAccountCredentials,
          {email, password, oldEmail: user?.account?.email},
          {
            withCredentials: true,
            headers: {
              "Authorization" : `Bearer ${res.data.accessToken}`
            }
          }
        )
      }
    )
    .then (
      (res) => {
        setVerdict({message: res.data.message, status: "success"})
        refresh();
        setRequestRunning(false)
        window.location.replace("/");
      }
    )
    .catch(
      (e) => {
        setRequestRunning(false);
        setVerdict({message: e.response.data.message, status: "error"})
      }
    )
  }

  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader
        title="Account Settings"
        description={user?.account?.username}
      />
      <hr/>
      <div className="content-body">
        <div className="card-container">
          <div className="card-row">
            <div className="card">
              <form className="form" onSubmit={submitAccountChange}>
                <div className="input-body">
                  <div className="input-group">
                    <label htmlFor="email" className="input-label">Change Email</label>
                    <span className="input-text">
                      This email is used for logging into team account. It is separated from leader email.
                      The email state shall change once you are logged out from this session.
                    </span>
                    <input type="email" name="email" id="email" required 
                      defaultValue={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="password" className="input-label">Change Password</label>
                    <input type="password" name="password" id="password" required
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>


                <div className="input-footer">
                  <input
                    type="submit"
                    value="CHANGE ACCOUNT SETTINGS"
                    className="button-primary-filled"
                    disabled={requestRunning}
                  />
                  <span className="input-text">
                    As soon as you changed your email and/or password, you will be logged out from this session.
                  </span>
                </div>

                <div className="flash-message" status={verdict.status}>
                  {verdict.message}
                </div>
              </form>
            </div>
            <div className="card medium-only boxsizing-default">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingContent;