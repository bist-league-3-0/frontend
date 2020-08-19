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
                <h2>
                  Post-Pandemic Enterprise Information Security
                </h2>
                <div className="info-subtitle">
                  Webinar time, speaker, and registration link is yet to be determined.
                </div>
              </div>
            </div>
          </div>
          <div className="card-image-container">
            <img src={Asset.NavAsset} alt="" className="card-image"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Webinar1Component;