import React from 'react';
import { NavLink } from 'react-router-dom';
import Component from '../../components/components-common';
import FrontendRoutes from '../../routes/frontendRoutes';

const RegisterClosedScene = () => {
  return (
    <div className="register-scene" style={{"min-height": "100vh"}}>
      <Component.BISTHelmet title="Register"/>
      <div className="register-form-container">
        <form className="form">
          <span className="form-title">Registration Closed</span>

          <div className="input-footer">
            <NavLink to={FrontendRoutes.login}>
              <div className="button-primary-filled">BACK TO LOGIN</div>
            </NavLink>
          </div>
        </form>
      </div>
      <div className="register-asset medium-only"/>
    </div>
  )
}

export default RegisterClosedScene;