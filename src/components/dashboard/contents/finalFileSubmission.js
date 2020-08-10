import React, { useEffect, useState } from 'react';
import DashboardComponent from './components/components-common';
import Component from '../../components-common';
import BackendRoutes from '../../../routes/backendRoutes';
import FlashMessageFixed from './components/flash-message-fixed';

const FinalFileSubmission = ({user, refresh}) => {
  const [final1File, setFinal1File] = useState({});
  const [final2File, setFinal2File] = useState({});
  const [hideFinal1Dropzone, setHideFinal1Dropzone] = useState(false);
  const [hideFinal2Dropzone, setHideFinal2Dropzone] = useState(false);
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
    let tempFinal1File = {};
    pushObject(tempFinal1File, "1st Final File", getFileObject(user?.file, user?.teamAccount?.finalSubmission1));
    setFinal1File(tempFinal1File);
    if (Object.entries(tempFinal1File).length !== 0) {
      setHideFinal1Dropzone(true);
    }

    let tempFinal2File = {};
    pushObject(tempFinal2File, "2nd Final File", getFileObject(user?.file, user?.teamAccount?.finalSubmission2));
    setFinal2File(tempFinal2File);
    if (Object.entries(tempFinal2File).length !== 0) {
      setHideFinal2Dropzone(true);
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

  const renderFile2String = () => {
    return Object.entries(final2File).map((file, index) => {
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
                      1st Final File Submission
                    </span>
                    {renderFileString()}
                  </div>
                  {
                    hideFinal1Dropzone
                    ? <div className="input-group">
                        <button className="button-primary-filled" onClick={e => {e.preventDefault(); setHideFinal1Dropzone(false)}}>
                          REPLACE 1st FINAL CASE FILE
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
                          context="FINAL_1"
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

            <div className="card">
              <form className="form" id="component-upload-finalfile-2">
                <div className="input-body">
                  <div className="input-group">
                    <span className="input-heading boxsizing-default">
                      2nd Final File Submission
                    </span>
                    {renderFile2String()}
                  </div>
                  {
                    hideFinal2Dropzone
                    ? <div className="input-group">
                        <button className="button-primary-filled" onClick={e => {e.preventDefault(); setHideFinal2Dropzone(false)}}>
                          REPLACE 2nd FINAL CASE FILE
                        </button>
                      </div>
                    : <div className="input-group">
                        <span className="input-text">
                          Please drop your file(s) below (Supported Files: .pdf, max: 8MB)
                        </span>
                        <Component.DropZone 
                          validTypes={["application/pdf"]}
                          buttonText="UPLOAD FILE"
                          postURL={BackendRoutes.bistAccount.uploadFinal2}
                          idName="component-upload-finalfile-2"
                          user={user}
                          refresh={refresh}
                          context="FINAL_2"
                          filesLimit="1"
                          setVerdict={setVerdict}
                          setFlashMessageTime={setFlashMessageTime}
                          setHideDropzone={setHideFinal2Dropzone}
                        />
                      </div>
                  }
                </div>
              </form>
            </div>
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