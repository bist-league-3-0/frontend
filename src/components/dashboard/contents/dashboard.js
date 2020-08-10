import React, { useState, useEffect } from 'react';
import DashboardComponent from './components/components-common';
import AuthGroups from '../../../scenes/authGroup';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../../routes/frontendRoutes';

const DashboardContent = ({user}) => {
  const [teamInfo, setTeamInfo] = useState({});

// Get Member Name From ID
  const getMemberNameFromID = (x) => {
    let teamMember =  user?.teamMember?.filter(data => {return data.teamMemberID === x});
    return teamMember?.pop().teamMemberName;
  }

// Populate Team Info When Mounted
  useEffect(() => {
    setTeamInfo({
      "Team Name": user?.account?.username,
      "Team Leader": getMemberNameFromID(user?.teamAccount?.leaderID),
      "Email": user?.account?.email,
      "Member Count": user?.teamAccount?.teamCount,
      "Institution": user?.teamAccount?.institutionName,
    });
  }, [user])

// RENDER TEAM INFO
  const renderTeamInfo = Object.entries(teamInfo)?.map((data, index) => {
    return (
      <div className="db-text-map" key={index}>
        <span className="text-key">{data[0]}</span>
        <span className="text-value">{data[1]}</span>
      </div> 
    )
  });

// RENDER TEAM STATUS CARDS
  const renderStatusCards = () => {
    const identifyPaymentStatus = (x) => {
      if (x === 1) {return (
        <div className="db-text-map-card status-style-warning-bordered">
          <span className="text-key">PAYMENT</span>
          <span className="text-value">Paid, waiting for verification</span>
        </div>
      )}
      if (x === 2) {return (
        <div className="db-text-map-card status-style-success-bordered">
          <span className="text-key">PAYMENT</span>
          <span className="text-value">Paid and verified</span>
        </div>
      )}
      return (
        <div className="db-text-map-card status-style-error-bordered">
          <span className="text-key">PAYMENT</span>
          <span className="text-value">Not paid</span>
        </div>
      )
    }

    const identifyTeamRole = (x) => {
      if (x === 3) {return (
        <div className="db-text-map-card status-style-success-bordered">
          <span className="text-key">STATUS</span>
          <span className="text-value">Finalist</span>
        </div>
      )}

      return (
        <div className="db-text-map-card status-style-success-bordered">
          <span className="text-key">STATUS</span>
          <span className="text-value">Preliminary</span>
        </div>
      )
    }

    const identifyFileStatus = (file, payment, text) => {
      if (payment !== 0) {
        if (file === 1) { return (
          <div className="db-text-map-card status-style-success-bordered">
            <span className="text-key">{text}</span>
            <span className="text-value">File Sent</span>
          </div>
        )}

        return (
          <div className="db-text-map-card status-style-warning-bordered">
            <span className="text-key">{text}</span>
            <span className="text-value">File not set</span>
          </div>
        )
      }

      return (
        <div className="db-text-map-card status-style-error-bordered">
          <span className="text-key">{text}</span>
          <span className="text-value">You must send the proof of payment first!</span>
        </div>
      )
    }

    return (
      <div>
        {identifyTeamRole(user?.account?.roleID)}
        {identifyPaymentStatus(user?.teamStatus?.paymentStatus)}
        {identifyFileStatus(user?.teamStatus?.preliminarySubmissionStatus, user?.teamStatus?.paymentStatus, "Preliminary File")}
        {AuthGroups.finalGroup.includes(user?.account?.roleID) ? identifyFileStatus(user?.teamStatus?.finalSubmission1Status, user?.teamStatus?.paymentStatus, "Final File 1") : null}
        {AuthGroups.finalGroup.includes(user?.account?.roleID) ? identifyFileStatus(user?.teamStatus?.finalSubmission2Status, user?.teamStatus?.paymentStatus, "Final File 2") : null}
      </div>
    )
  }

// RENDER TEAM MEMBER CARDS
  const renderTeamMembers = user?.teamMember?.map((data, index) => {
    return (
      <div className="card-column" key={index}>
        <span className="db-text-map-title">
          {data?.teamMemberID === user?.teamAccount?.leaderID ? "Leader Data" : data?.teamMemberName.split(" ")[0].toString() + " Data"}
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

// RENDER FILES
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

    pushObject(tempFiles, "Payment File", getFileObject(user?.file, user?.teamAccount?.proofOfPayment));
    pushObject(tempFiles, "Preliminary File", getFileObject(user?.file, user?.teamAccount?.preliminarySubmission));
    pushObject(tempFiles, "Final File 1", getFileObject(user?.file, user?.teamAccount?.finalSubmission1));
    pushObject(tempFiles, "Final File 2", getFileObject(user?.file, user?.teamAccount?.finalSubmission2));  
    
    let x = user?.teamMember?.map((teamMember) => {
      pushObject(tempFiles, teamMember?.teamMemberName.split(" ")[0].toString() + "'s Portrait Photo", getFileObject(user?.file, teamMember?.photoPortrait));
      pushObject(tempFiles, teamMember?.teamMemberName.split(" ")[0].toString() + "'s Proof of Enrollment", getFileObject(user?.file, teamMember?.proofOfEnrollment));
      pushObject(tempFiles, teamMember?.teamMemberName.split(" ")[0].toString() + "'s Student ID Card", getFileObject(user?.file, teamMember?.studentIDFile));
    })

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

  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Dashboard" 
        description={user?.account?.username} 
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
                  Team Status
                </span>
                {renderStatusCards()}
              </div>
              <div className="card-column">
                <span className="db-text-map-title">
                  Team Information
                </span>
                {renderTeamInfo}
                <NavLink to={FrontendRoutes.dashRoutes.teamManagementEditable} className="button-primary-filled color-white">CHANGE TEAM INFO</NavLink>
              </div>
            </div>
          </div>
          <div className="db-participant-landing-card">
            <div className="card-header">
              Team Member Summary
            </div>
            <div className="card-body row">
              {renderTeamMembers}
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
        </div>
      </div>
    </div>
  )
}

export default DashboardContent;