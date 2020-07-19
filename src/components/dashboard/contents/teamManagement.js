import React from 'react';
import DashboardComponent from './components/components-common';
import Component from '../../components-common';

const TeamManagementContent = () => {
  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Team Management" 
        description="Nama tim Anda" 
      />
      <hr/>
      <div className="content-body">
        <div className="card-container">
          <div className="card-row">

            <div className="card">
              <form className="form">
                <div className="input-body">
                  <div className="input-group">
                    <span className="input-heading boxsizing-default">
                      Team Account
                    </span>
                  </div>
                  <div className="input-group">
                    <label htmlFor="teamname" className="input-label">Team Name</label>
                    <span className="input-text">
                      Team names that contain any offense towards a certain ethnicity, religion, or race are strictly prohibited.
                    </span>
                    <input type="text" name="teamname" id="teamname" required/>
                  </div>

                  <div className="input-footer">
                    <input
                      type="submit"
                      value="CHANGE TEAM NAME"
                      className="button-primary-filled"
                    />
                  </div>

                </div>
              </form>
            </div>

            <div className="card">
              <form className="form">
                <div className="input-body">
                  <div className="input-group">
                    <span className="input-heading boxsizing-default">
                      Proof of Payment
                    </span>
                  </div>
                  <div className="input-group">
                    <span className="input-text">
                      Please drop your file here
                    </span>
                    <Component.DropZone 
                      validTypes="all"
                      buttonText="UPLOAD PROOF OF PAYMENT"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamManagementContent;