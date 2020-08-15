import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../routes/frontendRoutes';

const BISTalksScene = ({width, height}) => {
  return (
    <section className="BISTalks-scene">
      <section className="BISTalks-hero">
        <span className="BISTalks-title">
          BISTalks
        </span>
        <NavLink to={FrontendRoutes.register} className="title-link button-primary-filled color-white">
          Registration
        </NavLink>
      </section>
      <section className="BISTalks-body">Hello World</section>
      <section className="BISTalks-footer">Hello World</section>
    </section>
  );
}

export default BISTalksScene;