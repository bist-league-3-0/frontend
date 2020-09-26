import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../routes/frontendRoutes';
import Asset from '../../assets/assets-common';

const Webinar2Component = ({width, height}) => {
  return (
    <div className="webinar-info">
      <div className="info-body">
        <div className="info-card">
          <div className="card-content">

            <div className="card-text">
              <div className="info-header">
                <div className="info-title">
                  Ethics in Big Data Using Customers' Data
                </div>
              </div>
            </div>

            <div className="card-text">
              <div className="text-title">
                Prasetya Dwicahya
              </div>
              <div className="text-subtext">
                Former Head of Data Science Indonesia<br/>
                Public Sectory Analyst of The World Bank
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

export default Webinar2Component;