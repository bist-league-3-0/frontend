// Import Essential Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from "react-router-dom";
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
// End of Common Files

// App Class Declaration
const App = () => {

  // APP Logics
  const isAuth = () => {
    return user.role >= 2 && user.role <= 4;
  }
  // End of App Logics

  const defaultUserState = { id: 0, email: "", role: 1 };
  const [width, setWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(defaultUserState);

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  const fetchData = async () => {
    let res = await axios.get(BackendRoutes.check, { withCredentials: true });

    if (typeof res.data.passport != "undefined") {
      return res.data.passport;
    } else {
      return {};
    }
  };

  useEffect(() => {
    fetchData()
      .then(res => {
        let temp = Object.values(res);
        temp = temp.pop();
        return typeof temp != "undefined" ? temp : defaultUserState;
      })
      .then(temp => {
        setUser(temp);
      })
  }, []);

  return (
    <div>
      <Router>
        <Component.Navigation width={width} user={user}/>
        <Switch>
          {/* General Routes */}
          <Route exact path={FrontendRoutes.home}>
            <div>
              <img src="https://storage.cloud.google.com/bist-account-files/PAYMENT_49.jpg" alt=""/>
            </div>
          </Route>
          <Route path={FrontendRoutes.login}>
            <Scene.LoginScene user={user}/>
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
          {isAuth() 
            ? <Scene.Dashboard user={user} width={width}/> 
            : <Redirect to={FrontendRoutes.login}/>
          }
          </Route> 

          {/* Error routes */}
          <Route path={FrontendRoutes.forbidden}>
            <Scene.ErrorScene code="403"/>
          </Route>
          <Route>
            <Scene.ErrorScene code="404"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
