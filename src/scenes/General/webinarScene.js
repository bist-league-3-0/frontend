import React, { useState, useEffect } from 'react';
import Component from '../../components/components-common';
import SocialRoutes from '../../routes/socialRoutes';

const WebinarScene = ({width, height, version}) => {
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (version) {
      setActive(version);
    }
    
  }, [version])

  return (
    <section className="webinar-scene">
      <section className="webinar-hero">
        <span className="webinar-title">
          Webinar
        </span>
        <span className="webinar-subtitle">
          The online seminar consists of two sessions with several speakers
        </span>
      </section>
      <section className="webinar-content">
        <div className="flex-grid-row">
          <div className="flex-col">
            <h1>About This Webinar</h1>
            <p>
              The BIST League 3.0 webinars are seminars that will be held online and consist of two sessions and several speakers.
            </p>
            <p>
              The first seminar's topic is "Post-Pandemic Enterprise Infromation Security" while the second  seminar's topic is "Ethics in Big Data Using Customers' Data".
            </p>
          </div>

          <div className="flex-col stretch">
            <h1>Timeline</h1>
            <div className="timeline-wrapper">
              <div className="timeline-content">
                <span className="content-title">
                  September 27 &mdash; November 14, 2020
                </span>
                <span className="content-date">
                  Open Registration
                </span>
              </div>
              <div className="timeline-separator"/>
              <div className="timeline-content">
                <span className="content-title">
                  November 15, 2020 (Time: TBD)
                </span>
                <span className="content-date">
                  Webinar
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grid-row">
          <div className="flex-col stretch">
            <h1>Webinar Topics</h1>
            <div className="selector-group">
              <div className="selector-pill" isActive={(active === 1).toString()} onClick={e => setActive(1)}>1st Session</div>
              <div className="selector-pill" isActive={(active === 2).toString()} onClick={e => setActive(2)}>2nd Session</div>
            </div>
            {
              active === 2 
              ? <Component.Webinar2Component width={width} height={height}/>
              : <Component.Webinar1Component width={width} height={height}/>
            }
          </div>
        </div>
        
      </section>
    </section>
  );
}

export default WebinarScene;