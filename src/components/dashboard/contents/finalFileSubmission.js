import React from 'react';
import DashboardComponent from './components/components-common';
import Component from '../../components-common';
import BackendRoutes from '../../../routes/backendRoutes';

const FinalFileSubmission = ({user, refresh}) => {
  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Final Submission" 
        description={user?.account?.username}  
      />
      <hr/>

      <div className="content-body">
        <div className="card-container">
          <div className="card-row">
          
            <div className="card">
              <form className="form" id="component-upload-finalfile">
                <div className="input-body">
                  <div className="input-group">
                    <span className="input-heading boxsizing-default">
                      Final File Submission
                    </span>
                  </div>
                  <div className="input-group">
                    <span className="input-text">
                      Please drop your file(s) below (Supported Files: .pdf, max: 8MB)
                    </span>
                    <Component.DropZone 
                      validTypes={["application/pdf"]}
                      buttonText="UPLOAD FILE"
                      postURL={BackendRoutes.bistAccount.uploadFinal}
                      idName="component-upload-finalfile"
                      user={user}
                      refresh={refresh}
                      context="FINAL"
                      filesLimit="1"
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

export default FinalFileSubmission;