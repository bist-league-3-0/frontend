import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Asset from '../../assets/assets-common';
import Hamburger from './hamburger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FrontendRoutes from '../../routes/frontendRoutes';
import BackendRoutes from '../../routes/backendRoutes';
import SocialRoutes from '../../routes/socialRoutes';
import AuthGroups from '../../scenes/authGroup';

const Navigation = (props) => {
  const [state, setState] = useState("inactive");
  const [navigationLink, setNavigationLink] = useState({});
  const [yOffset, setYOffset] = useState(window.pageYOffset);

  const [socialLink, setSocialLink] = useState({
    instagram: {
      state: "idle",
      link: SocialRoutes.instagram,
      text: "instagram"
    },
    linkedin: {
      state: "idle",
      link: SocialRoutes.linkedin,
      text: "linkedin"
    },
    line: {
      state: "idle",
      link: SocialRoutes.line,
      text: "line"
    },
    facebook: {
      state: "idle",
      link: SocialRoutes.facebook,
      text: "facebook"
    },
    twitter: {
      state: "idle",
      link: SocialRoutes.twitter,
      text: "twitter"
    }
  });

  // HAMBURGER TOGGLES
  const handleClick = () => {
    let hamburger = document.querySelector(".hamburger");
    let navside = document.querySelector(".navigation-aside");

    if (state === "inactive") {
      setState("active");
      hamburger.classList.add("active");
      navside.style.right = "0%";
    }

    if (state === "active") {
      setState("inactive");
      hamburger.classList.remove("active");
      navside.style.right = "100%";
    }
  }

  const handleChildClick = (e) => {
    e.target.parentElement.click();
  }
  // END OF HAMBURGER TOGGLES

  // NAVIGATION EVENT HANDLER (SHARED BETWEEN SOCIAL LINKS AND NAV LINKS)
  const handleMouseOver = async (e) => {

    let navLinkTemp = navigationLink;
    let socialLinkTemp = socialLink;

    let navLinkKeys = Object.keys(navLinkTemp);
    let socialLinkKeys = Object.keys(socialLinkTemp);

    for (let key of navLinkKeys) {
      navLinkTemp[key].state = "not-hover";

      if (key === e.target.id) {
        navLinkTemp[key].state = "hover";
      }
    }

    for (let key of socialLinkKeys) {
      socialLinkTemp[key].state = "not-hover";

      if (key === e.target.id) {
        socialLinkTemp[key].state = "hover";
      }
    }

    setNavigationLink(prevState => ({...prevState}));
    setSocialLink(prevState => ({...prevState}));
  }

  const handleMouseOut = () => {

    let navLinkTemp = navigationLink;
    let socialLinkTemp = socialLink;
    let navLinkKeys = Object.keys(navLinkTemp);
    let socialLinkKeys = Object.keys(socialLinkTemp);
    
    for (let key of navLinkKeys) {
      navLinkTemp[key].state = "idle";
    }

    for (let key of socialLinkKeys) {
      socialLinkTemp[key].state = "idle";
    }

    setNavigationLink(prevState => ({...prevState}));
    setSocialLink(prevState => ({...prevState}));
  }
  // END OF NAVIGATION EVENT HANDLER

  // SOCIAL LINKS RENDER
  let socialLinks = Object.values(socialLink).map(value => {
    if (props.width >= 960) {
      return (
        <a 
          className="footer-link"
          key={value.text}
          id={value.text}
          href={value.link} 
          state={value.state}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value.text}
        </a>
      );
    } else {
      if (props.width >= 540) {
        return (
          <a 
            className="footer-link"
            key={value.text}
            id={value.text}
            href={value.link} 
            state={value.state}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', value.text]} size="2x"/>
          </a>
        )
      } else {
        return (
          <a 
            className="footer-link"
            key={value.text}
            id={value.text}
            href={value.link} 
            state={value.state}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', value.text]} size="lg"/>
          </a>
        )
      }
    }  
  });
  // END OF SOCIAL LINKS RENDER

  // BODY LINKS RENDER
  let bodyLinks = Object.values(navigationLink).map( (value, key) => {
    if ( value.text === "logout") { 
      return (
        <a 
          className="body-link"
          key={key}
          id={value.text} 
          state={value.state}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
          href={BackendRoutes.logout}
        >
          {value.text}
        </a>
      );
    } else {
      return (
        <NavLink to={value.link} key={value.text}>
          <span 
            className="body-link"
            id={value.text} 
            state={value.state}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
            key={key}
          >
          {value.text}
          </span>
        </NavLink>
      );
    }
  })
  // END OF BODY LINKS RENDER

// TRY SET ROLE STATE 
  useEffect(() => {
    if (AuthGroups.authGroup.includes(props?.user?.role)){
      setNavigationLink({
        home: {
          state: "idle",
          link: FrontendRoutes.home,
          text: "home"
        },
        dashboard: {
          state: "idle",
          link: FrontendRoutes.dashboard,
          text: "dashboard"
        },
        competition: {
          state: "idle",
          link: FrontendRoutes.competition,
          text: "competition"
        },
        BISTalks: {
          state: "idle",
          link: FrontendRoutes.BISTalks,
          text: "BISTalks"
        },
        "Hear Us Out Challenge": {
          state: "idle",
          link: FrontendRoutes.challenges,
          text: "Hear Us Out Challenge"
        },
        webinar: {
          state: "idle",
          link: FrontendRoutes.webinar,
          text: "webinar"
        },
        logout: {
          state: "idle",
          link: FrontendRoutes.logout,
          text: "logout"
        }
      });
    } else {
      setNavigationLink({
        home: {
          state: "idle",
          link: FrontendRoutes.home,
          text: "home"
        },
        competition: {
          state: "idle",
          link: FrontendRoutes.competition,
          text: "competition"
        },
        BISTalks: {
          state: "idle",
          link: FrontendRoutes.BISTalks,
          text: "BISTalks"
        },
        "Hear Us Out Challenge": {
          state: "idle",
          link: FrontendRoutes.challenges,
          text: "Hear Us Out Challenge"
        },
        webinar: {
          state: "idle",
          link: FrontendRoutes.webinar,
          text: "webinar"
        },
        login: {
          state: "idle",
          link: FrontendRoutes.login,
          text: "login"
        },
        register: {
          state: "idle",
          link: FrontendRoutes.register,
          text: "register"
        }
      });
    }
  }, [props])
// END OF SET ROLE STATE

// Set State of Y Offset
  useEffect(() => {
    window.onscroll = () => {
      setYOffset(window.pageYOffset);
    }
  }, [])

  if (FrontendRoutes.showNav.indexOf(useLocation().pathname) < 0) {
    return null
  }
  
  return(
    <div className="navigation-wrapper">
      <nav className="navigation-header" id="navbar" bg-active={(yOffset > 0 && state === "inactive").toString()}>
        <div className="header-links">
          <div className="header-link">
            <Hamburger handler={{handleClick, handleChildClick}}/>
          </div>
          <div className="header-link">
            <p>{state === "active" ? "Back" : "Menu"}</p>
          </div>
        </div>
        <NavLink to={FrontendRoutes.home}>
          <img src={Asset.LogoBist} alt="BistLogo"/>
        </NavLink>
      </nav>
      <aside className="navigation-aside">
        <div className="aside-body">
          <div className="body-links">
            {bodyLinks}
          </div>
          <div className="body-asset medium-only">
            <img src={Asset.NavAsset} alt="BistLogo"/>
          </div>
        </div>
        <div className="aside-footer">
          <div className="footer-links">
            {socialLinks}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Navigation;