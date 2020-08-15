import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../routes/frontendRoutes';
import Asset from '../../assets/assets-common';

const BISTalks2Component = ({width, height}) => {
  return (
    <div className="BISTalks-info">
      <div className="info-body">
        <div className="info-card">
          <div className="card-content">
            <div className="card-text">
              <div className="info-header">
                <div className="info-title">
                  Coming Soon
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

export default BISTalks2Component;