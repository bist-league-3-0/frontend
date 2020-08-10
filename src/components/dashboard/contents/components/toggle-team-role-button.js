import React, { useState } from 'react';
import axios from 'axios';
import BackendRoutes from '../../../../routes/backendRoutes';

const ToggleTeamRoleButton = ({user, role, accountID, setVerdict, setFlashMessageTime, fetchData}) => {
  const [requestRunning, setRequestRunning] = useState(false); 

  const buttonString = () => {
    if (role === 2) return `Set As Finalist`
    return `Set As Preliminary`
  }

  const sendData = () => {
    if (requestRunning) {
      return
    }

    setRequestRunning(true);
    setVerdict({status:"info", message: "Waiting for Authorization.."});
    setFlashMessageTime(2000);

    axios.post(
      BackendRoutes.auth,
      {email: user?.account?.email},
      {withCredentials: true}
    )
    .then((res) => {
      setVerdict({status:"info", message: "Updating Table.."});
      setFlashMessageTime(2000);
      return axios.post(
        BackendRoutes.adminAccount.toggleTeamRole,
        {role, accountID},
        {
          withCredentials: true,
          headers: {
            "Authorization" : `Bearer ${res.data.accessToken}`
          }
        }
      )
    })
    .then((res) => {
      setRequestRunning(false);
      setVerdict({status:"success", message: res.data.message})
      setFlashMessageTime(2000);
      return fetchData();
    })
    .catch((e) => {
      setRequestRunning(false);
      setVerdict({status:"error", message: `Error: ${e.response.data.message}`})
      setFlashMessageTime(2000);
    })
  }

  return (
    <a onClick={sendData} disabled={requestRunning} className="clickable">
      {buttonString()}
    </a>
  )
}

export default ToggleTeamRoleButton