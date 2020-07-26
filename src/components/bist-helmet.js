import React from 'react';
import { Helmet } from 'react-helmet';
import Asset from '../assets/assets-common';

const BISTHelmet = ({title}) => {
  const description = "Business-IT Case Competition is one of the BIST League 3.0's main events which is held by ASSISTS ITB in the form of an annual competition to test the participant problem solving skills when facing a business problem related to information technology";

  return (
    <Helmet>
      {/* <!-- Primary Meta Tags --> */}
      <title>{`${title}  | BIST League 3.0`}</title>
      <meta name="title" content={`${title}  | BIST League 3.0`}/>
      <meta name="description" content={description}/>

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://bistleague.com"/>
      <meta property="og:title" content={`${title}  | BIST League 3.0`}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={Asset.MetaLogo}/>

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:url" content="https://bistleague.com"/>
      <meta property="twitter:title" content={`${title}  | BIST League 3.0`}/>
      <meta property="twitter:description" content={description}/>
      <meta property="twitter:image" content={Asset.MetaLogo}/>
    </Helmet>
  )
}
export default BISTHelmet;
