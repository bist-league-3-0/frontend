import React from 'react';
import { Link } from 'react-router-dom'
import Component from '../../components/components-common';
import Asset from '../../assets/assets-common';
import SocialRoutes from '../../routes/socialRoutes';
import FrontendRoutes from '../../routes/frontendRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CompetitionScene = ({width}) => {
    return(
      <section className="competition-scene">
        <Component.BISTHelmet title="Competition"/>
        <section className="competition-container">
          {/* <div className="logo">
            <img src={Asset.LogoBist} alt="BistLogo"/>
          </div> */}
          
          <div className="competition">
              <span className="competition-text">BIST League 3.0 </span>
              <span className="competition-subtext">Business-IT Case Competition</span>
          </div>
          
            
      

          <div className="theme">
            <span className="theme-header">THEME</span>
            <div className="line line1" ></div>
            <span className="theme-text">Achieving Business Sustainability through Holistic Approach of Information Security</span>
            <div className="line line2"></div>
          </div>

          <div className="prize">
            <span className="prize-header">WIN UP TO</span>
            <div className="prize-text">
              <div className="left">
                <div className="line line3"></div>
                <div className="line line3"></div>
                <div className="line line3"></div>
                <div className="line line3"></div>
              </div>
              <span>Rp20.000.000,-</span>
              <div className="right">
                <div className="line line1"></div>
                <div className="line line2"></div>
              </div>
            </div>
          </div>
          
          <div className="requirements">
            <span className="requirements-header">Requirements</span>
            <div className="requitements-text">
              <ul>
                <li>Each team must be registered on www.bistleague.com</li>
                <li>Each team consists of 2-3 members from the same institution</li>
                <li>Participant must be an active full-time undergratudate/diploma student from any major</li>
                <li>Participant may only be registered in one team</li>
              </ul>
            </div>
          </div>

          <div className="timeline">
            <span className="timeline-header">Event Timeline</span>
            <img src={Asset.Timeline} className="image-container"/>
          </div>

          <div className="registration-fee">
            <span className="registration-fee-header">Registration Fee</span>
            <div className="content">
              <div className="left">
                <span>Early Bird Registration</span>
                <span>July 27 - August 10, 2020</span>
                <span>Rp250.000,00</span>
              </div>
              
              <div className="right">
                <span>Normal Registration</span>
                <span>August 11 - September 22, 2020</span>
                <span>Rp300.000,00</span>
              </div>
            </div>
            
          </div>

          <div className="register">
            <span className="register-header">Register Now!</span>
            <Link to="/register/"> Click Here to Register!</Link>
          </div>

          <div className="contact-person">
            <span className="contact-person-header">Contact Person</span>
            <span className="contact-person-text">Jingga</span>
            <span className="contact-person-text">089625633431</span>
            <span className="contact-person-text">jingga115</span>
          </div>

          <div className="guidebook">
            <span className="guidebook-header">Get Our Detailed Information!</span>
            <a className="guidebook-text" href="https://bit.ly/CompetitionGuidebook" target="_blank" rel="noopener noreferrer">Download the Guidebook Here!</a>
            
          </div>

          

          <div className="competition-header">BIST League 3.0</div>
        </section>
       
      </section>
    )
  }
  
  export default CompetitionScene;