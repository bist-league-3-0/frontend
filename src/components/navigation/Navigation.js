import React, { useState } from 'react';
import Asset from '../../assets/assets-common';
import FrontendRoutes from '../../routes/frontendRoutes';
import SocialRoutes from '../../routes/socialRoutes';
import Hamburger from './_hamburger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BackendRoutes from '../../routes/backendRoutes';

const Navigation = (props) => {
  const [state, setState] = useState("inactive");
  const [navigationLink, setNavigationLink] = useState({
    home: {
      state: "idle",
      link: FrontendRoutes.home,
      text: "home"
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
    },
    logout: {
      state: "idle",
      link: BackendRoutes.logout,
      text: "logout"
    }
  });

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
  const handleClick = (e) => {
    if (state === "inactive") {
      setState("active");
      e.target.classList.add("active");
      document.querySelector(".navigation-aside").style.right = "0%";
    }

    if (state === "active") {
      setState("inactive");
      e.target.classList.remove("active");
      document.querySelector(".navigation-aside").style.right = "100%";
    }
  }

  const handleChildClick = (e) => {
    e.target.parentElement.click();
  }
  // END OF HAMBURGER TOGGLES

  // NAVIGATION EVENT HANDLER (SHARED BETWEEN SOCIAL LINKS AND NAV LINKS)
  const handleMouseOver = async (e) => {
    let temp = {...navigationLink, ...socialLink};
    for (let link in temp) {
      temp[link].state = "not-hover";
    }

    temp[e.target.id].state = "hover";

    setNavigationLink(prevState => ({
      home: { ...prevState.home },
      login: { ...prevState.login },
      register: { ...prevState.register },
      logout: { ...prevState.logout }
    }))

    setSocialLink(prevState => ({
      instagram: {...prevState.instagram},
      linkedin: {...prevState.linkedin},
      line: {...prevState.line},
      facebook: {...prevState.facebook},
      twitter: { ...prevState.twitter }
    }))
  }

  const handleMouseOut = (e) => {
    setNavigationLink(prevState => ({
      home: { ...prevState.home, state:"idle" },
      login: { ...prevState.login, state:"idle" },
      register: { ...prevState.register, state:"idle" },
      logout: { ...prevState.logout, state:"idle" }
    }))

    setSocialLink(prevState => ({
      instagram: {...prevState.instagram, state:"idle" },
      linkedin: {...prevState.linkedin, state:"idle" },
      line: {...prevState.line, state:"idle" },
      facebook: {...prevState.facebook, state:"idle" },
      twitter: { ...prevState.twitter, state:"idle" }
    }))
  }
  // END OF NAVIGATION EVENT HANDLER

  // SCROLL EVENT HANDLER
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
  // END OF SCROLL EVENT

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
    return (
      <a 
        className="body-link"
        key={value.text}
        id={value.text}
        href={value.link} 
        state={value.state}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseDown={handleClick}
      >
        {value.text}
      </a>
    );
  })

  // END OF BODY LINKS RENDER

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