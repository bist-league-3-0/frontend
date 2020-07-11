// Import Essential Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import BackendRoutes from "./routes/backendRoutes";
// End of Essential Modules

// Import Styles
// import './css/base.scss';
// End of Styles

// Import Scenes
import {LoginScene, RegisterScene, Dashboard} from "./scenes/common";
// End of Import Scenes


// App Class Declaration
const App = () => {
  const defaultUserState = {id: 0, email: "", role : 1}
  const [width, setWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(defaultUserState);

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  const fetchData = async () => {
    let res = await axios
      .get(BackendRoutes.check, {withCredentials: true});

    if (typeof res.data.passport != "undefined") {
      return res.data.passport;
    } else {
      return {}
    }
  }

  useEffect(
    () => {
      fetchData()
        .then(res => {
          let temp = Object.values(res);
          temp = temp.pop();
          setUser(typeof temp != "undefined" ? temp : defaultUserState)
        });
    }, []
  )

  return (
    <div>
      ID:{user.id}, Email:{user.email}, Role:{user.role}
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard width={width}/>
          </Route>
          <Route path="/login">
            <LoginScene/>
          </Route>
          <Route path="/register">
            <RegisterScene/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
