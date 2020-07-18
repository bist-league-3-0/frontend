import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Redirect, useRouteMatch, Switch, Route } from "react-router-dom";
import FrontendRoutes from "../../routes/frontendRoutes";
import BackendRoutes from "../../routes/backendRoutes";
import Asset from "../../assets/assets-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Component from "./../../components/components-common";

const Dashboard = (props) => {
  const [view, setView] = useState(<div>Hello World</div>);
  
  let { path, url } = useRouteMatch();
  let { dashRoutes } = FrontendRoutes;
  
  return (
    <div className="dashboard-scene">
        <div className="dashboard-header">
          <img className="dashboard-icon" src={Asset.LogoBistWhite} alt="LogoBistWhite"/>
          <div className="dashboard-links">
            <div className="dashboard-link">
              <FontAwesomeIcon icon={['fas', "user-circle"]} size="2x"/>
            </div>
          </div>
        </div>
        <div className="dashboard-body">
          <Component.Sidebar/> 

          <div className="dashboard-content">
            <Switch>
              <Route exact path={FrontendRoutes.dashboard}>
                Hello World
              </Route>
              <Route path={dashRoutes.teamManagement}>
                Team Management
              </Route>
              <Route path={dashRoutes.memberManagement}>
                Member Management
              </Route>
              <Route path={dashRoutes.prelimFileSubmission}>
                Preliminary File Submission
              </Route>
              <Route path={dashRoutes.finalFileSubmission}>
                Final File Submission
              </Route>
            </Switch>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;