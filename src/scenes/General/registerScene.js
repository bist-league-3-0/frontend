import React, { useState, useEffect } from "react";
import axios from "axios";
import BackendRoutes from "../../routes/backendRoutes";
import { NavLink } from "react-router-dom";
import FrontendRoutes from "../../routes/frontendRoutes";
import Component from "../../components/components-common";

const RegisterScene = (props) => {
  const [teamname, setTeamname] = useState();
  const [institution, setInstitution] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [leadername, setLeadername] = useState();
  const [gender, setGender] = useState("Male");
  const [major, setMajor] = useState();
  const [interest, setInterest] = useState();
  const [enrollmentyear, setEnrollmentyear] = useState(2020);
  const [age, setAge] = useState(18);
  const [phone, setPhone] = useState();
  const [line, setLine] = useState();
  const [linkedin, setLinkedin] = useState("http://linkedin.com/in/");

  const [verdict, setVerdict] = useState({status: "", message:""});

  const onRegister = async (event) => {
    event.preventDefault();
    let endpoint = BackendRoutes.register;

    await axios
      .post(endpoint, {teamname, leadername, email, password, phone, line, institution, major, gender, interest, enrollmentyear, age, linkedin}, {withCredentials: true})
      .then((res) => {
        setVerdict({
          status: "success",
          message: res.data.message
        })
        window.location.replace(FrontendRoutes.login);
        return;
      })
      .catch((e) => {
        setVerdict({
          status: "error",
          message: e.response.data.message
        });
        return;
      })
  }

  useEffect(
    () => {
      axios.get(BackendRoutes.checkAuth, {withCredentials: true})
        .then((res) => {if (res.data) {window.location.replace("/")}});
    }, []
  )

  return (
    <div className="register-scene">
      <Component.BISTHelmet title="Register"/>
      <div className="register-form-container">
        <form onSubmit={onRegister} className="form">
          <span className="form-title">Create Team Account</span>
          <div className="input-body">

            <div className="input-group">
              <span className="input-heading">
                Team Account
              </span>
              <hr/>
            </div>
            
            <div className="input-group">
              <label htmlFor="teamname" className="input-label">Team Name</label>
              <span className="input-text">
                Team names that contain any offense towards a certain ethnicity, religion, or race are strictly prohibited.
              </span>
              <input type="text" name="teamname" id="teamname" required defaultValue={teamname}
                onChange={(event) => {
                  setTeamname(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="institution" className="input-label">Institution</label>
              <span className="input-text">
                Please write your institution / school name without abbreviating its name and please write it in official name, ex: Institut Teknologi Bandung, not Bandung Institute of Technology
              </span>
              <input type="text" name="institution" id="institution" required defaultValue={institution}
                onChange={(event) => {
                  setInstitution(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <span className="input-text">
                Please fill this with your team leader email.
              </span>
              <input type="email" name="email" id="email" required defaultValue={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <span className="input-text">
                This password is for team account login. Password length should be 10 characters or more.
              </span>
              <input type="password" name="password" id="password" required defaultValue={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <span className="input-heading">
                Leader Info
              </span>
              <hr/>
            </div>

            <div className="input-group">
              <label htmlFor="leadername" className="input-label">Leader Name</label>
              <span className="input-text">
                Insert your full name here.
              </span>
              <input type="text" name="leadername" id="leadername" required defaultValue={leadername}
                onChange={(event) => {
                  setLeadername(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Gender</label>
              <div className="input-radio-wrapper">
                <div className="input-radio">
                  <input type="radio" name="gender" id="male" value="Male" defaultChecked/>
                  <label htmlFor="male" 
                    onClick={() => setGender("Male")}
                    >
                    <span className="radio-button"></span>
                    <span className="radio-description">Male</span>
                  </label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="gender" id="female" value="Female"/>
                  <label htmlFor="female"
                    onClick={() => setGender("Female")}
                  >
                    <span className="radio-button"></span>
                    <span className="radio-description">Female</span>
                  </label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="gender" id="other" value="Prefer not to say"/>
                  <label htmlFor="other"
                    onClick={() => setGender("Prefer not to say")}
                  >
                    <span className="radio-button"></span>
                    <span className="radio-description">Prefer not to say</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="major" className="input-label">Major</label>
              <span className="input-text">
                Please write your major without abbreviating its name and please write it in official name, ex: Teknik Informatika, not IT / IF
              </span>
              <input type="text" name="major" id="major" required defaultValue={major}
                onChange={(event) => {
                  setMajor(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="interest" className="input-label">Interests in Information Technology</label>
              <span className="input-text">
                Please write down your interests in information technology field, i.e. information security, artificial intelligence, UI/UX, etc.
              </span>
              <input type="text" name="interest" id="interest" required defaultValue={interest}
                onChange={(event) => {
                  setInterest(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="enrollment" className="input-label">Year Of Enrollment</label>
              <span className="input-text">
                Please enter the year you got admitted at your current institution.
              </span>
              <input type="number" name="enrollment" id="enrollment" min="2012" max="2020" required defaultValue={enrollmentyear}
                onChange={(event) => {
                  setEnrollmentyear(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="age" className="input-label">Age</label>
              <span className="input-text">
                Please insert your current age.
              </span>
              <input type="number" name="age" id="age" min="0" max="100" defaultValue="18" required
                onChange={(event) => {
                  setAge(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone" className="input-label">Phone Number</label>
              <span className="input-text">
                (Optional) Please fill this with your active number.
              </span>
              <input type="text" name="phone" id="phone" defaultValue={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="line" className="input-label">Line ID</label>
              <span className="input-text">
                (Optional) If you have a LINE Account, please insert your LINE account here
              </span>
              <input type="text" name="line" id="line" defaultValue={line}
                onChange={(event) => {
                  setLine(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="linkedin" className="input-label">LinkedIn</label>
              <span className="input-text">
                (Optional) Please enter a link to your LinkedIn profile, example: http://linkedin.com/in/linkedinyourname
              </span>
              <input type="text" name="linkedin" id="linkedin" defaultValue="http://linkedin.com/in/"
                onChange={(event) => {
                  setLinkedin(event.target.value);
                }}
              />
            </div>

            <div className="flash-message" status={verdict.status}>
              {verdict.message}
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