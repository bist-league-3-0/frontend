import React from "react";
import Asset from "../assets/assets-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialRoutes from "../routes/socialRoutes";

const BISTFooter = ({width}) => {
  return (
    <section className="bist-footer">
      <div className="footer-body">
        <div className="footer-social">
          <h1>Social Media</h1>
          <div className="social-links">
            <a href={SocialRoutes.instagram} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "instagram"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
            <a href={SocialRoutes.linkedin} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "linkedin"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
            <a href={SocialRoutes.line} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "line"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
            <a href={SocialRoutes.facebook} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "facebook"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
            <a href={SocialRoutes.twitter} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', "twitter"]} size={width > 960 ? "2x" : "lg"}/>
            </a>
          </div>
        </div>
        <div className="footer-contacts">
          <h1>Contacts</h1>
          <div className="contact-list">
            <span className="contact-title">Competition</span>
            <span className="contact-name">Jingga</span>
            <div className="contact-content">
              <p>0896-2563-3431</p>
              <p>LINE: jingga115</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-foot">
        <div className="footer-logos">
          <img src={Asset.STI_LOGO} alt="" id="sti-logo"/>
          <img src={Asset.LogoBist} alt="" id="bist-logo"/>
          <img src={Asset.STEI_LOGO} alt="" id="stei-logo"/>
        </div>
        <div className="footer-text">
          <p>BIST League 3.0 is an annual event presented by Information System and Technology, School of Electrical Engineering and Informatics, Institut Teknologi Bandung</p>
          <p><b>&copy; 2020 BIST League 3.0, All Rights Reserved.</b></p>
        </div>
      </div>
    </section>
  )
}

export default BISTFooter;