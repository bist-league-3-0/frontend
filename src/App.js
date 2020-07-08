// Import Essential Modules
import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// End of Essential Modules

// Import Styles
// import './css/base.scss';
// End of Styles

// Import Scenes
import {LoginScene, RegisterScene, Dashboard} from "./scenes/common";
// End of Import Scenes

// App Class Declaration
const App = () => {
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
      </Switch>
    </Router>
  );
}

export default App;
