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

  const refreshUserUpdate = () => {
    let { id } = props.user;
    axios
      .post(BackendRoutes.getUser, { id }, { 
        withCredentials: true,
      })
      .then(({data}) => 
        setUserObject(data)
      );
  }

  useEffect(() => {
    let role = props?.user?.role;
    if (role === 2) {
      refreshUserUpdate()
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
                <Component.BISTHelmet title="Dashboard"/>
                <Component.Dashboard.Landing user={userObject}/>
              </Route>
              <Route path={dashRoutes.teamManagement}>
                <Component.BISTHelmet title="Team Management"/>
                <Component.Dashboard.TeamManagement user={userObject} refresh={refreshUserUpdate}/>
              </Route>
              <Route path={dashRoutes.memberManagement}>
                <Component.BISTHelmet title="Member Management"/>
                <Component.Dashboard.MemberManagement user={userObject} refresh={refreshUserUpdate}/>
              </Route>
              <Route path={dashRoutes.prelimFileSubmission}>
                <Component.BISTHelmet title="Preliminary File Submission"/>
                <Component.Dashboard.PreliminarySubmission user={userObject} refresh={refreshUserUpdate}/>
              </Route>
              <Route path={dashRoutes.finalFileSubmission}>
                <Component.BISTHelmet title="Final File Submission"/>
                <Component.Dashboard.FinalSubmission user={userObject} refresh={refreshUserUpdate}/>
              </Route>
              <Route path={dashRoutes.settings}>
                <Component.BISTHelmet title="Settings"/>
                <Component.Dashboard.Setting user={userObject} refresh={refreshUserUpdate}/>
              </Route>
            </Switch>
          </div>

        </div>
    </div>
  );
}

export default Dashboard;