import React from 'react';
import Component from '../../components/components-common';
import Asset from '../../assets/assets-common';
import SocialRoutes from '../../routes/socialRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LandingScene = ({width, height}) => {
  return(
    <section className="landing-scene">
      <section className="landing-hero">
        <div/>
        <div className="hero-title">
          <img className="hero-asset" src={Asset.LandingHeroAsset} alt=""/>
          <span className="hero-title-text">BIST League 3.0</span>
          <span className="hero-title-subtext">Business-IT Case Competition</span>
          <div className="hero-title-links">
            <a href="https://bit.ly/CompetitionGuidebook" className="title-link button-primary-washed-filled" target="_blank" rel="noopener noreferrer">
              Guidebook
            </a>
            <a href="https://forms.gle/nMQw2R9RcD9J2NcD9" className="title-link button-primary-filled color-white" target="_blank" rel="noopener noreferrer">
              Early Registration
            </a>
          </div>
        </div>
        <div className="hero-links">
          <div className="bist-links">
            <a href={SocialRoutes.instagram} className="bist-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "instagram"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
            <a href={SocialRoutes.linkedin} className="bist-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "linkedin"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
            <a href={SocialRoutes.line} className="bist-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "line"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
            <a href={SocialRoutes.facebook} className="bist-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "facebook"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
            <a href={SocialRoutes.twitter} className="bist-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "twitter"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
          </div>
        </div>
      </section>

      <section className="landing-scroller">
        <div className="scroller-arrow">
          <img src={Asset.ScrollerArrow} alt="" onClick={(e) => {window.scrollTo({top: height, behavior:"smooth"})}}/>
        </div>
      </section>

      <section className="landing-theme">
        <div className="theme-text">
          <span className="text-title">
            Achieving Business Sustainability Through Holistic Approach of Information Security
          </span>
          <span className="text-subtitle">
            Business Information System and Technology (BIST) League 3.0 is a national-level competition that is present and meant for participants to hone and prove their problem-solving abilities in business and technology problems.
          </span>
        </div>
        <div className="theme-image-wrapper">
          <img className="theme-image" src={Asset.LandingThemeAsset} alt=""/>
        </div>
      </section>
    </section>
  )
}

export default LandingScene;