import React, { useEffect, useState } from 'react';
import DashboardComponent from './components/components-common';
import Component from '../../components-common';
import BackendRoutes from '../../../routes/backendRoutes';
import FlashMessageFixed from './components/flash-message-fixed';

const FinalFileSubmission = ({user, refresh}) => {
  const [final1File, setFinal1File] = useState({});
  const [hideFinal1Dropzone, setHideFinal1Dropzone] = useState(false);
  const [verdict, setVerdict] = useState({status: "", message: ""});
  const [flashMessageTime, setFlashMessageTime] = useState(0);

// PUSH OBJECT HELPER FUNCTION 
  const pushObject = (object, name, value) => {
    try {
      return value ? object[name] = value : null;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }

// GET FILE OBJECT HELPER FUNCTION
  const getFileObject = (fileObject, condition) => {
    try {
      return fileObject?.filter(file => {return file?.fileID === condition}).pop();
    } catch (e) {
      console.log(e.message);
      return null
    }
  }

// USE EFFECT FOR SET FILE AS A STATE (EXPERIMENTAL)
  useEffect(() => {
    let tempFiles = {};
    pushObject(tempFiles, "Final File", getFileObject(user?.file, user?.teamAccount?.finalSubmission1));
    setFinal1File(tempFiles);
    if (Object.entries(tempFiles).length !== 0) {
      setHideFinal1Dropzone(true);
    }
  }, [user]);

// RENDER PAYMENT FILE STRING
  const renderFileString = () => {
    return Object.entries(final1File).map((file, index) => {
      return (
        <span className="input-text" key={index}>
          Your file: <a href={`${file[1]?.filename}?ignoreCache=1`} target="_blank" rel="noopener noreferrer">{file[0]}</a>
          <br/>

        </span>
      )
    });
  }

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
                    {renderFileString()}
                  </div>
                  {
                    hideFinal1Dropzone
                    ? <div className="input-group">
                        <button className="button-primary-filled" onClick={e => {e.preventDefault(); setHideFinal1Dropzone(false)}}>
                          REPLACE FINAL CASE FILE
                        </button>
                      </div>
                    : <div className="input-group">
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
                          setVerdict={setVerdict}
                          setFlashMessageTime={setFlashMessageTime}
                          setHideDropzone={setHideFinal1Dropzone}
                        />
                      </div>
                  }
                </div>
              </form>
            </div>

            <div className="card medium-only"/>
          </div>
        </div>
      </div>

      <FlashMessageFixed
        flashMessageTime={flashMessageTime}
        setFlashMessageTime={setFlashMessageTime}
        verdict={verdict}
        setVerdict={setVerdict}
      />
    </div>
  )
}

export default FinalFileSubmission;