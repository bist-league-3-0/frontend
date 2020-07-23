import React from 'react';
import DashboardComponent from './components/components-common';

const DashboardContent = ({user}) => {
  let teamInfo = {
    "Team Name": user?.account?.username,
    "Team Email": user?.account?.email,
    "Team Member Count": user?.teamAccount?.teamCount,
    "Team Institution": user?.teamAccount?.institutionName,
    "Proof of Payment": 
      user?.teamAccount?.proofOfPayment 
      ? "Invoice Sent" 
      : "Not paid yet"
  }

  let teamMemberInfo = [];
  for (let teamMember of (user?.teamMember || [])) {
    let tempMemberData = {};
    if (teamMember?.teamMemberID === user?.teamAccount?.leaderID) {
      tempMemberData["Leader Data"] = "";
    } else {
      let name = teamMember?.teamMemberName || "";
      let firstName = name.split(" ")[0].toString();
      tempMemberData[`${firstName}'s Data`] = "";
    }
    tempMemberData["Age"] = teamMember?.age;
    tempMemberData["Email"] = teamMember?.email;
    tempMemberData["Gender"] = teamMember?.gender;
    tempMemberData["Interest"] = teamMember?.interest;
    tempMemberData["LINE ID"] = teamMember?.lineID || "Not Set";
    tempMemberData["Linkedin"] = teamMember?.linkedin || "Not Set";
    tempMemberData["Major"] = teamMember?.major;
    tempMemberData["Phone Number"] = teamMember?.phoneNumber || "Not Set";
    tempMemberData["Photo Portrait"] = teamMember?.photoPortrait ? "Set" : "Not Set";
    tempMemberData["Proof of Enrollment"] = teamMember?.proofOfEnrollment ? "Set" : "Not Set";
    tempMemberData["Student ID File"] = teamMember?.studentIDFile ? "Set" : "Not Set";

    teamMemberInfo.push(tempMemberData)
  }

  const teamInfoRender = Object.entries(teamInfo).map((data, index) => {
    return (
      <div className="card-text" key={index}>
        <span className="card-text-key">{data[0]}</span>
        <span className="card-text-value">{data[1]}</span>
      </div>
    )
  });

  const teamMemberInfoRender = teamMemberInfo.map((block, index) => {
    return (
      <div className="card-text-wrapper" key={index}>
        {Object.entries(block).map((data, index) => {
          return (
            <div className="card-text" key={index}>
              <span className="card-text-key">{data[0]}</span>
              <span className="card-text-value">{data[1]}</span>
            </div>
          )
        })}
      </div>
    )
  })

  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Dashboard" 
        description={user?.account?.username} 
      />
      <hr/>
      <div className="content-body">
        <div className="card-container">
          
          <div className="card-row">
            <div className="card">
              <div className="card-header">Team Information</div>
              <div className="card-body">
                {teamInfoRender}
              </div>
            </div>
            <div className="card">
              <div className="card-header">Team Members</div>
              <div className="card-body">
                {teamMemberInfoRender}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DashboardContent;