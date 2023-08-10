import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {localStorageCheckAhut, LoginInC} from '../Logic/Ahut';
import configData from '../Config.json';
import Qfetch from '../Logic/Http_Ferch';
import {Api} from '../types';
import CustomToast from './defaulttoast';
import {NavLink} from 'react-router-dom';


export default function FullMenu(params: {
  setShwoMenu: Dispatch<SetStateAction<boolean>>,
  ShwoMenu: boolean
}) {
  const [Info, setInfo] = useState<Api.ApiMyUserJsonkey>();
  const user = useContext(LoginInC);

  useEffect(() => {
    if (localStorageCheckAhut()) {
      getUser();
    }
  }, [user]);

  const getUser = () => {
    Qfetch.ahutRqst(`${configData.ApiBackend}${configData.ApiRoutes.User[0].My}`)
        .then((data) => data.status === 200 ? data.json() : new Error('Invalid Token'))
        .then((data) => {
          setInfo(data);
        })
        .catch((e) => {
          CustomToast.errorDefaultToast(e);
          localStorage.removeItem('Token');
          return;
        });
  };


  return (
    <div className="d-flex flex-column bd-highlight bg-dark justify-content-center" style={{height: '100%', width: '100%', position: 'fixed', bottom: 0}}>
      <div className='align-self-center' style={{top: '50%'}}>
        <div className='m-3' onClick={() => {
          params.setShwoMenu(false);
        }}><a href="https://github.com/PacodiazDG" className='fs-1 text-reset'>GitHub</a></div>
        <div className='m-3' onClick={() => {
          params.setShwoMenu(false);
        }}><NavLink className="text-reset" to={'/BlogEngine'}>
            <p className='fs-1 text-reset'>Blog Engine</p>
          </NavLink>
        </div>
        {localStorageCheckAhut() && Info?.Info !== undefined ? (
          <div onClick={() => {
            params.setShwoMenu(false);
          }}>
            <NavLink className="text-reset" to={'/Drafts'}>
              <div className='m-3'><p className='fs-1 text-reset'>Drafts</p></div>
            </NavLink>
          </div>
        ) : null}
      </div>

    </div>
  );
}
