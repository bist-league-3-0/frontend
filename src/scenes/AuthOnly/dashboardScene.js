import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import FrontendRoutes from "../../routes/frontendRoutes";
import Component from "./../../components/components-common";
import axios from "axios";
import BackendRoutes from "../../routes/backendRoutes";

const Dashboard = (props) => {
  const { dashRoutes } = FrontendRoutes;
  const [state, setState] = useState("inactive");
  const [userObject, setUserObject] = useState({});

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

  useEffect(() => {
    let { id, role } = props.user;
    if (role === 2) {
      axios
      .post(BackendRoutes.getUser, { id }, { 
        withCredentials: true,
      })
      .then(({data}) => 
        setUserObject(data)
      );
    }
  }, [props.user])
  
  return (
    <div className="dashboard-scene">
        <Component.Dashboard.Header width={props.width}/>

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
                <Component.Dashboard.Landing user={userObject}/>
              </Route>
              <Route path={dashRoutes.teamManagement}>
                <Component.Dashboard.TeamManagement user={userObject}/>
              </Route>
              <Route path={dashRoutes.memberManagement}>
                <Component.Dashboard.MemberManagement user={userObject}/>
              </Route>
              <Route path={dashRoutes.prelimFileSubmission}>
                <Component.Dashboard.PreliminarySubmission user={userObject}/>
              </Route>
              <Route path={dashRoutes.finalFileSubmission}>
                <Component.Dashboard.FinalSubmission user={userObject}/>
              </Route>
            </Switch>
          </div>

        </div>
    </div>
  );
}

export default Dashboard;