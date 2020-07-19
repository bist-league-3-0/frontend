import React from 'react';
import DashboardComponent from './components/components-common';

const DashboardContent = (props) => {
  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Dashboard" 
        description="Nama tim Anda" 
      />
      <hr/>
    </div>
  )
}

export default DashboardContent;