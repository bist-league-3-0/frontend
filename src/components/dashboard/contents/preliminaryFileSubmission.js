import React from 'react';
import DashboardComponent from './components/components-common';

const PreliminaryFileSubmission = () => {
  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Preliminary Submission" 
        description="Nama tim Anda" 
      />
      <hr/>
    </div>
  )
}

export default PreliminaryFileSubmission;