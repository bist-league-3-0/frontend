import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import FrontendRoutes from "../../routes/frontendRoutes";
import BackendRoutes from "../../routes/backendRoutes";
import Asset from "../../assets/assets-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Component from "./../../components/components-common";

const Dashboard = (props) => {
  let { dashRoutes } = FrontendRoutes;
  const [state, setState] = useState("inactive");

  const handleClick = () => {
    let hamburger = document.querySelector(".hamburger");
    if (state === "active") {
      hamburger.classList.remove("active");
      setState("inactive");
    } else {
      hamburger.classList.add("active");
      setState("active");
    }
  }

  const handleChildClick = (e) => {
    e.target.parentElement.click();
  }
  
  return (
    <div className="dashboard-scene">
        <Component.Dashboard.Header/>

        <div className="dashboard-body">
          <div className="hamburger-wrapper">
            <Component.Hamburger handler={{handleClick, handleChildClick}}/>
            <div className="hamburger-text">
              {state === "inactive" ? "Open Navigation" : "Exit Navigation"}
            </div>
          </div>
          <Component.Dashboard.Sidebar state={state} handleClick={handleClick}/> 

          <div className="dashboard-content">
            <Switch>
              <Route exact path={FrontendRoutes.dashboard}>
                <Component.Dashboard.Landing/>
              </Route>
              <Route path={dashRoutes.teamManagement}>
                <Component.Dashboard.TeamManagement/>
              </Route>
              <Route path={dashRoutes.memberManagement}>
                <Component.Dashboard.MemberManagement/>
              </Route>
              <Route path={dashRoutes.prelimFileSubmission}>
                <Component.Dashboard.PreliminarySubmission/>
              </Route>
              <Route path={dashRoutes.finalFileSubmission}>
                <Component.Dashboard.FinalSubmission/>
              </Route>
            </Switch>
          </div>

        </div>
    </div>
  );
}

export default Dashboard;