import React, { useState } from 'react';
import DashboardComponent from './components/components-common';

const SettingContent = ({user}) => {
  const [email, setEmail] = useState(user?.account?.email);
  const [password, setPassword] = useState("")

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
              <form className="form">
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