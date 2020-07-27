import React from 'react';
import Component from '../../components/components-common';
import Asset from '../../assets/assets-common';
import SocialRoutes from '../../routes/socialRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LandingScene = ({width}) => {
  return(
    <section className="landing-scene">
      <Component.BISTHelmet title="Landing"/>
      <section className="landing-hero">
        <div/>
        <div className="hero-title">
          <img className="hero-asset" src={Asset.LandingHeroAsset} alt=""/>
          <span className="hero-title-text">BIST League 3.0</span>
          <span className="hero-title-subtext">Business-IT Case Competition</span>
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
          <div className="bist-links ">
            <a href="https://bit.ly/CompetitionGuidebook" className="bist-link other-links" target="_blank" rel="noopener noreferrer">
              Guidebook
            </a>
            <a href="" className="bist-link button-primary-filled color-white other-links" target="_blank" rel="noopener noreferrer">
              Early Registration
            </a>
          </div>
        </div>
      </section>
    </section>
  )
}

export default LandingScene;