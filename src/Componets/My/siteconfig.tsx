/* eslint-disable no-unused-vars */

import React from 'react';
import config from '../../Config.json';
import './../../Css/my.css';
import CustomToast from '../defaulttoast';
import Qfetch from '../../Logic/Http_Ferch';


function SiteConfig() {
  const UpdateCache=()=>{
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.Admin[0].UpdateCache}`)
        .then((response) => {
          if (response.status===200) {
            CustomToast.okDefaultToast('Cache updated');
            return;
          }
          CustomToast.warnDefaultToast('Cache update not available');
        })
        .catch(() => {
          CustomToast.errorDefaultToast('failed http request');
        });
  };
  return ( <div className="d-flex justify-content-center row w-100 p-3">
    <div className="  p-2">
      <h5><span className="material-icons">
settings
      </span>Admin Site</h5>
      <div className=''>
        <div className='pt-2 pb-1'>
          <div>
            <h6>Sessions that were created in the last 90 days are listed below.</h6>
          </div>
        </div>
        <div className='p-4'>
          <div className='p-2'>
            <h6>refresh  cache</h6>
            <p>If any modification was made and it has not been reflected, you can update the cache</p>
            <div>
              <button type="button" className="btn btn-outline-secondary" onClick={UpdateCache} >Refresh cache</button>
            </div>
          </div>
          <div className='p-2'>
            <h6>Cloudfare AntiDDos Module</h6>
            <p>If any modification was made and it has not been reflected, you can update the cache</p>
            <div>
              <button type="button" className="btn btn-outline-secondary">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

export default SiteConfig;
