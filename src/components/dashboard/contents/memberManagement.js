import React from 'react';
import DashboardComponent from './components/components-common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gravatar from "gravatar";
import { NavLink, Switch, Route } from 'react-router-dom';
import FrontendRoutes from '../../../routes/frontendRoutes';
import Component from '../../components-common';

const MemberManagementContent = ({user, refresh}) => {
  const renderTeamMembers = user?.teamMember?.map((teamMember, index) => {
    
    let image = () => {
      if (teamMember?.photoPortrait) {
        let fileObj = user?.file?.filter(obj => {
          return obj.fileID === teamMember?.photoPortrait;
        });

        return fileObj.pop().filename
      } else {
        return gravatar.url(teamMember?.email, {d:"identicon"})
      }
    }

    return (
      <div className="card-style-business" key={index}>
        <div className="card-header">
          <div className="header-gravatar" style={{background: `url(${image()})`}}/>
        </div>
        <div className="card-body">
          <div className="card-body-text">
            <span className="name-text">
              {teamMember?.teamMemberName}
            </span>
            <span className="email-text">
              {teamMember?.email}
            </span>
          </div>
          <NavLink to={FrontendRoutes.dashRoutes.memberManagement + teamMember?.teamMemberID + "/"}>
            <div className="card-body-button button-primary-filled">
              Change Member Setting
            </div>
          </NavLink>
        </div>
      </div>
    )
  })

  const renderAddMember = () => {
    if (user?.teamAccount?.teamCount < 3) {
      return (
        <NavLink to={FrontendRoutes.dashRoutes.addMember} className="card button-primary">
          <FontAwesomeIcon icon={['fas', 'plus-circle']} size="3x"/>
          <span>Add Team Member</span>
        </NavLink>
      )
    }
    
    return null;
  }

  const renderAddMemberRoute = () => {
    if (user?.teamAccount?.teamCount < 3) {
      return (
        <Route path={FrontendRoutes.dashRoutes.addMember}>
          <Component.BISTHelmet title="Add Member"/>
          <Component.Dashboard.AddTeamMember user={user} refresh={refresh}/>
        </Route>
      )
    }

    return null;
  }
  
  const renderMemberRoutes = () => {
    return (
      <Switch>
        <Route exact path={FrontendRoutes.dashRoutes.memberManagement}>
        <Component.BISTHelmet title="Member Management"/>
        <div className="card-container">
          <div className="card-row">
            {renderTeamMembers}
            {renderAddMember()}
          </div>
        </div>
        </Route>
        {Object.values(user?.teamMember).map((teamMember, index) => {
          let name = teamMember?.teamMemberName || "";
          let firstName = name.split(" ")[0].toString();

          return (
            <Route 
              path={FrontendRoutes.dashRoutes.memberManagement + teamMember?.teamMemberID + "/"}
              key={index}
            >
              <Component.BISTHelmet title={`Manage ${firstName}'s data`}/>
              <Component.Dashboard.MemberConfig user={user} team={user?.teamAccount} teamMember={teamMember} refresh={refresh}/>
            </Route>
          )
        })}
        {renderAddMemberRoute()}
      </Switch>
    )
  }

  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Member Management" 
        description={user?.account?.username} 
      />
      <hr/>
      <div className="content-body">
        {renderMemberRoutes()}
      </div>
    </div>
  )
}

export default MemberManagementContent;