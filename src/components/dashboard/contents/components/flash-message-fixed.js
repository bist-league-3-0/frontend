import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FlashMessageFixed = ({verdict, setVerdict, flashMessageTime, setFlashMessageTime}) => {

// FLASH MESSAGE TIMER WITH USE EFFECT
  useEffect(() => {
    const timeout = flashMessageTime > 0 && setTimeout(() => setFlashMessageTime(flashMessageTime - 10), 10);
    if (flashMessageTime <= 0) setVerdict({status: "", message: ""});

    return () => clearTimeout(timeout);
  }, [flashMessageTime]);

// CLOSE FLASH MESSAGE FUNCTION
  const closeFlashMessage = () => {
    setVerdict({message: "", status: ""});
    setFlashMessageTime(0);
  }

  return (
    <div className="flash-message fixed" status={verdict.status} onClick={closeFlashMessage}>
      <div className="flash-message-body">
        <span className="flash-message-text">
          {verdict.message}
        </span>
        <FontAwesomeIcon icon={["fas", "times-circle"]} className="button-close" size="lg"/>
      </div>
      <div className="progress-bar" style={{width: `${flashMessageTime / 20}%`}}/>
    </div>
  )
}

export default FlashMessageFixed;