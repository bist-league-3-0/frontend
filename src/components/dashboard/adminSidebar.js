import React from 'react';
import SidebarPill from "./sidebarPill";
import FrontendRoutes from "../../routes/frontendRoutes";

const AdminSidebar = ({state, handleClick, role}) => {
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
        <SidebarPill 
          to={FrontendRoutes.adminRoutes.teams} 
          text="Teams" 
          icon={['fas', "users"]}
          whenExact={true}
          handleClick={handleClick}
        />
        <SidebarPill 
          to={FrontendRoutes.adminRoutes.payment} 
          text="Payment" 
          icon={['fas', "money-bill-wave"]}
          whenExact={true}
          handleClick={handleClick}
        />
      </div>
    </div>
  )
}

export default AdminSidebar;