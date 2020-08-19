import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialRoutes from '../../routes/socialRoutes';

const ChallengeScene = ({width, height}) => {
  const [prize, setPrize] = useState(0);

  const formatMoney = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    let timer = setTimeout(
      () => {
        if (prize < 750000) {
          setPrize(prize + 10000);
        }

        if (prize >= 750000) {
          clearInterval(timer)
          clearTimeout(timer)
        }        
      }, 10
    )
  }, [prize]);

  return (
    <section className="challenge-scene">
      <section className="challenge-hero">
        <span className="challenge-title">
          Hear Us Out Challenge
        </span>
      </section>

      <section className="challenge-prize">
        <span className="prize-title">
          Total Prize
        </span>
        <span className="prize-amount">
          IDR {formatMoney(prize)},-
        </span>
      </section>

      <section className="challenge-content">
        <div className="flex-grid-row">
          <div className="flex-col">

            <div className="challenge-fee">
              <h1>Registration Fee</h1>
              <div className="challenge-registration-fee">
                <div className="registration-description">
                  <span className="registration-title">Hear Us Out</span>
                  <span className="registration-date">August 14 &ndash; September 12, 2020</span>
                </div>
                <span className="registration-fee">FREE TO JOIN !</span>
              </div>
            </div>

            <div className="challenge-info">
              <h1>About This Challenge</h1>
              <p>
                Hear Us out challenge is an infographic competition that is intended for high school and university students with a total prize of IDR 750.000.- 
              </p>
              <p>
                Participants are requested to create an infographic based on the&nbsp;
                <a href="https://www.instagram.com/p/CD03eZjAWq5/" rel="noopener noreferrer" target="_blank">
                  video meeting 
                </a>
                &nbsp;content posted on the BIST League 3.0 Instagram.
              </p>
              <p>
                This event is free. You can submit your infographic from August 13th, 2020 until September 12th 2020.
              </p>
              <div className="button-group">
                <a href={SocialRoutes.challengePosterInfo} className="button-primary-filled color-white" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'google-drive']}/>&ensp;More Details
                </a>
                <a href={SocialRoutes.challengePosterSubmission} className="button-primary-filled color-white" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fas', 'file-upload']}/>&ensp;Submission
                </a>
              </div>
            </div>

            <div className="challenge-requirement">
              <h1>Guidelines</h1>
              <ol>
                <li>Infographic size must be in A4 with minimal 150 dpi and maximum file size of 10 MB</li>
                <li>Only high school students and undergraduate university students may participate. However, participants are not allowed to mention their institution in the infographic (ie. use its attributes)</li>
                <li>Participants are requested to create an infographic based on the video meeting content posted on the BIST League 3.0 Instagram</li>
                <li>The infographic may be created in teams, but the file should be submitted by one participant.</li>
                <li>Each team/participant may only submit one infographic</li>
                <li>Participants must include the BIST League logo on their infographic</li>
                <li>Participants must post the inforgaphic on Instagram</li>
                <li>The caption of the post must include the title and a description of the infographic, and the following hashtags: #BISTLeague3 #InformationSecurity #HearUsOutChallenge</li>
                <li>Participants must follow and tag the BIST League 3.0 official Instagram account (@bistleague). Participants must also tag 4 friends on the post.</li>
                <li>Participants must submit the infographic via this <a href={SocialRoutes.challengePosterSubmission} target="_blank" rel="noreferrer noopener">link</a>.</li>
                <li>The results are assessed by the committee's evaluation and the number of likes on the relevant Instagram post.</li>
                <li>This challenge is <b class="color-primary-1">FREE OF CHARGE.</b></li>
                <li>The submitted infographics may be used for purposes related to BIST League in the future, with credit given to the creator(s)</li>
              </ol>
            </div>

          </div>

          <div className="flex-col stretch">
            <h1>Timeline</h1>
            <div className="timeline-wrapper">
              <div className="timeline-content">
                <span className="content-title">
                  August 14 &mdash; September 12, 2020
                </span>
                <span className="content-date">
                  Submission Phase
                </span>
              </div>
              <div className="timeline-separator"/>
              <div className="timeline-content">
                <span className="content-title">
                  11.59 p.m. / 23.59 WIB (GMT+7), September 12, 2020
                </span>
                <span className="content-date">
                  Last Submission
                </span>
              </div>
              <div className="timeline-separator"/>
              <div className="timeline-content">
                <span className="content-title">
                  September 23, 2020
                </span>
                <span className="content-date">
                  Winner Announcement
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </section>
  );
}

export default ChallengeScene;