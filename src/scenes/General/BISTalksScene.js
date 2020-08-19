import React, { useState, useEffect } from 'react';
import Component from '../../components/components-common';
import SocialRoutes from '../../routes/socialRoutes';

const BISTalksScene = ({width, height, version}) => {
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (version) {
      setActive(version);
    }
    
  }, [version])

  return (
    <section className="BISTalks-scene">
      <section className="BISTalks-hero">
        <span className="BISTalks-title">
          BISTalks
        </span>
        <span className="BISTalks-subtitle">
          Watch our scheduled talks live on <a href={SocialRoutes.instagram} target="_blank" rel="noopener noreferrer">instagram</a>!
        </span>
      </section>
      <section className="BISTalks-content">
        <div className="selector-group">
          <div className="selector-pill" isActive={(active === 1).toString()} onClick={e => setActive(1)}>BISTalk 1</div>
          <div className="selector-pill" isActive={(active === 2).toString()} onClick={e => setActive(2)}>BISTalk 2</div>
        </div>
        {
          active === 2 
          ? <Component.BISTalks2Component width={width} height={height}/>
          : <Component.BISTalks1Component width={width} height={height}/>
        }
      </section>
    </section>
  );
}

export default BISTalksScene;