import React, { useState } from 'react';
import axios from 'axios';
import Component from '../../components-common';
import BackendRoutes from '../../../routes/backendRoutes';

const MemberConfig = ({user, team, teamMember, refresh}) => {
  const [memberName, setMemberName] = useState(teamMember?.teamMemberName);
  const [gender, setGender] = useState(teamMember?.gender);
  const [major, setMajor] = useState(teamMember?.major);
  const [interest, setInterest] = useState(teamMember?.interest);
  const [enrollmentyear, setEnrollmentyear] = useState(new Date(teamMember?.yearOfEnrollment || "").getFullYear().toString());
  const [age, setAge] = useState(teamMember?.age);
  const [email, setEmail] = useState(teamMember?.email);
  const [phone, setPhone] = useState(teamMember?.phoneNumber);
  const [line, setLine] = useState(teamMember?.lineID);
  const [linkedin, setLinkedin] = useState(teamMember?.linkedin);
  const [password, setPassword] = useState("");
  const [changeVerdict, setChangeVerdict] = useState({message: "", status: ""});
  const [deleteVerdict, setDeleteVerdict] = useState({message: "", status: ""});

  let name = teamMember?.teamMemberName || "";
  let firstName = name.split(" ")[0].toString();

  const submitDeleteMember = (e) => {
    setDeleteVerdict({message: "Please wait.", status: "info"})
    axios.post(
      BackendRoutes.auth,
      {email: user?.account?.email},
      {withCredentials: true}
    )
    .then(
      (res) => {
        return axios.post(
          BackendRoutes.bistAccount.deleteMember,
          {
            accountID: user?.account?.accountID,
            teamID: team?.teamID,
            teamMemberID: teamMember?.teamMemberID,
            password: password
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
        setDeleteVerdict({message: res.data.message, status: res.data.success ? "success" : "error"});
        refresh();
      }
    )
    .catch(
      (e) => {
        setDeleteVerdict({message: e.response.data.message, status: "error"})
      }
    )
  }

  const submitMemberChange = (e) => {
    e.preventDefault();
    setChangeVerdict({message: "Please wait.", status: "info"})
    axios.post(
      BackendRoutes.auth,
      {email: user?.account?.email},
      {withCredentials: true}
    )
    .then(
      (res) => {
        return axios.post(
          BackendRoutes.bistAccount.changeMemberData,
          {
            id: teamMember?.teamMemberID,
            memberName,
            gender,
            major,
            interest,
            enrollmentyear,
            age,
            email,
            phone,
            line,
            linkedin
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
        setChangeVerdict({message: res.data.message, status: res.data.success ? "success" : "error"});
        refresh();
      }
    )
    .catch(
      (e) => {
        setChangeVerdict({message: e.response.data.message, status: "error"})
      }
    )
  }

  const renderDeleteMember = () => {
    if (team?.leaderID !== teamMember?.teamMemberID) {
      return (
        <div className="card-row">
          <div className="card">
            <form className="form" onSubmit={submitDeleteMember}>

              <div className="input-body">
                <div className="input-group">
                  <span className="input-heading boxsizing-default">
                    DELETE THIS MEMBER
                  </span>
                  <span className="input-text">
                    Be careful when using this function, we will ask your team account password to delete this member permanently. You cannot delete your team leader.
                  </span>
                  <hr/>
                </div>

                <div className="input-group">
                  <label htmlFor="password" className="input-label">Password</label>
                  <input type="password" name="password" id="password" required
                    onChange={e => setPassword(e.target.value)} 
                  />
                </div>
              </div>

              <div className="input-footer">
                <input
                  type="submit"
                  value="DELETE MEMBER"
                  className="button-primary-filled"
                />
              </div>
              <div className="flash-message" status={deleteVerdict.status}>
                {deleteVerdict.message}
              </div>
            </form>
          </div>
          <div className="card medium-only boxsizing-default"/>
        </div>
      )
    }

    return null;
  } 

  return (
    <div className="card-container">

      <div className="card-row">
        <div className="card">
          <form className="form" onSubmit={submitMemberChange}> 
            <div className="input-body">
              <div className="input-group">
                <span className="input-heading boxsizing-default">
                  Change {firstName}'s Data
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
                <input type="number" name="enrollment" id="enrollment" min="2012" max="2020" defaultValue="2020" required
                  onChange={e => setEnrollmentyear(e.target.value)}
                  defaultValue={enrollmentyear}
                />
              </div>

              <div className="input-group">
                <label htmlFor="age" className="input-label">Age</label>
                <span className="input-text">
                  Please insert your current age.
                </span>
                <input type="number" name="age" id="age" min="0" max="100" defaultValue="18" required
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
                <input type="text" name="linkedin" id="linkedin"
                  onChange={e => setLinkedin(e.target.value)}
                  defaultValue={linkedin}
                />
              </div>

            </div>
            <div className="input-footer">
              <input
                  type="submit"
                  value="CHANGE MEMBER DATA"
                  className="button-primary-filled"
                />
            </div>

            <div className="flash-message" status={changeVerdict.status}>
              {changeVerdict.message}
            </div>
          </form>
        </div>
        
        <div className="card boxsizing-default">
          <div className="card">
            <form className="form" id="component-upload-enrollment">
              <div className="input-body">
                <div className="input-group">
                  <span className="input-heading boxsizing-default">
                    Proof of Enrollment
                  </span>
                </div>
                <div className="input-group">
                  <span className="input-text">
                    Please drop your file(s) below (Supported Files: .png, .jpg, .jpeg, and .gif)
                  </span>
                  <Component.DropZone 
                    validTypes={["image/jpeg", "image/png"]}
                    buttonText="UPLOAD PROOF OF ENROLLMENT"
                    postURL={BackendRoutes.uploadFile.payment}
                    idName="component-upload-enrollment"
                    filesLimit="1"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="card">
            <form className="form" id="component-upload-studentid">
              <div className="input-body">
                <div className="input-group">
                  <span className="input-heading boxsizing-default">
                    Student ID Card
                  </span>
                </div>
                <div className="input-group">
                  <span className="input-text">
                    Please drop your file(s) below (Supported Files: .png, .jpg, .jpeg, and .gif)
                  </span>
                  <Component.DropZone 
                    validTypes={["image/jpeg", "image/png"]}
                    buttonText="UPLOAD STUDENT ID CARD"
                    postURL={BackendRoutes.uploadFile.payment}
                    idName="component-upload-studentid"
                    filesLimit="1"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="card">
            <form className="form" id="component-upload-portrait">
              <div className="input-body">
                <div className="input-group">
                  <span className="input-heading boxsizing-default">
                    Member 3x4 Portrait Photo
                  </span>
                </div>
                <div className="input-group">
                  <span className="input-text">
                    Please drop your file(s) below (Supported Files: .png, .jpg, .jpeg, and .gif)
                  </span>
                  <Component.DropZone 
                    validTypes={["image/jpeg", "image/png"]}
                    buttonText="UPLOAD PORTRAIT PHOTO"
                    postURL={BackendRoutes.uploadFile.payment}
                    idName="component-upload-portrait"
                    filesLimit="1"
                  />
                </div>
              </div>
            </form>
          </div>
          
        </div>
      </div>

      {renderDeleteMember()}

    </div>
  )
}

export default MemberConfig;