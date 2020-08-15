import React from 'react';
import { NavLink } from 'react-router-dom';

const LandingCard = ({width, height, title, subtitle, link, bg_key}) => {

  return (
    <div className="events-card" id={bg_key}>
      <div className="card-text">
        <span className="card-title">{title}</span>
        <span className="card-subtitle">{subtitle}</span>
      </div>
      {
        link
        ? <div className="card-text">
            <NavLink to={link} className="card-link">
              <a>More Details</a>
            </NavLink>
          </div>
        : null
      }
    </div>
  )
}

export default LandingCard;