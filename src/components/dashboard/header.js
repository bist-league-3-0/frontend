import React from 'react';
import FrontendRoutes from "./../../routes/frontendRoutes";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Asset from '../../assets/assets-common';

const Header = () => {
  return (
    <div className="dashboard-header">
      <NavLink to={FrontendRoutes.home}>
        <img 
          className="dashboard-icon" 
          src={Asset.LogoBistWhite} 
          alt="LogoBistWhite"
        />
      </NavLink>
      <div className="dashboard-links">
        <div className="dashboard-link">
          <FontAwesomeIcon 
            icon={['fas', "user-circle"]} 
            size="2x"
          />
        </div>
      </div>
    </div>
  )
}

export default Header;