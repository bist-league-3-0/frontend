import React from 'react';
import FrontendRoutes from "./../../routes/frontendRoutes";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Asset from '../../assets/assets-common';
import BackendRoutes from '../../routes/backendRoutes';

const Header = ({width}) => {
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
            size={width <= 960 ? "lg" : "2x"}
          />
        </div>
        <a href={BackendRoutes.logout} className="dashboard-link">
          <FontAwesomeIcon 
            icon={['fas', "sign-out-alt"]} 
            size={width <= 960 ? "lg" : "2x"}
          />
        </a>
      </div>
    </div>
  )
}

export default Header;