import React, { useState } from 'react';
import axios from 'axios';
import BackendRoutes from '../../../../routes/backendRoutes';

const TogglePaymentButton = ({user, paymentStatus, teamID, setVerdict, setFlashMessageTime, fetchData}) => {
  const [requestRunning, setRequestRunning] = useState(false); 

  const buttonString = () => {
    if (paymentStatus === 2) return `Set as Paid, not Verified`
    if (paymentStatus === 1) return `Set as Paid and Verified`
    return `Set as Unpaid`
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
        BackendRoutes.adminAccount.togglePaymentStatus,
        {paymentStatus, teamID},
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
    <a onClick={sendData} disabled={requestRunning}>
      {buttonString()}
    </a>
  )
}

export default TogglePaymentButton