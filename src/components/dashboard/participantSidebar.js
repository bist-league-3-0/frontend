import React from 'react';
import SidebarPill from "./sidebarPill";
import FrontendRoutes from "../../routes/frontendRoutes";
import AuthGroups from '../../scenes/authGroup';
import SocialRoutes from '../../routes/socialRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ParticipantSidebar = ({state, handleClick, role}) => {
  let { dashRoutes } = FrontendRoutes;
  
  return (
    <div className="dashboard-sidebar" state={state}>
      <div className="sidebar-pill-group">
        <SidebarPill 
          to={FrontendRoutes.dashboard} 
          text="Dashboard" 
          icon={['fas', "border-all"]}
          whenExact={true}
          handleClick={handleClick}
        />
      </div>

      <div className="sidebar-component">
        <hr/>
      </div>

      <div className="sidebar-pill-group">
        <SidebarPill 
          to={dashRoutes.teamManagement} 
          text="Team Management" 
          icon={['fas', "users"]}
          handleClick={handleClick}
        />
        <SidebarPill 
          to={dashRoutes.memberManagement} 
          text="Member Management" 
          icon={['fas', 'users-cog']}
          handleClick={handleClick}
        />
      </div>

      <div className="sidebar-component">
        <hr/>
      </div>

      <div className="sidebar-pill-group">
        <a className="sidebar-pill" onClick={handleClick} href={SocialRoutes.preliminaryCase} style={{"display": "block"}} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={['fas', 'file-download']} size="lg"/>
          &emsp; Preliminary Case
        </a>
        {
          AuthGroups.finalGroup.includes(role)
          ? <a className="sidebar-pill" onClick={handleClick} href={SocialRoutes.finalCase} style={{"display": "block"}} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fas', 'file-download']} size="lg"/>
              &emsp; Final Case
            </a>
          : null
        }
      </div>

      <div className="sidebar-component">
        <hr/>
      </div>

      <div className="sidebar-pill-group">
        <SidebarPill 
          to={dashRoutes.prelimFileSubmission} 
          text="Preliminary Solution Submission" 
          icon={['fas', 'file-upload']}
          handleClick={handleClick}
        />
        {
          AuthGroups.finalGroup.includes(role)
          ? (<SidebarPill 
              to={dashRoutes.finalFileSubmission} 
              text="Final File Submission" 
              icon={['fas', "file-upload"]}
              handleClick={handleClick}
            />)
          : null
        }
      </div>

    </div>
  )
}

export default ParticipantSidebar;