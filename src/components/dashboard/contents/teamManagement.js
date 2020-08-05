import React, { useState } from 'react';
import DashboardComponent from './components/components-common';
import Component from '../../components-common';
import BackendRoutes from '../../../routes/backendRoutes';
import axios from 'axios';
import FlashMessageFixed from './components/flash-message-fixed';

const TeamManagementContent = ({user, refresh}) => {
  const [teamName, setTeamName] = useState(user?.account?.username);
  const [institution, setInstitution] = useState(user?.teamAccount?.institutionName);
  const [verdict, setVerdict] = useState({status: "", message: ""});
  const [flashMessageTime, setFlashMessageTime] = useState(0);
  const [requestRunning, setRequestRunning] = useState(false);

  const renderFileString = () => {
    let tempFiles = {}

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

    pushObject(tempFiles, "Payment File", getFileObject(user?.file, user?.teamAccount?.proofOfPayment));
    console.log(tempFiles)

    return Object.entries(tempFiles).map((file, index) => {
      return (
        <span className="input-text" key={index}>
          Your file: <a href={file[1]?.filename} target="_blank" rel="noopener noreferrer">{file[0]}</a>
        </span>
      )
    });
  }

  const submitTeamChange = (e) => {
    e.preventDefault();
    setVerdict({message: "Please wait..", status: "info"});
    setFlashMessageTime(2000);
    
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
          BackendRoutes.bistAccount.changeTeamData,
          {
            id: user?.account?.accountID,
            institution,
            teamName
          },
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
        refresh();
        setRequestRunning(false);
        setVerdict({message: res.data.message, status: res.data.success ? "success" : "error"})
        setFlashMessageTime(2000);
      }
    )
    .catch(
      (e) => {
        setRequestRunning(false);
        setVerdict({message: e.response.data.message, status: "error"})
        setFlashMessageTime(2000);
      }
    )
  }

  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Team Management" 
        description={user?.account?.username} 
      />
      <hr/>
      <div className="content-body">
        <div className="card-container">
          <div className="card-row">

            <div className="card">
              <form className="form" onSubmit={submitTeamChange}>
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
                    <input type="text" name="teamname" id="teamname" required 
                      defaultValue={teamName}
                      onChange={e => setTeamName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="institution" className="input-label">Institution</label>
                    <span className="input-text">
                      Please write your institution / school name without abbreviating its name and please write it in official name, ex: Institut Teknologi Bandung, not Bandung Institute of Technology
                    </span>
                    <input type="text" name="institution" id="institution" required
                      onChange={e => setInstitution(e.target.value)}
                      defaultValue={institution}
                    />
                  </div>
                </div>

                <div className="input-footer">
                  <input
                    type="submit"
                    value="CHANGE TEAM INFO"
                    className="button-primary-filled"
                    disabled={requestRunning}
                  />
                </div>
              </form>
            </div>

            <div className="card">
              <form className="form" id="component-upload-payment">
                <div className="input-body">
                  <div className="input-group">
                    <span className="input-heading boxsizing-default">
                      Proof of Payment
                    </span>
                  </div>
                  <div className="input-group">
                    {renderFileString()}
                    <span className="input-text">
                      Please drop your file(s) below (Supported Files: .png, .jpg, and .jpeg; max: 8MB)
                    </span>
                    <Component.DropZone 
                      validTypes={["image/jpeg", "image/png"]}
                      buttonText="UPLOAD PROOF OF PAYMENT"
                      postURL={BackendRoutes.bistAccount.uploadPayment}
                      idName="component-upload-payment"
                      user={user}
                      refresh={refresh}
                      context="PAYMENT"
                      filesLimit="1"
                    />
                  </div>
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

export default TeamManagementContent;