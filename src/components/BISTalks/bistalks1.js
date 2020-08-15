import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../routes/frontendRoutes';
import Asset from '../../assets/assets-common';

const BISTalks1Component = ({width, height}) => {
  return (
    <div className="BISTalks-info">
      <div className="info-body">
        <div className="info-card">
          <div className="card-content">
            <div className="card-text">
              <div className="info-header">
                <div className="info-title">
                  Business Case Hack
                </div>
                <div className="info-subtitle">
                  Saturday, Aug 15 2020&ensp;|&ensp;07.00pm (GMT +7)
                </div>
              </div>
              <div className="text-title">
                Bryan Aptana W.
              </div>
              <div className="text-subtext">
                National 2nd Winner of Unilever Future Leaders’ League<br/>
                National Best Paper at the 10th PPM Business Case Competition<br/>
                National Champion of COMPFEST XI Business-IT Case Competition<br/>  
              </div>
            </div>
            <div className="card-text">
              <div className="text-subtitle">
                Talk Subtopics
              </div>
              <div className="text-subtext">
                <ol>
                  <li>Parameters of good business solution</li>
                  <li>Common mistakes</li>
                  <li>Googling keywords to search data</li>
                  <li>Frameworks</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="card-image-container">
            <img src={Asset.BISTalksSpeaker1} alt="" className="card-image"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BISTalks1Component;