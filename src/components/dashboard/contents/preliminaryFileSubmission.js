import React, { useEffect, useState } from 'react';
import DashboardComponent from './components/components-common';
import Component from '../../components-common';
import BackendRoutes from '../../../routes/backendRoutes';
import FlashMessageFixed from './components/flash-message-fixed';

const PreliminaryFileSubmission = ({user, refresh}) => {
  const [prelimFile, setPrelimFile] = useState({});
  const [hideDropzone, setHideDropzone] = useState(false);
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
    pushObject(tempFiles, "Your Preliminary Solution File", getFileObject(user?.file, user?.teamAccount?.preliminarySubmission));
    setPrelimFile(tempFiles);
    if (Object.entries(tempFiles).length !== 0) {
      setHideDropzone(true);
    }
  }, [user]);

// RENDER PAYMENT FILE STRING
  const renderFileString = () => {
    return Object.entries(prelimFile).map((file, index) => {
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
        title="Preliminary Solution Submission" 
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
                      Preliminary Solution Submission
                    </span>
                    <p>
                      Send your preliminary business case solution here!. 
                      Submission for the preliminary solution past 23.59 WIB (GMT + 7), October 14th, 2020 will result in point deduction
                    </p>
                    {renderFileString()}
                  </div>
                  {
                    hideDropzone
                    ? <div className="input-group">
                        <button className="button-primary-filled" onClick={e => {e.preventDefault(); setHideDropzone(false)}}>
                          REPLACE PRELIMINARY SOLUTION FILE
                        </button>
                      </div>
                    : <div className="input-group">
                        <span className="input-text">
                          Please drop your file(s) below (Supported Files: .pdf, max: 8MB)
                        </span>
                        <Component.DropZone 
                          validTypes={["application/pdf"]}
                          buttonText="UPLOAD FILE"
                          postURL={BackendRoutes.bistAccount.uploadPreliminary}
                          idName="component-upload-prelimfile"
                          user={user}
                          refresh={refresh}
                          context="PRELIMINARY"
                          filesLimit="1"
                          setVerdict={setVerdict}
                          setFlashMessageTime={setFlashMessageTime}
                          setHideDropzone={setHideDropzone}
                          maxFileSize={8 * 1024 * 1024}
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

export default PreliminaryFileSubmission;