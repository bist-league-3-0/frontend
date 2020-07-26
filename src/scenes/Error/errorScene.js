import React from 'react';
import Component from '../../components/components-common';

const ErrorScene = (props) => {

  const errorExplaination = () => {
    if (props.code === "404") {
      return "Error Not Found";
    } 
    else if (props.code === "403") {
      return "Forbidden";
    }

    return "Whoops, Unexpected Error!";
  }

  const errorDescription = () => {
    if (props.code === "404") {
      return (
        <p className="error-description">
          That means your requested page is not found. <br/>
          Maybe you are trying to fiddle our URL path?
        </p>
      );
    }
    else if (props.code === "403") {
      return (
        <span className="error-description">
          That means you are not authenticated yet. <br/>
          Try login to BIST League Team Account first!
        </span>
      );
    }
    else {
      return(
        <span className="error-description">
          Congratulations you have found this page!
          Send this to BIST League Developer
        </span>
      )
    }
  }

  return (
    <div className="error-scene">
      <Component.BISTHelmet title={props.code}/>
      <div className="error-header">
        <h1 className="error-code">
          {props.code}
        </h1>
        <h3 className="error-explaination">
          {errorExplaination()}
        </h3>
      </div>
      <div className="error-body">
        {errorDescription()}
      </div>
    </div>
  );
}

export default ErrorScene;