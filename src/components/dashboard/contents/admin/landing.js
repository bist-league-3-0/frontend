import React, { useState, useEffect } from 'react';
import DashboardComponent from '../components/components-common';
import Axios from 'axios';
import BackendRoutes from '../../../../routes/backendRoutes';

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
                <span className="card-value">{Object.values(dashboardData).reduce((total, num) => {return total + num})}</span>
              </div>
            </div>
          </div>
          
          <div className="card-row">
            <div className="card-style-block block-white">
              <div className="card-body">
                <span className="card-key">Not Paid</span>
                <span className="card-value">{dashboardData?.teamNotPaid}</span>
              </div>
              <span className="card-link">Get Unpaid Teams</span>
            </div>
            <div className="card-style-block block-white">
              <div className="card-body">
                <span className="card-key">Paid, Not Verified</span>
                <span className="card-value">{dashboardData?.teamPaidNotVerified}</span>
              </div>
              <span className="card-link">Get Unverified Teams</span>
            </div>
            <div className="card-style-block block-white">
              <div className="card-body">
                <span className="card-key">Paid and Verified</span>
                <span className="card-value">{dashboardData?.teamPaidVerified}</span>
              </div>
              <span className="card-link">Get Verified Teams</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboardContent;