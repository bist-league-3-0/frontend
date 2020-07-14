import React, { useState, useEffect } from "react";
import axios from "axios";
import BackendRoutes from "../../routes/backendRoutes";
import { NavLink } from "react-router-dom";
import FrontendRoutes from "../../routes/frontendRoutes";

const RegisterScene = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [line, setLine] = useState("");
  const [institution, setInstitution] = useState("");
  const [major, setMajor] = useState("");
  const [gender, setGender] = useState("");
  const [verdict, setVerdict] = useState({status: "", message:""});

  const checkFormInput = () => {
    // Check Password Length
    if (password.length < 10) {
      setVerdict({status: "error", message:"Your password should be of minimum 10 characters or more"})
      return false;
    }

    return true;
  }

  const onRegister = (event) => {
    event.preeventDefault();
    let endpoint = BackendRoutes.register;

    if (checkFormInput()) {
      console.log("Error")
      // await axios
      // .post(endpoint, {username, email, password, phone, line, institution, major, gender}, {withCredentials: true})
      // .then(() => {
      //   setVerdict({
      //     status: "success", 
      //     message: "Successfully Logged In, Please Wait"
      //   });
      //   window.location.replace("/");
      //   return;
      // })
      // .catch(err => {
      //   setVerdict({
      //     status: "error", 
      //     message: err.response.data.message
      //   });
      //   return;
      // })
    }
  }

  useEffect(
    () => {
      document.title = "Register | BIST League 3.0";

      axios.get(BackendRoutes.checkAuth, {withCredentials: true})
        .then((res) => {if (res.data) {window.location.replace("/")}});
    }, []
  )

  return (
    <div className="register-scene">
      <div className="register-form-container">

        <form onSubmit={onRegister} className="form">
          <div className="flash-message" status={verdict.status}>
            {verdict.mesage}
          </div>
          <span className="form-title">Create Team Account</span>
          <div className="input-body">

            <div className="input-group">
              <label htmlFor="username" className="input-label">Team Name</label>
              <input type="text" name="username" id="username" 
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input type="email" name="email" id="email" 
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input type="password" name="password" id="password" 
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone-number" className="input-label">Phone Number</label>
              <span className="input-text">
                Please fill this with your active number.
              </span>
              <input type="text" name="phone-number" id="phone-number"
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="line-id" className="input-label">Line ID</label>
              <span className="input-text">
                If you have a LINE Account, please insert your LINE account here
              </span>
              <input type="text" name="line-id" id="line-id"
                onChange={(event) => {
                  setLine(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="institution" className="input-label">Institution</label>
              <span className="input-text">
                Please write your institution / school name without abbreviating its name and please write it in official name, ex: Institut Teknologi Bandung, not Bandung Institute of Technology
              </span>
              <input type="text" name="institution" id="institution" 
                onChange={(event) => {
                  setInstitution(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="major" className="input-label">Major</label>
              <input type="text" name="major" id="major" 
                onChange={(event) => {
                  setMajor(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Gender</label>
              <div className="input-radio-wrapper">
                <div className="input-radio">
                  <input type="radio" name="gender" id="male" />
                  <label htmlFor="male" 
                    onClick={() => setGender("Male")}
                    >
                    <span className="radio-button"></span>
                    <span className="radio-description">Male</span>
                  </label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="gender" id="female"/>
                  <label htmlFor="female"
                    onClick={() => setGender("Female")}
                  >
                    <span className="radio-button"></span>
                    <span className="radio-description">Female</span>
                  </label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="gender" id="other"/>
                  <label htmlFor="other"
                    onClick={() => setGender("Prefer not to say")}
                  >
                    <span className="radio-button"></span>
                    <span className="radio-description">Prefer not to say</span>
                  </label>
                </div>
              </div>
            </div>

          </div>
          <div className="input-footer">
            <input type="submit" value="REGISTER" className="button-primary-filled"/>
            <div className="input-text">
              <NavLink to={FrontendRoutes.login}>
                Already have an account?
              </NavLink>
            </div>
          </div>
        </form>
      </div>
      <div className="register-asset medium-only"/>
    </div>
  )
}

export default RegisterScene;

// return (
//   <div>
//     <h1>Register Form</h1>
//     <form action="http://localhost:9000/api/bistleague3/auth/register" method="post">
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input type="email" name="email" id="email"/>
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input type="password" name="password" id="password"/>
//         </div>
//         {/* <div>
//             <label htmlFor="password">Verify Password:</label>
//             <input type="password" name="password" id="password"/>
//         </div> */}
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input type="username" name="username" id="username"/>
//         </div>
//         <input type="submit" value="register"/>
//     </form>
//   </div>
// );