import React from 'react';
import SidebarPill from "./sidebarPill";
import FrontendRoutes from "./../../routes/frontendRoutes";

const Sidebar = () => {
  let { dashRoutes } = FrontendRoutes;
  
  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-pill-group">
        <SidebarPill 
          to={FrontendRoutes.dashboard} 
          text="Dashboard" 
          icon={['fas', "border-all"]}
          whenExact={true}
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
        />
        <SidebarPill 
          to={dashRoutes.memberManagement} 
          text="Member Management" 
          icon={['fas', 'users-cog']}
        />
      </div>

      <div className="sidebar-component">
        <hr/>
      </div>

      <div className="sidebar-pill-group">
        <SidebarPill 
          to={dashRoutes.prelimFileSubmission} 
          text="Prelimiary File Submission" 
          icon={['fas', 'file-upload']}
        />
        <SidebarPill 
          to={dashRoutes.finalFileSubmission} 
          text="Final File Submission" 
          icon={['fas', "file-upload"]}
        />
      </div>
    </div>
  )
}

export default Sidebar;