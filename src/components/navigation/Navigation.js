import React, { useState } from 'react';
import Asset from '../../assets/assets-common';
import FrontendRoutes from '../../routes/frontendRoutes';
import Hamburger from './_hamburger';

const Navigation = (props) => {
  const [state, setState] = useState("inactive");
  const [navbarLink, setNavbarLink] = useState({
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

  const handleMouseOver = async (e) => {
    let temp = navbarLink;
    for (let link in temp) {
      temp[link].state = "not-hover";
    }

    temp[e.target.id].state = "hover";

    setNavbarLink(prevState => ({
      home: { ...prevState.home },
      login: { ...prevState.login },
      register: { ...prevState.register }
    }))
  }

  const handleMouseOut = (e) => {
    setNavbarLink(prevState => ({
      home: { ...prevState.home, state:"idle" },
      login: { ...prevState.login, state:"idle" },
      register: { ...prevState.register, state:"idle" }
    }))
  }

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
            Object.values(navbarLink).map((value) => {
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

      </aside>
    </div>
  )
}

export default Navigation;