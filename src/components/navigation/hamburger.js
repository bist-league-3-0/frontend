import React from 'react';

const Hamburger = (props) => {

  return (
    <div className="hamburger" onClick={props.handler.handleClick}>
      <div className="line line1" onClick={props.handler.handleChildClick}></div>
      <div className="line line2" onClick={props.handler.handleChildClick}></div>
    </div>
  )
}

export default Hamburger;