import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Component from '../../components-common';
import BackendRoutes from '../../../routes/backendRoutes';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../../routes/frontendRoutes';

const MemberConfig = ({user, team, teamMember, refresh, setVerdict, setFlashMessageTime}) => {
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
  const [requestRunning, setRequestRunning] = useState(false);
  const [studentIDFile, setStudentIDFile] = useState({});
  const [hideStudentIDFileDropzone, setHideStudentIDFileDropzone] = useState(false);
  const [enrollmentFile, setEnrollmentFile] = useState({});
  const [hideEnrollmentFileDropzone, setHideEnrollmentFileDropzone] = useState(false);
  const [portraitFile, setPortraitFile] = useState({});
  const [hidePortraitFileDropzone, setHidePortraitFileDropzone] = useState(false);

// PUSH OBJECT HELPER FUNCTION
  const pushObject = (object, name, value) => {
    try {
      return value ? object[name] = value : null;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }

// GET FILE OBJECT HELPER FUNCTION
  const getFileObject = (fileObject, condition) => {
    try {
      return fileObject?.filter(file => {return file?.fileID === condition}).pop();
    } catch (e) {
      console.log(e.message);
      return null
    }
  }

// USE EFFECT FOR SET FILE AS A STATE (EXPERIMENTAL)
  useEffect(() => {
    let tempPortraitFiles = {}
    pushObject(tempPortraitFiles, "Portrait File", getFileObject(user?.file, teamMember?.photoPortrait));
    setPortraitFile(tempPortraitFiles);
    if (Object.entries(tempPortraitFiles).length !== 0) {
      setHidePortraitFileDropzone(true);
    }

    let tempStudentIDFiles = {};
    pushObject(tempStudentIDFiles, "Student ID Card File", getFileObject(user?.file, teamMember?.studentIDFile));
    setStudentIDFile(tempStudentIDFiles);
    if (Object.entries(tempStudentIDFiles).length !== 0) {
      setHideStudentIDFileDropzone(true);
    }

    let tempEnrollmentFiles = {};
    pushObject(tempEnrollmentFiles, "Proof of Enrollment File", getFileObject(user?.file, teamMember?.proofOfEnrollment));
    setEnrollmentFile(tempEnrollmentFiles);
    if (Object.entries(tempEnrollmentFiles).length !== 0) {
      setHideEnrollmentFileDropzone(true);
    }
  }, [user]);

  const renderPortraitString = () => {
    return Object.entries(portraitFile).map((file, index) => {
      return (
        <span className="input-text" key={index}>
          Your file: <a href={`${file[1]?.filename}?ignoreCache=1`} target="_blank" rel="noopener noreferrer">{file[0]}</a>
        </span>
      )
    });
  }

  const renderIDCardString = () => {
    return Object.entries(studentIDFile).map((file, index) => {
      return (
        <span className="input-text" key={index}>
          Your file: <a href={`${file[1]?.filename}?ignoreCache=1`} target="_blank" rel="noopener noreferrer">{file[0]}</a>
        </span>
      )
    });
  }

  const renderEnrollmentString = () => {
    return Object.entries(enrollmentFile).map((file, index) => {
      return (
        <span className="input-text" key={index}>
          Your file: <a href={`${file[1]?.filename}?ignoreCache=1`} target="_blank" rel="noopener noreferrer">{file[0]}</a>
        </span>
      )
    });
  }

// FIRST NAME STRING
  let name = teamMember?.teamMemberName || "";
  let firstName = name.split(" ")[0].toString();

// ON SUBMIT DELETE MEMBER
  const submitDeleteMember = (e) => {
    e.preventDefault();
    setVerdict({message: "Please wait.", status: "info"});
    setFlashMessageTime(2000);

    if (requestRunning) {
      return;
    }

    setRequestRunning(true);

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
        setVerdict({message: res.data.message, status: res.data.success ? "success" : "error"});
        setFlashMessageTime(2000);
        refresh();
        setRequestRunning(false);
        return <NavLink to={FrontendRoutes.dashRoutes.memberManagement}/>
      }
    )
    .catch(
      (e) => {
        setVerdict({message: e.response.data.message, status: "error"});
        setFlashMessageTime(2000);
        refresh();
        setRequestRunning(false);
      }
    )
  }

// ON SUBMIT CHANGE MEMBER
  const submitMemberChange = (e) => {
    e.preventDefault();

    setVerdict({message: "Please wait.", status: "info"});
    setFlashMessageTime(2000);

    if (requestRunning) {
      return;
    }

    setRequestRunning(true);

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
        setVerdict({message: res.data.message, status: res.data.success ? "success" : "error"});
        setFlashMessageTime(2000);
        refresh();
        setRequestRunning(false);
      }
    )
    .catch(
      (e) => {
        setVerdict({message: e.response.data.message, status: "error"});
        setFlashMessageTime(2000);
        refresh();
        setRequestRunning(false);
      }
    )
  }

// RENDER DELETE MEMBER
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
                  disabled={requestRunning}
                />
              </div>
            </form>
          </div>
          <div className="card medium-only boxsizing-default"/>
        </div>
      )
    }

    return null;
  } 

// RENDER COMPONENT
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
                  disabled={requestRunning}
                />
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
                  {renderEnrollmentString()}
                </div>
                {
                  hideEnrollmentFileDropzone
                  ? <div className="input-group">
                      <button className="button-primary-filled" onClick={e => {e.preventDefault(); setHideEnrollmentFileDropzone(false)}}>
                        REPLACE PROOF OF ENROLLMENT FILE
                      </button>
                    </div>
                  : <div className="input-group">
                      <span className="input-text">
                        Please drop your file(s) below (Supported Files: .png, .jpg, and .jpeg; max: 8MB)
                      </span>
                      <Component.DropZone 
                        validTypes={["image/jpeg", "image/png"]}
                        buttonText="UPLOAD PROOF OF ENROLLMENT"
                        postURL={BackendRoutes.bistAccount.uploadEnrollment}
                        idName="component-upload-enrollment"
                        user={user}
                        refresh={refresh}
                        context="ENROLLMENT"
                        filesLimit="1"
                        memberID={teamMember?.teamMemberID}
                        setVerdict={setVerdict}
                        setFlashMessageTime={setFlashMessageTime}
                        setHideDropzone={setHideEnrollmentFileDropzone}
                      />
                    </div>
                }
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
                  {renderIDCardString()}
                </div>
                {
                  hideStudentIDFileDropzone
                  ? <div className="input-group">
                      <button className="button-primary-filled" onClick={e => {e.preventDefault(); setHideStudentIDFileDropzone(false)}}>
                        REPLACE STUDENT ID CARD FILE
                      </button>
                    </div>
                  : <div className="input-group">
                      <span className="input-text">
                        Please drop your file(s) below (Supported Files: .png, .jpg, and .jpeg; max: 8MB)
                      </span>
                      <Component.DropZone 
                        validTypes={["image/jpeg", "image/png"]}
                        buttonText="UPLOAD STUDENT ID CARD"
                        postURL={BackendRoutes.bistAccount.uploadIDCard}
                        idName="component-upload-studentid"
                        user={user}
                        refresh={refresh}
                        context="ID_CARD"
                        filesLimit="1"
                        memberID={teamMember?.teamMemberID}
                        setVerdict={setVerdict}
                        setFlashMessageTime={setFlashMessageTime}
                        setHideDropzone={setHideStudentIDFileDropzone}
                      />
                    </div>
                }
              </div>
            </form>
          </div>

          <div className="card">
            <form className="form" id="component-upload-portrait">
              <div className="input-body">
                <div className="input-group">
                  <span className="input-heading boxsizing-default">
                    Member 4x3 Portrait Photo
                  </span>
                  {renderPortraitString()}
                </div>
                {
                  hidePortraitFileDropzone
                  ? <div className="input-group">
                      <button className="button-primary-filled" onClick={e => {e.preventDefault(); setHidePortraitFileDropzone(false)}}>
                        REPLACE STUDENT ID CARD FILE
                      </button>
                    </div>
                  : <div className="input-group">
                      <span className="input-text">
                        Please drop your file(s) below (Supported Files: .png, .jpg, and .jpeg; max: 8MB)
                      </span>
                      <Component.DropZone 
                        validTypes={["image/jpeg", "image/png"]}
                        buttonText="UPLOAD PORTRAIT PHOTO"
                        postURL={BackendRoutes.bistAccount.uploadPortrait}
                        idName="component-upload-portrait"
                        user={user}
                        refresh={refresh}
                        context="PORTRAIT_PHOTO"
                        filesLimit="1"
                        memberID={teamMember?.teamMemberID}
                        setVerdict={setVerdict}
                        setFlashMessageTime={setFlashMessageTime}
                        setHideDropzone={setHidePortraitFileDropzone}
                      />
                    </div>
                }
                
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