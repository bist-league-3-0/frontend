import React, { useState, useEffect } from 'react';
import DashboardComponent from '../components/components-common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import BackendRoutes from '../../../../routes/backendRoutes';
import FlashMessageFixed from '../components/flash-message-fixed';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../../../routes/frontendRoutes';
// import { NavLink } from 'react-router-dom';
// import FrontendRoutes from '../../../../routes/frontendRoutes';

const AdminTeamsContent = ({user, propsTeamnameFilter, propsPaymentFilter, propsRoleFilter}) => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [verdict, setVerdict] = useState({status: "", message: ""});
  const [flashMessageTime, setFlashMessageTime] = useState(0);
  const [teamnameFilter, setTeamnameFilter] = useState(propsTeamnameFilter || "");
  const [paymentFilter, setPaymentFilter] = useState(propsPaymentFilter || []);
  const [roleFilter, setRoleFilter] = useState(propsRoleFilter || []);

// FETCH DATA FUNCTION
const fetchData = async () => {
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
      setVerdict({status:"error", message: `There was an error while fetching data..`});
      setFlashMessageTime(2000);
    })
  }, []);

// USE EFFECT FOR SEARCH TEAMS BY TEAM NAME
  useEffect(() => {
    if (!teamnameFilter && paymentFilter.length <= 0 && roleFilter.length <= 0) {
      setFilteredTeams(teams);
    }
    
    let temp = teams;
    if (teamnameFilter) {
      temp = temp.filter((data) => {return (data?.account?.username.toUpperCase().indexOf(teamnameFilter) > -1)});
    }

    if (paymentFilter.length > 0) {
      temp = temp.filter(data => {return paymentFilter.includes(data?.teamStatus?.paymentStatus.toString())});
    }

    if (roleFilter.length > 0) {
      temp = temp.filter(data => {return roleFilter.includes(data?.account?.roleID.toString())});
    }

    setFilteredTeams(temp);
  }, [teamnameFilter, paymentFilter, roleFilter, teams]);

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
  const identifyPaymentStatus = (paymentStatus, teamID, sendDate) => {
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
        <span className="color-gray-1">
          Proof of Payment Sent Date: <br/>
          <small className="color-gray-2">{sendDate}</small><br/><br/>
        </span>
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
        <span className="color-gray-1">
          Proof of Payment Sent Date: <br/>
          <small className="color-gray-2">{sendDate}</small><br/><br/>
        </span>
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
  const renderTeams = filteredTeams.map((team, key) => {
    let teamFiles = {};
    pushObject(teamFiles, "Payment File", getFileObject(team?.account?.files, team?.proofOfPayment));
    pushObject(teamFiles, "Preliminary File", getFileObject(team?.account?.files, team?.preliminarySubmission));
    pushObject(teamFiles, "Final File 1", getFileObject(team?.account?.files, team?.finalSubmission1));
    pushObject(teamFiles, "Final File 2", getFileObject(team?.account?.files, team?.finalSubmission2));

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
          <span className="team-info">
            <NavLink to={FrontendRoutes.adminRoutes.teams + team?.teamID + "/"}>
              Team Details
            </NavLink>
          </span>
        </td>
        {identifyTeamStatus(team?.account?.roleID, team?.accountID)}
        {identifyPaymentStatus(team?.teamStatus?.paymentStatus, team?.teamID, new Date(teamFiles["Payment File"]?.updatedAt?.toString()).toString())}
        <td className="table-cell-big cell-files-data">
          {
            Object.values(teamFiles).length > 0
            ? Object.entries(teamFiles).map((teamFile, key) => {
                return (
                  <a key={key} href={`${teamFile[1]?.filename}?ignoreCache=1`} target="_blank" rel="noopener noreferrer" >
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
    if (filteredTeams.length > 0) return (
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

// HANDLE PAYMENT FILTER CHECKBOX CHANGE
  const handlePaymentFilterChange = (e) => {
    let index = paymentFilter.indexOf(e.target.value);
    if (index > -1) {
      setPaymentFilter(paymentFilter.filter(item => item !== e.target.value));
    } else {
      setPaymentFilter(paymentFilter.concat([e.target.value]));
    }
  }

// HANDLE ROLE FILTER CHECKBOX CHANGE
  const handleRoleFilterChange = (e) => {
    let index = roleFilter.indexOf(e.target.value);
    if (index > -1) {
      setRoleFilter(roleFilter.filter(item => item !== e.target.value));
    } else {
      setRoleFilter(roleFilter.concat([e.target.value]));
    }
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
        <div className="card-container">
          <div className="card-row">
            <div className="card">
              <div className="card-header">Search by Team Name</div>
              <div className="card-body form">
                <input type="text" name="searchFilter" id="searchFilter" onChange={(e) => {setTeamnameFilter(e.target.value.toUpperCase())}}/>
              </div>
            </div>
            <div className="card">
              <div className="card-header">Filter Option</div>
              <div className="card-body form">
                <div className="input-group">
                  <div className="input-label">Payment Status</div>
                  <div className="input-radio-wrapper force-row">
                    <div className="input-radio">
                      <input type="checkbox" name="paymentStatus" id="status-unpaid" value="0" onChange={handlePaymentFilterChange}
                        defaultChecked={propsPaymentFilter?.includes("0")}
                      />
                      <label htmlFor="status-unpaid">
                        <span className="radio-button"></span>
                        <span className="radio-description">Not Paid</span>
                      </label>
                    </div>
                    <div className="input-radio">
                      <input type="checkbox" name="paymentStatus" id="status-paid-unverified" value="1" onChange={handlePaymentFilterChange}
                        defaultChecked={propsPaymentFilter?.includes("1")}
                      />
                      <label htmlFor="status-paid-unverified">
                        <span className="radio-button"></span>
                        <span className="radio-description">Paid, Not Verified</span>
                      </label>
                    </div>
                    <div className="input-radio">
                      <input type="checkbox" name="paymentStatus" id="status-paid-verified" value="2" onChange={handlePaymentFilterChange}
                        defaultChecked={propsPaymentFilter?.includes("2")}
                      />
                      <label htmlFor="status-paid-verified">
                        <span className="radio-button"></span>
                        <span className="radio-description">Paid and Verified</span>
                      </label>
                    </div>
                  </div>
                  
                </div>
                <div className="input-group">
                  <div className="input-label">Role</div>
                  <div className="input-radio-wrapper force-row">
                    <div className="input-radio">
                      <input type="checkbox" name="roleStatus" id="role-preliminary" value="2" onChange={handleRoleFilterChange}
                        defaultChecked={[propsRoleFilter]?.includes("2")}
                      />
                      <label htmlFor="role-preliminary">
                        <span className="radio-button"></span>
                        <span className="radio-description">Preliminary</span>
                      </label>
                    </div>
                    <div className="input-radio">
                      <input type="checkbox" name="roleStatus" id="role-final" value="3" onChange={handleRoleFilterChange}
                        defaultChecked={propsRoleFilter?.includes("3")}
                      />
                      <label htmlFor="role-final">
                        <span className="radio-button"></span>
                        <span className="radio-description">Final</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderTable()}
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


export default AdminTeamsContent;