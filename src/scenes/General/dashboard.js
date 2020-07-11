import React, { useState, useEffect } from 'react';
const BackendRoutes = require("./../../routes/backendRoutes");

const Dashboard = (props) => {
  return (
    <div>
      <div>
        <a href={BackendRoutes.login}>login</a><br/>
        <a href={BackendRoutes.register}>register</a><br/>
        <a href={BackendRoutes.logout}>logout</a>
      </div>
    </div>
  );
}

export default Dashboard;