// Import Essential Modules
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// End of Essential Modules

// Import Styles
import './App.css';
// End of Styles

// Import Scenes
import LoginScene from './scenes/Login/loginScene';
import RegisterScene from './scenes/Register/registerScene';
import CheckAuth from './scenes/Login/checkAuth';
// End of Import Scenes

// App Class Declaration
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <a href="/login">login</a><br/>
            <a href="/register">register</a>
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
