import React, { useState, useEffect } from "react";
import axios from "axios";
import BackendRoutes from "../../routes/backendRoutes";
import FlashMessageFixed from "../../components/dashboard/contents/components/flash-message-fixed";

const RegisterScene = (props) => {
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [linkedin, setLinkedin] = useState("http://linkedin.com/in/");
  const [question, setQuestion] = useState("Instagram");
  const [questionIsEtc, setQuestionIsEtc] = useState(false);
  const [status, setStatus] = useState(null);
  const [university, setUniversity] = useState(null);
  const [institution, setInstitution] = useState(null);
  const [major, setMajor] = useState(null);
  const [enrollmentYear, setEnrollmentyear] = useState(null);
  const [age, setAge] = useState(18);
  const [interest, setInterest] = useState(null);

  const [verdict, setVerdict] = useState({status: "", message:""});
  const [requestRunning, setRequestRunning] = useState(false);
  const [flashMessageTime, setFlashMessageTime] = useState(0);

  const [submitTextRef, setSubmitTextRef] = useState("WEBINAR REGISTER"); 

  const onRegister = async (event) => {
    event.preventDefault();
    let endpoint = BackendRoutes.webinarRegistration;

    if (requestRunning) {
      return;
    }

    if (status === null) {
      setFlashMessageTime(2000);
      setVerdict({
        status: "error",
        message: "Sorry, we should first determine whether you're a undergraduate student or not."
      });
      setRequestRunning(false);
      return;
    }

    setRequestRunning(true);
    setSubmitTextRef("PLEASE WAIT...");

    await axios
      .post(endpoint, {fullname, email, linkedin, question, status: status ? "Undergraduate Student" : "Non-Undergraduate Student", university, institution, major, enrollmentYear, age, interest}, {withCredentials: true})
      .then((res) => {
        setVerdict({
          status: "success",
          message: "Your Registration Request has been successfully recorded! The registration confirmation will be sent to your email in less than 24 hours"
        });
        setFlashMessageTime(2000);
        setRequestRunning(false);
        setSubmitTextRef("WEBINAR REGISTER");
        return;
      })
      .catch((e) => {
        setVerdict({
          status: "error",
          message: e.response.data
        });
        setFlashMessageTime(2000);
        setRequestRunning(false);
        setSubmitTextRef("WEBINAR REGISTER");
        return;
      })
  }

  const otherStyle = (state) => {
    if (state) {
      return "none"
    }

    return "block"
  }

  const resetStudentFields = () => {
    setUniversity(null);
    setMajor(null);
    setEnrollmentyear(null);
    setInstitution(null);
  }

  const undergraduateStudentFields = () => {
    return (
      <>
        <div className="input-group">
          <label htmlFor="university" className="input-label">University</label>
          <span className="input-text">
            (Required) Please write your undergraduate university name without abbreviating its name and please write it in official name, ex: Institut Teknologi Bandung, not Bandung Institute of Technology
          </span>
          <input type="text" name="university" id="university" required defaultValue={university}
            onChange={(event) => {
              setUniversity(event.target.value);
            }}
          />
        </div>

        <div className="input-group">
          <label htmlFor="major" className="input-label">Major</label>
          <span className="input-text">
            (Required) Please write your major without abbreviating its name and please write it in official name, ex: Teknik Informatika, not IT / IF
          </span>
          <input type="text" name="major" id="major" required defaultValue={major}
            onChange={(event) => {
              setMajor(event.target.value);
            }}
          />
        </div>

        <div className="input-group">
          <label htmlFor="enrollment" className="input-label">Year Of Enrollment</label>
          <span className="input-text">
            (Required) Please enter the year you got admitted at your current institution.
          </span>
          <input type="number" name="enrollment" id="enrollment" min="2010" max="2020" required defaultValue={enrollmentYear}
            onChange={(event) => {
              setEnrollmentyear(event.target.value);
            }}
          />
        </div>
      </>
    )
  }

  const nonUndergraduateStudentFields = () => {
    return (
      <div className="input-group">
        <label htmlFor="institution" className="input-label">Institution</label>
        <span className="input-text">
          (Optional) Please write your institution / school name without abbreviating its name and please write it in official name
        </span>
        <input type="text" name="institution" id="institution" defaultValue={institution}
          onChange={(event) => {
            setInstitution(event.target.value);
          }}
        />
      </div>
    )
  }

  return (
    <div className="register-scene">
      <div className="register-form-container">
        <form onSubmit={onRegister} className="form">
          <span className="form-title">Webinar Registration</span>
          <div className="input-body">

            <div className="input-group">
              <span className="input-heading">
                Registrant Data
              </span>
              <hr/>
            </div>
            
            <div className="input-group">
              <label htmlFor="fullname" className="input-label">Full Name</label>
              <span className="input-text">
                (Required)
              </span>
              <input type="text" name="fullname" id="fullname" required defaultValue={fullname}
                onChange={(event) => {
                  setFullname(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <span className="input-text">
                (Required) Please fill this with your active email. We will sent you an email for further instructions.
              </span>
              <input type="email" name="email" id="email" required defaultValue={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="age" className="input-label">Age</label>
              <span className="input-text">
                (Required) Please insert your current age.
              </span>
              <input type="number" name="age" id="age" min="0" max="100" defaultValue="18" required
                onChange={(event) => {
                  setAge(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="linkedin" className="input-label">LinkedIn</label>
              <span className="input-text">
                (Required) Please enter a link to your LinkedIn profile, example: http://linkedin.com/in/linkedinyourname
              </span>
              <input type="text" name="linkedin" id="linkedin" required defaultValue="http://linkedin.com/in/"
                onChange={(event) => {
                  setLinkedin(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="interest" className="input-label">Interests in Information Technology</label>
              <span className="input-text">
                (Required) Please write down your interests in information technology field, i.e. information security, artificial intelligence, UI/UX, etc.
              </span>
              <input type="text" name="interest" id="interest" required defaultValue={interest}
                onChange={(event) => {
                  setInterest(event.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label className="input-label">How were you first informed about this webinar?</label>
              <span className="input-text">
                (Required)
              </span>
              <div className="input-radio-wrapper">
                <div className="input-radio">
                  <input type="radio" name="question" id="Instagram" value="Instagram" defaultChecked/>
                  <label htmlFor="Instagram" 
                    onClick={() => {
                      setQuestion("Instagram");
                      setQuestionIsEtc(false);
                    }}
                    >
                    <span className="radio-button"></span>
                    <span className="radio-description">Instagram</span>
                  </label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="question" id="LINE" value="LINE"/>
                  <label htmlFor="LINE"
                    onClick={() => {
                      setQuestion("LINE");
                      setQuestionIsEtc(false);
                    }}
                  >
                    <span className="radio-button"></span>
                    <span className="radio-description">LINE</span>
                  </label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="question" id="Friend" value="Friend"/>
                  <label htmlFor="Friend"
                    onClick={() => {
                      setQuestion("Friend");
                      setQuestionIsEtc(false);
                    }}
                  >
                    <span className="radio-button"></span>
                    <span className="radio-description">Friend</span>
                  </label>
                </div>
              </div>
              <div className="input-radio-wrapper">
                <div className="input-radio others">
                  <input type="radio" name="question" id="Etc"/>
                  <label htmlFor="Etc"
                    onClick={() => {
                      setQuestion("Etc");
                      setQuestionIsEtc(true);
                    }}
                    >
                    <span className="radio-button"></span>
                    <span className="radio-description">Etc.</span>
                  </label>
                  <input type="text" 
                    className="radio-others" 
                    disabled={!questionIsEtc} 
                    style={{"display" : `${otherStyle(!questionIsEtc)}`}}
                    onChange={(event) => {
                      setQuestion(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Are you an undergraduate student?</label>
              <span className="input-text">
                (Required) 
              </span>
              <div className="input-radio-wrapper">
                <div className="input-radio">
                  <input type="radio" name="status" id="Yes" value="Yes"/>
                  <label htmlFor="Yes" 
                    onClick={() => {
                      setStatus(true);
                      resetStudentFields();
                    }}
                    >
                    <span className="radio-button"></span>
                    <span className="radio-description">Yes</span>
                  </label>
                </div>
                <div className="input-radio">
                  <input type="radio" name="status" id="No" value="No"/>
                  <label htmlFor="No" 
                    onClick={() => {
                      setStatus(false);
                      resetStudentFields();
                    }}
                    >
                    <span className="radio-button"></span>
                    <span className="radio-description">No</span>
                  </label>
                </div>
              </div>
            </div>

            {status === true ? undergraduateStudentFields() : null}
            {status === false ? nonUndergraduateStudentFields() : null}

            {/* <div className="flash-message" status={verdict.status}>
              {verdict.message}
            </div> */}
          </div>
          <div className="input-footer">
            <div className="input-group">
              <div className="input-text color-black">By submitting this form, you are <b className="color-primary-1">consenting</b> that the information will be under possession of BIST League 3.0’s committee</div>
            </div>
            <input type="submit" value={submitTextRef} className="button-primary-filled" disabled={requestRunning}/>
          </div>
        </form>
      </div>
      <div className="register-asset medium-only"/>
      <FlashMessageFixed
        flashMessageTime={flashMessageTime}
        setFlashMessageTime={setFlashMessageTime}
        verdict={verdict}
        setVerdict={setVerdict}
      />
    </div>
  )
}

export default RegisterScene;