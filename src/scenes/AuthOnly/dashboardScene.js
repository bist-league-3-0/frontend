import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import FrontendRoutes from "../../routes/frontendRoutes";
import Component from "./../../components/components-common";
import axios from "axios";
import BackendRoutes from "../../routes/backendRoutes";
import AuthGroups from "../authGroup";

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
    let { email, id, role } = props.user;
    axios
      .post(BackendRoutes.getUser, { email, id, role }, { 
        withCredentials: true,
      })
      .then(({data}) => 
        setUserObject(data)
      );
  }

  useEffect(() => {
    if (AuthGroups.authGroup.includes(props?.user?.role)) {
      refreshUserUpdate();
    }
  }, [props?.user?.role])
  
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

          {
            AuthGroups.participantGroup.includes(props?.user?.role)
            ? <Component.Dashboard.ParticipantSidebar state={state} handleClick={handleClick} role={userObject?.account?.roleID}/>
            : null
          }

          {
            AuthGroups.adminGroup.includes(props?.user?.role)
            ? <Component.AdminDashboard.Sidebar state={state} handleClick={handleClick} role={userObject?.account?.roleID}/>
            : null
          }

          <div className="dashboard-content">
            <Switch>
              <Route exact path={FrontendRoutes.dashboard}>
                <Component.BISTHelmet title="Dashboard"/>
                {
                  AuthGroups.adminGroup.includes(props?.user?.role)
                  ? <Component.AdminDashboard.Landing user={userObject}/>
                  : <Component.Dashboard.Landing user={userObject}/>
                }
              </Route>
              <Route path={dashRoutes.settings}>
                <Component.BISTHelmet title="Settings"/>
                <Component.Dashboard.Setting user={userObject} refresh={refreshUserUpdate}/>
              </Route>

              {/* Participant Routes */}
              {
                AuthGroups.participantGroup.includes(props?.user?.role)
                ? <Route path={dashRoutes.teamManagement}>
                    <Component.BISTHelmet title="Team Management"/>
                    <Component.Dashboard.TeamManagement user={userObject} refresh={refreshUserUpdate}/>
                  </Route>
                : null
              }
              {
                AuthGroups.participantGroup.includes(props?.user?.role)
                ? <Route path={dashRoutes.memberManagement}>
                    <Component.BISTHelmet title="Member Management"/>
                    <Component.Dashboard.MemberManagement user={userObject} refresh={refreshUserUpdate}/>
                  </Route>
                : null
              }
              {
                AuthGroups.participantGroup.includes(props?.user?.role)
                ? <Route path={dashRoutes.prelimFileSubmission}>
                    <Component.BISTHelmet title="Preliminary File Submission"/>
                    <Component.Dashboard.PreliminarySubmission user={userObject} refresh={refreshUserUpdate}/>
                  </Route>
                : null
              }
              {
                AuthGroups.finalGroup.includes(props?.user?.role)
                ?<Route path={dashRoutes.finalFileSubmission}>
                    <Component.BISTHelmet title="Final File Submission"/>
                    <Component.Dashboard.FinalSubmission user={userObject} refresh={refreshUserUpdate}/>
                  </Route>
                : null
              }

              {/* Admin Routes */}
              {
                
              }
              <Route>
                <Redirect to={FrontendRoutes.dashboard}/>
              </Route>
            </Switch>
          </div>

        </div>
    </div>
  );
}

export default Dashboard;