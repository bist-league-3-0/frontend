import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FrontendRoutes from '../../routes/frontendRoutes';

const CompetitionScene = () => {
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
        if (prize < 20000000) {
          setPrize(prize + 400000);
        }

        if (prize >= 20000000) {
          clearInterval(timer)
          clearTimeout(timer)
        }        
      }, 10
    )
  }, [prize])

  return (
    <section className="competition-scene">
      <section className="competition-hero">
        <span className="competition-title">
          Competition
        </span>
        <NavLink to={FrontendRoutes.register} className="title-link button-primary-filled color-white">
          Registration
        </NavLink>
      </section>

      <section className="competition-prize">
        <span className="prize-title">
          Total Prize
        </span>
        <span className="prize-amount">
          {/* Rp20.000.000,- */}
          Rp{formatMoney(prize)},-
        </span>
      </section>

      <section className="competition-body">
        <div className="flex-grid-row">
          <div className="flex-col">

            <div className="competition-fee">
              <h1>Registration Fee</h1>
              <div className="competition-registration-fee">
                <div className="registration-description">
                  <span className="registration-title">Early Bird</span>
                  <span className="registration-date">July 27 &ndash; August 10, 2020</span>
                </div>
                <span className="registration-fee">Rp250.000,-</span>
              </div>
              <div className="competition-registration-fee">
                <div className="registration-description">
                  <span className="registration-title">Normal</span>
                  <span className="registration-date">August 11 &ndash; September 22, 2020</span>
                </div>
                <span className="registration-fee">Rp300.000,-</span>
              </div>
            </div>

            <div className="competition-requirement">
              <h1>Requirements</h1>
              <ul>
                <li>Each team must be registered on www.bistleague.com</li>
                <li>Each team consists of 2 &ndash; 3 members from same institution</li>
                <li>Each participant in a team must be an active full time undergraduate / diploma student from any major</li>
                <li>Participant may only be registered in one team</li>
              </ul>
              <a href="https://bit.ly/CompetitionGuidebook" className="button-primary-filled color-white" target="_blank" rel="noopener noreferrer">
                Download Guidebook
              </a>
            </div>

          </div>

          <div className="flex-col stretch">
            <h1>Timeline</h1>
            <div className="timeline-wrapper">
              <div className="timeline-content">
                <span className="content-title">
                  July 27 &mdash; September 22, 2020
                </span>
                <span className="content-date">
                  Registration Phase
                </span>
              </div>
              <div className="timeline-separator"/>
              <div className="timeline-content">
                <span className="content-title">
                  September 23 &mdash; October 9, 2020
                </span>
                <span className="content-date">
                  Preliminary Round
                </span>
              </div>
              <div className="timeline-separator"/>
              <div className="timeline-content">
                <span className="content-title">
                  October 21, 2020
                </span>
                <span className="content-date">
                  Finalist Announcement
                </span>
              </div>
              <div className="timeline-separator"/>
              <div className="timeline-content">
                <span className="content-title">
                  October 30 &mdash; November 1, 2020
                </span>
                <span className="content-date">
                  Main Event and Final Round (Online)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default CompetitionScene;