import randEmoji from '../Logic/Gui';
import React from 'react';

function Code403() {
  return (
    <div style={{height: '100vh', paddingTop: '20%'}}>
      <div className="NotFound">
        <h3>403 Access denied</h3>
        <h4 className="text-center">{randEmoji()}</h4>
      </div>
    </div>
  );
}

export default Code403;
