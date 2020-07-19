import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarPill = ({ to, text, icon, whenExact, handleClick }) => {
  let match = useRouteMatch({
    path: to,
    exact: whenExact
  })

  return (
    <NavLink to={to} activeClassName={match ? "selected-pill" : ""} >
      <div className="sidebar-pill" onClick={handleClick}>
        <FontAwesomeIcon icon={ icon } size="lg"/>
        &emsp;
        {text}
      </div>
    </NavLink>
  )
}

export default SidebarPill;