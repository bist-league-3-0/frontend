import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FrontendRoutes from '../../../../../routes/frontendRoutes';
import DashboardComponent from '../../components/components-common';

const AdminPaymentComponent = ({user}) => {
  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Payment" 
        description={user?.account?.username} 
      />
      <hr/>
      <div className="content-body">
        <div className="table">
          <div className="table-header table-row">
            <div className="table-cell cell-grow-1">No</div>
            <div className="table-cell cell-grow-11">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi possimus officiis eaque beatae repudiandae rem alias aspernatur quod amet quibusdam blanditiis odio accusantium tempore vero tempora eum aliquid, sint similique!</div>
            <div className="table-cell cell-grow-11">No</div>
          </div>
          <div className="table-body table-row">
            <div className="table-cell cell-grow-1">No</div>
            <div className="table-cell cell-grow-11">No</div>
            <div className="table-cell cell-grow-11">No</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPaymentComponent

{/* <div className="card-container">
          <div className="card-row">
            <div className="card-style-block block-white">Hello world</div>
          </div>
        </div>
        <Switch>
          <Route exact path={FrontendRoutes.adminRoutes.payment}>
            Hello, Payment Here!
          </Route>
          <Route path={FrontendRoutes.adminRoutes.paymentUnpaid}>
            Unpaid
          </Route>
          <Route path={FrontendRoutes.adminRoutes.paymentUnverified}>
            Unverified
          </Route>
          <Route path={FrontendRoutes.adminRoutes.paymentVerified}>
            Verified
          </Route>
        </Switch> */}