import React, { useEffect } from 'react';
import Component from '../../components/components-common'

const LandingScene = (props) => {
  useEffect(
    () => {
      document.title = "Welcome to BIST League 3.0!";
    }, []
  )

  return(
    <div>
      <Component.Navigation width={props.width}/>
    </div>
  )
}

export default LandingScene;