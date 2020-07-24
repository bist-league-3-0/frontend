import React, { useState } from 'react';
import DashboardComponent from './components/components-common';
import axios from 'axios';
import BackendRoutes from '../../../routes/backendRoutes';

const SettingContent = ({user}) => {
  const [email, setEmail] = useState(user?.account?.email);
  const [password, setPassword] = useState("");
  const [verdict, setVerdict] = useState({status: "", message: ""})

  const submitAccountChange = (e) => {
    e.preventDefault();
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
      }
    )
    .catch(
      (e) => {
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
                  />
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