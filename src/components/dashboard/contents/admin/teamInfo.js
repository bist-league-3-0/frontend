import React, { useState, useEffect } from 'react';
import DashboardComponent from '../components/components-common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import BackendRoutes from '../../../../routes/backendRoutes';
import FlashMessageFixed from '../components/flash-message-fixed';
import { useParams } from 'react-router-dom';

const AdminTeamInfo = ({user}) => {
  let { id } = useParams();
  const [team, setTeam] = useState({});         // Complete Team Information 
  const [teamInfo, setTeamInfo] = useState({}); // Filtered Team Information
  const [verdict, setVerdict] = useState({status: "", message: ""});
  const [flashMessageTime, setFlashMessageTime] = useState(0);

// HELPER FUNCTION: Get Member Name From ID (For Leader Name)
  const getMemberNameFromID = (x) => {
    let teamMember =  team?.teamMembers?.filter(data => {return data.teamMemberID === x});
    return teamMember?.pop().teamMemberName;
  }

// HELPER FUNCTION: Get Member Name From ID (For Leader Name)
  const paymentStatusString = (x) => {
    if (x === 2) {
      return "Paid and Verified"
    }

    if (x === 1) {
      return "Paid, Not Verified Yet!"
    }

    return "Not Paid"
  }

// HELPER FUNCTION: Get Member Name From ID (For Leader Name)
  const roleString = (x) => {
    if (x === 3) {
      return "Finalist"
    }

    return "Preliminary"
  }

// FETCH DATA FUNCTION
  const fetchData = async () => {
    return Axios.post(
      BackendRoutes.auth,
      {email: user?.account?.email},
      {withCredentials: true}
    )
    .then((res) => {
      return Axios.get(
        BackendRoutes.adminAccount.getTeamData,
        {
          params: {
            teamID: id
          },
          withCredentials: true,
          headers: {
            "Authorization" : `Bearer ${res.data.accessToken}`
          }
          
        }
      )
    })
    .then(res => {
      setTeam(res?.data || {});
      return "Data successfully fetched / refreshed!";
    })
    .catch(() => {
      throw new Error("Something went wrong while fetching data...");
    });
  }

// When component is mounted
  useEffect(() => {
    setVerdict({status:"info", message: "Fetching data..."});
    setFlashMessageTime(2000);
    
    fetchData()
    .then(message => {
      setVerdict({status:"success", message: message});
      setFlashMessageTime(2000);
    })
    .catch(e => {
      setVerdict({status:"error", message: `Error: ${e.message}`});
      setFlashMessageTime(2000);
    })
  }, [id]);

// When Team is Populated, set Team Info State.
  useEffect(() => {
    setTeamInfo({
      "Team Name": team?.account?.username,
      "Team Leader": getMemberNameFromID(team?.leaderID),
      "Email": team?.account?.email,
      "Member Count": team?.teamCount,
      "Institution": team?.institutionName,
      "Payment Status": paymentStatusString(team?.teamStatus?.paymentStatus),
      "Role Status": roleString(team?.account?.roleID)
    });
  }, [team]);

// RENDER TEAM INFO
  const renderTeamInfo = Object.entries(teamInfo)?.map((data, index) => {
    return (
      <div className="db-text-map" key={index}>
        <span className="text-key">{data[0]}</span>
        <span className="text-value">{data[1]}</span>
      </div> 
    )
  });

// RENDER TEAM FILES
  const renderFiles = () => {
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

    pushObject(tempFiles, "Payment File", getFileObject(team?.account?.files, team?.proofOfPayment));
    pushObject(tempFiles, "Preliminary File", getFileObject(team?.account?.files, team?.preliminarySubmission));
    pushObject(tempFiles, "Final File 1", getFileObject(team?.account?.files, team?.finalSubmission1));
    pushObject(tempFiles, "Final File 2", getFileObject(team?.account?.files, team?.finalSubmission2));
    
    let x = team?.teamMembers?.map((teamMember) => {
      pushObject(tempFiles, teamMember?.teamMemberName.split(" ")[0].toString() + "'s Portrait Photo", getFileObject(team?.account?.files, teamMember?.photoPortrait));
      pushObject(tempFiles, teamMember?.teamMemberName.split(" ")[0].toString() + "'s Proof of Enrollment", getFileObject(team?.account?.files, teamMember?.proofOfEnrollment));
      pushObject(tempFiles, teamMember?.teamMemberName.split(" ")[0].toString() + "'s Student ID Card", getFileObject(team?.account?.files, teamMember?.studentIDFile));
    })

    if (Object.entries(tempFiles).length === 0) return <h3>No Files!</h3>

    return Object.entries(tempFiles).map((file, index) => {
      return (
        <div className="db-text-map" key={index}>
          <span className="text-key">{file[0]}</span>
          <span className="text-value">
            <a href={`${file[1]?.filename}?ignoreCache=1`} target="_blank" rel="noopener noreferrer">Link</a>
          </span>
        </div>
      )
    });
  }

// RENDER TEAM MEMBER CARDS
  const renderTeamMembers = team?.teamMembers?.map((data, index) => {
    return (
      <div className="card-column" key={index}>
        <span className="db-text-map-title">
          {data?.teamMemberID === team?.leaderID ? "Leader Data" : data?.teamMemberName.split(" ")[0].toString() + " Data"}
        </span>
        <div className="db-text-map">
          <span className="text-key">Name</span>
          <span className="text-value">{data?.teamMemberName}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Age</span>
          <span className="text-value">{data?.age}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Email</span>
          <span className="text-value">{data?.email}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Gender</span>
          <span className="text-value">{data?.gender}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Interest</span>
          <span className="text-value">{data?.interest}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Major</span>
          <span className="text-value">{data?.major}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">LINE</span>
          <span className="text-value">{data?.lineID || "Not Set"}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Linkedin</span>
          <span className="text-value">
            {<a href={data?.linkedin} rel="noopener noreferrer" target="_blank">Link</a> || "Not Set"}
          </span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Phone</span>
          <span className="text-value">{data?.phoneNumber || "Not Set"}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Portrait</span>
          <span className="text-value">{data?.photoPortrait ? "Set" : "Not Set"}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Proof of Enrollment</span>
          <span className="text-value">{data?.proofOfEnrollment ? "Set" : "Not Set"}</span>
        </div>
        <div className="db-text-map">
          <span className="text-key">Student ID File</span>
          <span className="text-value">{data?.studentIDFile ? "Set" : "Not Set"}</span>
        </div>
      </div>
    )
  })

  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Team Info" 
        description={team?.account?.username} 
      />
      <hr/>
      <div className="content-body">
        <div className="db-participant-landing-wrapper">
          <div className="db-participant-landing-card">
            <div className="card-header">
              Team Summary
            </div>
            <div className="card-body row">
              <div className="card-column">
                <span className="db-text-map-title">
                  Team Information
                </span>
                {renderTeamInfo}
              </div>
              <div className="card-column">
                <span className="db-text-map-title">
                  Team Configuration
                </span>
                <div className="db-text-map">
                  <span className="text-key">Set Role Status</span>
                  <span className="text-value">
                    <DashboardComponent.ToggleTeamRoleButton
                      user={user}
                      setFlashMessageTime={setFlashMessageTime}
                      setVerdict={setVerdict}
                      role={team?.account?.roleID}
                      accountID={team?.account?.accountID}
                      fetchData={fetchData}
                    />
                  </span>
                </div>
                <div className="db-text-map">
                  <span className="text-key">Set Payment Status</span>
                  <span className="text-value">
                    <DashboardComponent.TogglePaymentButton
                      user={user}
                      setFlashMessageTime={setFlashMessageTime}
                      setVerdict={setVerdict}
                      paymentStatus={team?.teamStatus?.paymentStatus}
                      teamID={team?.teamID}
                      fetchData={fetchData}
                    />
                  </span>
                </div> 
              </div>
            </div>
          </div>
          <div className="db-participant-landing-card">
            <div className="card-header">
              Team Files
            </div>
            <div className="card-body row">
              <div className="card-column">
                {renderFiles()}
              </div>
            </div>
          </div>
          <div className="db-participant-landing-card">
            <div className="card-header">
              Team Members
            </div>
            <div className="card-body row">
              {renderTeamMembers}
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
    </div>
  )
}

export default AdminTeamInfo;