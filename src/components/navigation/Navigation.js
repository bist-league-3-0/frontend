import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Asset from '../../assets/assets-common';
import Hamburger from './_hamburger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FrontendRoutes from '../../routes/frontendRoutes';
import BackendRoutes from '../../routes/backendRoutes';
import SocialRoutes from '../../routes/socialRoutes';

const Navigation = (props) => {
  const [state, setState] = useState("inactive");
  const [navigationLink, setNavigationLink] = useState({});

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
  let bodyLinks = Object.values(navigationLink).map( value => {
    if ( value.text === "logout") { 
      return (
        <a 
          className="body-link"
          key={value.text}
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
            key={value.text}
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
    if (props.isAuth){
      setNavigationLink({
        home: {
          state: "idle",
          link: FrontendRoutes.home,
          text: "home"
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
          state: "active",
          link: FrontendRoutes.home,
          text: "home"
        },
        login: {
          state: "active",
          link: FrontendRoutes.login,
          text: "login"
        },
        register: {
          state: "active",
          link: FrontendRoutes.register,
          text: "register"
        }
      });
    }
  }, [props.user.role])
  // END OF SET ROLE STATE

  if (FrontendRoutes.showNav.indexOf(useLocation().pathname) < 0) {
    return null
  } else {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (state === "inactive") {
        if (prevScrollpos > currentScrollPos) {
          document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-15rem";
        }
        prevScrollpos = currentScrollPos;
      } else {
        window.scrollTo(0, prevScrollpos);
      }
    }
  }
  
  return(
    <div className="navigation-wrapper">
      <nav className="navigation-header" id="navbar">
        <div className="header-links">
          <div className="header-link">
            <Hamburger handler={{handleClick, handleChildClick}}/>
          </div>
          <div className="header-link medium-only">
            <p>{state === "active" ? "Back" : "Menu"}</p>
          </div>
        </div>
        <img src={Asset.LogoBist} alt="BistLogo"/>
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