import React, { useState, useEffect } from 'react';
import DashboardComponent from '../components/components-common';
import Axios from 'axios';
import BackendRoutes from '../../../../routes/backendRoutes';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../../../routes/frontendRoutes';

const AdminDashboardContent = ({user}) => {
  const [dashboardData, setDashboardData] = useState({x: 0});

  useEffect(() => {
    Axios.get(
      BackendRoutes.adminAccount.getDashboardData,
      {withCredentials: true}
    )
    .then(({data}) => setDashboardData(data))
    .catch((err) => console.log(err.response.data))
  }, []);

  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Dashboard" 
        description={user?.account?.username} 
      />
      <hr/>
      <div className="content-body">
        <div className="card-container">

          <div className="card-row">
            <div className="card-style-block">
              <div className="card-body">
                <span className="card-key">Team Count</span>
                <span className="card-value">{Object.values(dashboardData).reduce((total, num) => {return total + num}) / 2}</span>
              </div>
            </div>
          </div>
          
          <div className="card-row">
            <div className="card-style-block block-white">
              <div className="card-body">
                <span className="card-key">Not Paid</span>
                <span className="card-value">{dashboardData?.teamNotPaid}</span>
              </div>
              <NavLink to={FrontendRoutes.adminRoutes.paymentUnpaid} className="card-link">Get Unpaid Teams</NavLink>
            </div>
            <div className="card-style-block block-white">
              <div className="card-body">
                <span className="card-key">Paid, Not Verified</span>
                <span className="card-value">{dashboardData?.teamPaidNotVerified}</span>
              </div>
              <NavLink to={FrontendRoutes.adminRoutes.paymentUnverified} className="card-link">Get Unverified Teams</NavLink>
            </div>
            <div className="card-style-block block-white">
              <div className="card-body">
                <span className="card-key">Paid and Verified</span>
                <span className="card-value">{dashboardData?.teamPaidVerified}</span>
              </div>
              <NavLink to={FrontendRoutes.adminRoutes.paymentVerified} className="card-link">Get Verified Teams</NavLink>
            </div>
          </div>
          <div className="card-row">
            <div className="card-style-block block-white">
              <div className="card-body">
                <span className="card-key">Preliminary Teams</span>
                <span className="card-value">{dashboardData?.teamPreliminary}</span>
              </div>
              <NavLink to={FrontendRoutes.adminRoutes.prelimTeams} className="card-link">Get Preliminaries</NavLink>
            </div>
            <div className="card-style-block block-white">
              <div className="card-body">
                <span className="card-key">Finalists</span>
                <span className="card-value">{dashboardData?.teamFinals}</span>
              </div>
              <NavLink to={FrontendRoutes.adminRoutes.finalTeams} className="card-link">Get Finalists</NavLink>
            </div>
            <div className="card-style-block block-white medium-only"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardContent;