import React from 'react';
import DashboardComponent from './components/components-common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gravatar from "gravatar";
import { NavLink, Switch, Route } from 'react-router-dom';
import FrontendRoutes from '../../../routes/frontendRoutes';
import BackendRoutes from '../../../routes/backendRoutes';
import Component from '../../components-common';

const MemberManagementContent = ({user}) => {
  const renderTeamMembers = user?.teamMember?.map((teamMember, index) => {
    return (
      <div className="card-style-business" key={index}>
        <div className="card-header">
          <img className="header-gravatar" src={gravatar.url(teamMember?.email, {d:"identicon"})}/>
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
        <NavLink to="/">
          <div className="card button-primary">
            <FontAwesomeIcon icon={'far', 'plus-circle'} size="3x"/>
            <span>Add Team Member</span>
          </div>
        </NavLink>
      )
    }
    
    return null;
  }
  
  const renderMemberRoutes = () => {
    return (
      <Switch>
        <Route exact path={FrontendRoutes.dashRoutes.memberManagement}>
          <div className="card-row">
            {renderTeamMembers}
            {renderAddMember()}
          </div>
        </Route>
        {Object.values(user?.teamMember).map((teamMember, index) => {
          return (
            <Route 
              path={FrontendRoutes.dashRoutes.memberManagement + teamMember?.teamMemberID + "/"}
              key={index}
            >
              <Component.Dashboard.MemberConfig teamMember={teamMember}/>
            </Route>
          )
        })}
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
        <div className="card-container">
          {renderMemberRoutes()}
        </div>
      </div>
    </div>
  )
}

export default MemberManagementContent;