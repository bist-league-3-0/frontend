import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../routes/frontendRoutes';
import Asset from '../../assets/assets-common';

const Webinar1Component = ({width, height}) => {
  return (
    <div className="webinar-info">
      <div className="info-body">
        <div className="info-card">
          <div className="card-content">
            <div className="card-text">
              <div className="info-header">
                <div className="info-title">
                  States of Art: <br/>
                  AI Technlogy in Cyber Security
                </div>
              </div>
            </div>
            <div className="card-text">
              <div className="text-title">
                John Choi
              </div>
              <div className="text-subtext">
                CEO of MarkAny
              </div>
            </div>
          </div>
          <div className="card-image-container">
            <img src={Asset.WebinarSpeaker1} alt="" className="card-image"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Webinar1Component;