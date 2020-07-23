import React from 'react';
import DashboardComponent from './components/components-common';
import Component from '../../components-common';
import BackendRoutes from '../../../routes/backendRoutes';

const PreliminaryFileSubmission = ({user}) => {

  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Preliminary Submission" 
        description={user?.account?.username} 
      />
      <hr/>

      <div className="content-body">
        <div className="card-container">
          <div className="card-row">

            <div className="card">
              <form className="form" id="component-upload-prelimfile">
                <div className="input-body">
                  <div className="input-group">
                    <span className="input-heading boxsizing-default">
                      Final File Submission
                    </span>
                  </div>
                  <div className="input-group">
                    <span className="input-text">
                      Please drop your file(s) below (Supported Files: .pdf)
                    </span>
                    <Component.DropZone 
                      validTypes={["application/pdf"]}
                      buttonText="UPLOAD FILE"
                      postURL={BackendRoutes.uploadFile.payment}
                      idName="component-upload-prelimfile"
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

export default PreliminaryFileSubmission;