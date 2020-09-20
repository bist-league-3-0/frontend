// Import Essential Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import BackendRoutes from "./routes/backendRoutes";
import FrontendRoutes from "./routes/frontendRoutes";
// End of Essential Modules

// Import Styles
import "./css/base.scss";
import "./css/main.scss";
// End of Styles

// Import Common Files
import * as Scene from "./scenes/scene-common";
import Component from './components/components-common';
import AuthGroups from "./scenes/authGroup";
import ScrollToTop from "./components/scroll-to-top";
// End of Common Files

// App Class Declaration
const App = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [user, setUser] = useState({ id: 0, email: "", role: 1 });

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  useEffect(() => {
    axios.get(BackendRoutes.check, { withCredentials: true })
    .then (({data}) => {
      if (data?.passport?.user) {
        setUser(data?.passport?.user);
      }
    })
    .catch (e => {
      console.log("Cannot reach backend server...");
    })
  }, []);

  return (
    <div>
      <Router>
        <ScrollToTop/>
        <Component.Navigation width={width} height={height} user={user}/>
        <Switch>
          {/* General Routes */}
          <Route exact path={FrontendRoutes.home}>
            <Component.BISTHelmet title="Landing"/>
            <Scene.LandingScene width={width} height={height}/>
            <Component.BISTFooter width={width} height={height}/>
          </Route>
          <Route path={FrontendRoutes.competition}>
            <Component.BISTHelmet title="Competition"/>
            <Scene.CompetitionScene width={width} height={height}/>
            <Component.BISTFooter width={width} height={height}/>
          </Route>
          <Route path={FrontendRoutes.login}>
            <Scene.LoginScene user={user}/>
          </Route>
          <Route path={FrontendRoutes.BISTalks}>
            <Component.BISTHelmet title="BISTalks"/>
            <Switch>
              <Route exact path={FrontendRoutes.BISTalks1}>
                <Scene.BISTalksScene width={width} height={height} version={1}/>
              </Route>
              <Route path={FrontendRoutes.BISTalks2}>
                <Scene.BISTalksScene width={width} height={height} version={2}/>
              </Route>
              <Route>
                <Scene.BISTalksScene width={width} height={height}/>
              </Route>
            </Switch>
            <Component.BISTFooter width={width} height={height}/>
          </Route>
          <Route path={FrontendRoutes.challenges}>
            <Component.BISTHelmet title="Hear Us Out"/>
            <Scene.ChallengeScene width={width} height={height}/>
            <Component.BISTFooter width={width} height={height}/>
          </Route>
          <Route path={FrontendRoutes.webinar}>
            <Switch>
              <Route exact path={FrontendRoutes.webinar1}>
                <Component.BISTHelmet title="Webinar"/>
                <Scene.WebinarScene width={width} height={height} version={1}/>
                <Component.BISTFooter width={width} height={height}/>
              </Route>
              <Route path={FrontendRoutes.webinar2}>
                <Component.BISTHelmet title="Webinar"/>
                <Scene.WebinarScene width={width} height={height} version={2}/>
                <Component.BISTFooter width={width} height={height}/>
              </Route>
              <Route path={FrontendRoutes.webinarRegistration}>
                <Component.BISTHelmet title="Webinar Registration"/>
                <Scene.WebinarRegistrationScene />
              </Route>
              <Route>
                <Component.BISTHelmet title="Webinar"/>
                <Scene.WebinarScene width={width} height={height}/>
                <Component.BISTFooter width={width} height={height}/>
              </Route>
            </Switch>
          </Route>
          <Route path={FrontendRoutes.register}>
            <Scene.RegisterScene />
          </Route>
          <Route path={FrontendRoutes.forgotPasswordValidate}>
            <Scene.ForgotPasswordValidateScene />
          </Route>
          <Route path={FrontendRoutes.forgotPassword}>
            <Scene.ForgotPasswordScene />
          </Route>

          {/* Auth Routes */}
          <Route path={FrontendRoutes.dashboard}>
            {AuthGroups.authGroup.includes(user?.role)
              ? <Scene.Dashboard user={user} width={width} height={height}/> 
              : <Redirect to={FrontendRoutes.login}/>
            }
          </Route> 

          {/* Error routes */}
          <Route path={FrontendRoutes.forbidden}>
            <Component.BISTHelmet title="403 Forbidden"/>
            <Scene.ErrorScene code="403"/>
          </Route>
          <Route>
          <Component.BISTHelmet title="404 Not Found"/>
            <Scene.ErrorScene code="404"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
