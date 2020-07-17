// Import Essential Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
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
    fetchData().then((res) => {
      let temp = Object.values(res);
      temp = temp.pop();
      setUser(typeof temp != "undefined" ? temp : defaultUserState);
    });
  }, []);

  const authRoutes = () => {
    return (
      <Route path="/dashboard">
        <div>Hello World</div>
      </Route>
    )
  }

  return (
    <div>
      <Router>
        <Component.Navigation width={width} user={user} isAuth={isAuth()}/>
        <Switch>
          <Route exact path="/">
            <div>HELLO WORLD</div>
          </Route>
          <Route path={FrontendRoutes.login}>
            <Scene.LoginScene width={width} user={user}/>
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
          {authRoutes}
          <Route>
            <Scene.ErrorScene code="404"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
