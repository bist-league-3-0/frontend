// Import Essential Modules
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// End of Essential Modules

// Import Styles
import './css/base.scss';
// End of Styles

// Import Scenes
import {LoginScene, RegisterScene, Dashboard, CheckAuth} from "./scenes/common";
// End of Import Scenes

// App Class Declaration
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          <Route path="/login">
            <LoginScene/>
          </Route>
          <Route path="/register">
            <RegisterScene/>
          </Route>
          <Route path="/auth">
            <CheckAuth/>
          </Route>
        </Switch>
      </Router>
    );
  }
}
// End of Class
