import React, { useState, useEffect } from 'react';
import DashboardComponent from '../components/components-common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import BackendRoutes from '../../../../routes/backendRoutes';
// import { NavLink } from 'react-router-dom';
// import FrontendRoutes from '../../../../routes/frontendRoutes';

const AdminTeamsContent = ({user}) => {
  const [teams, setTeams] = useState([]);
  const [verdict, setVerdict] = useState({status: "", message: ""});
  const [flashMessageTime, setFlashMessageTime] = useState(0);

// FETCH DATA FUNCTION
const fetchData = () => {
  return Axios.post(
    BackendRoutes.auth,
    {email: user?.account?.email},
    {withCredentials: true}
  )
  .then((res) => {
    return Axios.get(
      BackendRoutes.adminAccount.getTeamsData,
      {
        withCredentials: true,
        headers: {
          "Authorization" : `Bearer ${res.data.accessToken}`
        }
      }
    )
  })
  .then(res => {
    setTeams(res?.data || []);
    return "Data successfully fetched / refreshed!";
  })
  .catch(e => {
    throw e
  });
}

// FETCH DATA FROM SERVER WITH USE EFFECT
  useEffect(() => {
    setVerdict({status:"info", message: "Fetching data..."});
    setFlashMessageTime(2000);
    
    fetchData()
    .then(message => {
      setVerdict({status:"success", message: message});
      setFlashMessageTime(2000);
    })
    .catch(e => {
      setVerdict({status:"error", message: `Error: ${e.response.data.message}`});
      setFlashMessageTime(2000);
    })
  }, []);

// FLASH MESSAGE TIMER WITH USE EFFECT
  useEffect(() => {
    const timeout = flashMessageTime > 0 && setTimeout(() => setFlashMessageTime(flashMessageTime - 10), 10);
    if (flashMessageTime <= 0) setVerdict({status: "", message: ""});

    return () => clearTimeout(timeout);
  }, [flashMessageTime])

// IDENTIFY TEAM STATUS
  const identifyTeamStatus = (role, accountID) => {
    if (role === 3) {
      return (
        <td>
          Finalist<br/>
          <DashboardComponent.ToggleTeamRoleButton
            user={user}
            setFlashMessageTime={setFlashMessageTime}
            setVerdict={setVerdict}
            role={role}
            accountID={accountID}
            fetchData={fetchData}
          />
        </td>
      )
    }
    if (role === 2) {
      return (
        <td>
          Preliminary<br/>
          <DashboardComponent.ToggleTeamRoleButton
            user={user}
            setFlashMessageTime={setFlashMessageTime}
            setVerdict={setVerdict}
            role={role}
            accountID={accountID}
            fetchData={fetchData}
          />
        </td>
      )
    }
    return <td>Team Status Unknown</td>
  }

// IDENTIFY PAYMENT STATUS
  const identifyPaymentStatus = (paymentStatus, teamID) => {
    if (paymentStatus === 0) return (
      <td className="color-error table-cell-big">
        <FontAwesomeIcon icon={["fas", "exclamation-circle"]}/>
        &ensp;Not Paid
      </td>
    )
    if (paymentStatus === 1) return (
      <td className="color-warning table-cell-big">
        <FontAwesomeIcon icon={["fas", "exclamation-circle"]}/>
        &ensp;Paid, Not Verified<br/>
        <DashboardComponent.TogglePaymentButton
          user={user}
          setFlashMessageTime={setFlashMessageTime}
          setVerdict={setVerdict}
          paymentStatus={paymentStatus}
          teamID={teamID}
          fetchData={fetchData}
        />
      </td>
    )
    if (paymentStatus === 2) return (
      <td className="color-success table-cell-big">
        <FontAwesomeIcon icon={["fas", "check-circle"]}/>
        &ensp;Paid and Verified<br/>
        <DashboardComponent.TogglePaymentButton
          user={user}
          setFlashMessageTime={setFlashMessageTime}
          setVerdict={setVerdict}
          paymentStatus={paymentStatus}
          teamID={teamID}
          fetchData={fetchData}
        />
      </td>
    )
    return (
      <td className="color-error table-cell-big">
        <FontAwesomeIcon icon={["fas", "exclamation-circle"]}/>
        &ensp;Payment Status Unknown
      </td>
    )
  }

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

// RENDER TEAMS TABLE BODY FUNCTION
  const renderTeams = teams.map((team, key) => {
    let teamFiles = {};
    pushObject(teamFiles, "Payment File", getFileObject(team?.account?.files, team?.proofOfPayment));
    pushObject(teamFiles, "Preliminary File", getFileObject(team?.account?.files, team?.preliminarySubmission));
    pushObject(teamFiles, "Final File 1", getFileObject(team?.account?.files, team?.final1Submission));
    pushObject(teamFiles, "Final File 2", getFileObject(team?.account?.files, team?.final2Submission));

    return (
      <tr key={key}>
        <td>{team?.teamID}</td>
        <td className="table-cell-big cell-team-data">
          <span className="team-name">
            {team?.account?.username}
          </span>
          <span className="team-email">
            {team?.account?.email}
          </span>
          <span className="team-institution">
            {team?.institutionName}
          </span>
        </td>
        {identifyTeamStatus(team?.account?.roleID, team?.accountID)}
        {identifyPaymentStatus(team?.teamStatus?.paymentStatus, team?.teamID)}
        <td className="table-cell-big cell-files-data">
          {
            Object.values(teamFiles).length > 0
            ? Object.entries(teamFiles).map((teamFile, key) => {
                return (
                  <a key={key} href={teamFile[1].filename} target="_blank" rel="noopener noreferrer" >
                    {teamFile[0]}
                  </a>
                )
              })
            : "No files sent!"
          }
        </td>
      </tr>
    )
  });

// RENDER THE TABLE
  const renderTable = () => {
    if (teams.length > 0) return (
      <div className="table-wrapper">
        <table className="dashboard-table">
          <thead className="dashboard-table-head">
            <tr>
              <th>ID</th>
              <th className="table-cell-big">Team Info</th>
              <th>Role</th>
              <th>Payment Status</th>
              <th className="table-cell-big">Team Files</th>
            </tr>
          </thead>
          <tbody className="dashboard-table-body">
            {renderTeams}
          </tbody>
        </table>
      </div>
    )

    return <DashboardComponent.NoResultTable/>
  }

// CLOSE FLASH MESSAGE FUNCTION
  const closeFlashMessage = () => {
    setVerdict({message: "", status: ""});
    setFlashMessageTime(0);
  }

// ADMIN TEAMS CONTENT MAIN HOOK RETURN
  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Teams" 
        description={user?.account?.username} 
      />
      <hr/>
      <div className="content-body">
        {renderTable()}
      </div>
      
      <div className="flash-message fixed" status={verdict.status} onClick={closeFlashMessage}>
        <div className="flash-message-body">
          <span className="flash-message-text">
            {verdict.message}
          </span>
          <FontAwesomeIcon icon={["fas", "times-circle"]} className="button-close" size="lg"/>
        </div>
        <div className="progress-bar" style={{width: `${flashMessageTime / 20}%`}}/>
      </div>
    </div>
  )
}


export default AdminTeamsContent;