import React from 'react';

const ContentHeader = ({title, description}) => {
  return (
    <div className="content-header">
      <span className="content-title">{title}</span>
      <span className="content-title-description">{description}</span>
    </div>
  )
}

export default ContentHeader;