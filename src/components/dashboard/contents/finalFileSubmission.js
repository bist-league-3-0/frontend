import React from 'react';
import DashboardComponent from './components/components-common';

const FinalFileSubmission = () => {
  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Final Submission" 
        description="Nama tim Anda" 
      />
      <hr/>
    </div>
  )
}

export default FinalFileSubmission;