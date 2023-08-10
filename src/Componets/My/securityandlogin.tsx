import React, {useEffect, useState} from 'react';
import {Api} from '../../types';
import config from '../../Config.json';
import './../../Css/my.css';
import CustomToast from '../defaulttoast';
import Qfetch from '../../Logic/Http_Ferch';
import {responseJson} from '../../Logic/ToolkitFerch';

function SecurityandLogin() {
  const InitInterface:Api.ipaddresList = {
    Session: [
      {
        Date: '',
        IpAddrs: '',
        UserAgent: '',
        Uuidtoken: '',
      },
    ],
  };
  const [Logins, setLogins] = useState<Api.ipaddresList>(InitInterface);
  useEffect(() => {
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.User[0].Sessions}`)
        .then((r) => responseJson(r))
        .then((ipaddres:Api.ipaddresList)=>{
          if (ipaddres.Session===null) {
            return;
          }
          setLogins(ipaddres);
        })
        .catch(() => {
          CustomToast.errorDefaultToast('failed http request');
        });
  }, [] );


  const delateUuidtoken=(UUID:string)=>{
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.User[0].DeleteSession}/${UUID}`)
        .then((response) => {
          if (response.status===200) {
            const NewInterface:Api.ipaddresList = {
              Session: Logins.Session.filter((item) => item.Uuidtoken !== UUID),
            };
            setLogins(NewInterface);
            CustomToast.okDefaultToast('Token removed');
          } else {
            CustomToast.errorDefaultToast('Failed request');
          }
        })
        .catch(() => {
          CustomToast.errorDefaultToast('Failed request');
        });
  };
  return (
    <div className="d-flex justify-content-center row w-100 p-3 ">
      <div className=" p-2">
        <h5><span className="material-icons">
shield
        </span> Security and login</h5>
        <div className=''>
          <div className='pt-2 pb-1'>
            <div>
              <h6>Sessions that were created in the last 90 days are listed below.</h6>
              {
                (Logins.Session).map((x, index) => {
                  return (<div className='m-1 p-1 fontsmall' key={index}>
                    <span className="material-icons">
computer
                    </span>
                    <p className='fontsmall'><strong>User agent:</strong>  {x.UserAgent}</p>
                    <p className='fontsmall'><strong>Ip address:</strong>  {x.IpAddrs}</p>
                    <p className='fontsmall'><strong>Date:</strong> {x.Date}</p>
                    <p className='fontsmall'><strong>Session id:</strong> {x.Uuidtoken}</p>
                    <button type="button" className="btn btn-outline-info" onClick={()=>delateUuidtoken(x.Uuidtoken)} >Remove session</button>
                  </div>);
                })
              }
            </div>
          </div>
          <div className='p-4'>
            <button type="button" className="btn btn-warning" title="Block UUID and generate a new one">Remove all devices</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityandLogin;
