import React, { useState } from 'react';
import Asset from '../../assets/assets-common';
import FrontendRoutes from '../../routes/frontendRoutes';
import Hamburger from './_hamburger';

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
    }
  });

  const [socialLink, setSocialLink] = useState({
    instagram: {
      state: "idle",
      link: "/",
      text: "instagram"
    },
    email: {
      state: "idle",
      link: "/",
      text: "email"
    },
    line: {
      state: "idle",
      link: "/",
      text: "line"
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
      register: { ...prevState.register }
    }))

    setSocialLink(prevState => ({
      instagram: {...prevState.instagram},
      email: {...prevState.email},
      line: { ...prevState.line }
    }))
  }

  const handleMouseOut = (e) => {
    setNavigationLink(prevState => ({
      home: { ...prevState.home, state:"idle" },
      login: { ...prevState.login, state:"idle" },
      register: { ...prevState.register, state:"idle" }
    }))

    setSocialLink(prevState => ({
      instagram: {...prevState.instagram, state:"idle" },
      email: {...prevState.email, state:"idle" },
      line: { ...prevState.line, state:"idle" }
    }))
  }
  // END OF NAVIGATION EVENT HANDLER

  return(
    <div className="navigation-wrapper">
      <nav className="navigation-header">
        <div className="header-links">
          <div className="header-link">
            <Hamburger handler={{handleClick, handleChildClick}}/>
          </div>
          <div className="header-link medium-only">
            <p>{state === "active" ? "Back" : "Menu"}</p>
          </div>
        </div>
        {/* <div className="navbar-links">
          { 
            Object.values(navigationLink).map((value) => {
              return (
                <a 
                  key={value.text}
                  id={value.text}
                  href={value.link} 
                  state={value.state}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {value.text}
                </a>
              )
            })
          }          
        </div> */}
        <img src={Asset.LogoBist} alt="BistLogo"/>
      </nav>
      <aside className="navigation-aside">
        <div className="aside-body">
          <div className="body-links">
            {
              Object.values(navigationLink).map( value => {
                return (
                  <a 
                    className="body-link"
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
              })
            }
          </div>
          <div className="body-asset medium-only">
            <img src={Asset.NavAsset} alt="BistLogo"/>
          </div>
        </div>
        <div className="aside-footer">
          <div className="footer-links">
            {
              Object.values(socialLink).map(value => {
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
              })
            }
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Navigation;