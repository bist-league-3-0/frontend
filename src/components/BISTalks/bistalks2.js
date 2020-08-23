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
                  The Importance of Security Engineer in Digital Transformation
                </div>
                <div className="info-subtitle">
                  Saturday, September 5, 2020&ensp;|&ensp;07.00pm (GMT +7)
                </div>
              </div>
              <div className="text-title">
                Achmad Fahrurrozi M.
              </div>
              <div className="text-subtext">
                Security Engineer of Bukalapak  
              </div>
            </div>
            <div className="card-text">
              <div className="text-subtitle">
                Talk Description
              </div>
              <div className="text-subtext">
                Information security awareness tries to comprehend and upgrade human hazard practices, convictions, and recognitions about information and information security while likewise understanding and improving authoritative culture as a countermeasure to quickly developing dangers.
              </div>
            </div>
          </div>
          <div className="card-image-container">
            <img src={Asset.BISTalksSpeaker2} alt="" className="card-image"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BISTalks2Component;