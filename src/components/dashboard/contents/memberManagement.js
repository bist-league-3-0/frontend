import React from 'react';
import DashboardComponent from './components/components-common';

const MemberManagementContent = ({user}) => {
  const renderAddMember = () => {
    if (user?.teamAccount?.teamCount < 3) {
      return (
        <div className="card button-primary">
          Add New Member
        </div>
      )
    }
    
    return null;
  } 

  return (
    <div className="content-wrapper">
      <DashboardComponent.ContentHeader 
        title="Member Management" 
        description={user?.account?.username} 
      />
      <hr/>
      <div className="content-body">
        <div className="card-container">
          <div className="card-row">
            {renderAddMember()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberManagementContent;