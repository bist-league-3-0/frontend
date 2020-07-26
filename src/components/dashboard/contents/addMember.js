import React, { useState } from "react";
import axios from "axios";
import BackendRoutes from "../../../routes/backendRoutes";

const AddTeamMember = ({user, refresh}) => {
  const [memberName, setMemberName] = useState("");
  const [gender, setGender] = useState("Male");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");
  const [enrollmentyear, setEnrollmentyear] = useState(2020);
  const [age, setAge] = useState(18);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [line, setLine] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [verdict, setVerdict] = useState({message: "", status: ""})

  const submitAddMember = (e) => {
    e.preventDefault();
    setVerdict({message: "Please wait.", status: "info"})
    axios.post(
      BackendRoutes.auth,
      {email: user?.account?.email},
      {withCredentials: true}
    )
    .then(
      (res) => {
        return axios.post(
          BackendRoutes.bistAccount.addMember,
          {
            teamID: user?.teamAccount?.teamID,
            memberName,
            gender,
            major,
            interest,
            enrollmentyear,
            age,
            phone,
            line,
            linkedin,
            email
          },
          {
            withCredentials: true,
            headers: {
              "Authorization" : `Bearer ${res.data.accessToken}`
            }
          }
        )
      }
    )
    .then (
      (res) => {
        console.log(res.data);
        setVerdict({message: res.data.message, status: res.data.success ? "success" : "error"});
        refresh();
      }
    )
    .catch(
      (e) => {
        console.log(e.response.data.message);
        setVerdict({message: e.response.data.message, status: "error"})
      }
    )
  }

  return (
    <div className="card-container">
      <div className="card-row">
        <div className="card">
          <form className="form" onSubmit={submitAddMember}>
            <div className="input-body">
              <div className="input-group">
                <span className="input-heading boxsizing-default">
                  Add New Member
                </span>
              </div>

              <div className="input-group">
                <label htmlFor="name" className="input-label">Full Name</label>
                <span className="input-text">
                  Insert your full name here.
                </span>
                <input type="text" name="name" id="name" required 
                  onChange={e => setMemberName(e.target.value)}
                  defaultValue={memberName}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Gender</label>
                <div className="input-radio-wrapper">
                  <div className="input-radio">
                    <input type="radio" name="gender" id="male" value="Male"
                      defaultChecked={gender === "Male"}
                    />
                    <label htmlFor="male" 
                      onClick={() => setGender("Male")}
                      >
                      <span className="radio-button"></span>
                      <span className="radio-description">Male</span>
                    </label>
                  </div>
                  <div className="input-radio">
                    <input type="radio" name="gender" id="female" value="Female"
                      defaultChecked={gender === "Female"}
                    />
                    <label htmlFor="female"
                      onClick={() => setGender("Female")}
                    >
                      <span className="radio-button"></span>
                      <span className="radio-description">Female</span>
                    </label>
                  </div>
                  <div className="input-radio">
                    <input type="radio" name="gender" id="other" value="Prefer not to say"
                      defaultChecked={gender === "Prefer not to say"}
                    />
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
                <input type="text" name="major" id="major" required
                  onChange={e => setMajor(e.target.value)}
                  defaultValue={major}
                />
              </div>

              <div className="input-group">
                <label htmlFor="interest" className="input-label">Interests in Information Technology</label>
                <span className="input-text">
                  Please write down your interests in information technology field, i.e. information security, artificial intelligence, UI/UX, etc.
                </span>
                <input type="text" name="interest" id="interest" required
                  onChange={e => setInterest(e.target.value)}
                  defaultValue={interest}
                />
              </div>

              <div className="input-group">
                <label htmlFor="enrollment" className="input-label">Year Of Enrollment</label>
                <span className="input-text">
                  Please enter the year you got admitted at your current institution.
                </span>
                <input type="number" name="enrollment" id="enrollment" min="2012" max="2020" required
                  onChange={e => setEnrollmentyear(e.target.value)}
                  defaultValue={enrollmentyear}
                />
              </div>

              <div className="input-group">
                <label htmlFor="age" className="input-label">Age</label>
                <span className="input-text">
                  Please insert your current age.
                </span>
                <input type="number" name="age" id="age" min="0" max="100" required
                  onChange={e => setAge(e.target.value)}
                  defaultValue={age}
                />
              </div>

              <div className="input-group">
                <label htmlFor="email" className="input-label">Email</label>
                <input type="email" name="email" id="email" 
                  onChange={e => setEmail(e.target.value)}
                  defaultValue={email}
                />
              </div>

              <div className="input-group">
                <label htmlFor="phone" className="input-label">Phone Number</label>
                <span className="input-text">
                  (Optional) Please fill this with your active number.
                </span>
                <input type="text" name="phone" id="phone" 
                  onChange={e => setPhone(e.target.value)}
                  defaultValue={phone}
                />
              </div>

              <div className="input-group">
                <label htmlFor="line" className="input-label">Line ID</label>
                <span className="input-text">
                  (Optional) If you have a LINE Account, please insert your LINE account here
                </span>
                <input type="text" name="line" id="line"
                  onChange={e => setLine(e.target.value)}
                  defaultValue={line}
                />
              </div>

              <div className="input-group">
                <label htmlFor="linkedin" className="input-label">LinkedIn</label>
                <span className="input-text">
                  (Optional) Please enter a link to your LinkedIn profile, example: http://linkedin.com/in/linkedinyourname
                </span>
                <input type="text" name="linkedin" id="linkedin" defaultValue="http://linkedin.com/in/"
                  onChange={e => setLinkedin(e.target.value)}
                />
              </div>

            </div>
            <div className="input-footer">
              <input
                  type="submit"
                  value="ADD MEMBER"
                  className="button-primary-filled"
                />
            </div>
            <div className="flash-message" status={verdict.status}>
              {verdict.message}
            </div>
          </form>
        </div>
        <div className="card medium-only boxsizing-default"/>
      </div>
    </div>
  )
}

export default AddTeamMember;