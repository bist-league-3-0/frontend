import React, { useState } from 'react';
import SidebarPill from "./sidebarPill";
import FrontendRoutes from "./../../routes/frontendRoutes";

const Sidebar = ({state, handleClick}) => {
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
        <SidebarPill 
          to={dashRoutes.prelimFileSubmission} 
          text="Preliminary File Submission" 
          icon={['fas', 'file-upload']}
          handleClick={handleClick}
        />
        <SidebarPill 
          to={dashRoutes.finalFileSubmission} 
          text="Final File Submission" 
          icon={['fas', "file-upload"]}
          handleClick={handleClick}
        />
      </div>
    </div>
  )
}

export default Sidebar;