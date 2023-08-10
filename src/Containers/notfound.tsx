import randEmoji from '../Logic/Gui';
import './../Css/Codes.css';
import React from 'react';

function NotFound() {
  return (
    <div style={{height: '100vh', paddingTop: '20%'}}>
      <div className="NotFound">
        <div className="d-flex justify-content-center">
          <img height="70" width="90" src="https://64.media.tumblr.com/2e8986a1b1c062623cea1b9edaddcc52/tumblr_mup3qzOPsX1rk0k2jo1_500.gif"></img>
        </div>
        <h3>404 Page not found</h3>
        <h4 className="text-center">{randEmoji()}</h4>
      </div>
    </div>
  );
}
export default NotFound;
