import React from 'react';
import Asset from '../../../../assets/assets-common';

const NoResultTable = () => {
  return (
    <div className="dashboard-table-noresult">
      <img src={Asset.NavAsset} alt=""/>
      <span className="noresult-title">Nothing to see here.</span>
      <span className="noresult-text">That means there was no result for your request.</span>
    </div>
  )
}

export default NoResultTable;