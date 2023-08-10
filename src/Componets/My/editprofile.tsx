import React, {useEffect, useState} from 'react';
import {Api} from '../../types';
import config from '../../Config.json';
import './../../Css/my.css';
import CustomToast from '../defaulttoast';
import {Customizedinput1} from '../inputs';
import Qfetch from '../../Logic/Http_Ferch';
import {responseJson} from '../../Logic/ToolkitFerch';

function EditPorfile() {
  // eslint-disable-next-line prefer-const
  let UserStructure: Api.ApiMyUser = {
    Username: '',
    FirstName: '',
    LastName: '',
    Permissions: '',
    Email: '',
    ID: '',
    Image: '',
    Password: '',
    Banned: false,
  };
  const [userInfo, setuserInfo] = useState(UserStructure);
  useEffect(() => {
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.User[0].My}`)
        .then((e)=>responseJson(e)).then((e)=>{
          setuserInfo(e.Info);
        }).catch((err) => {
          CustomToast.errorDefaultToast(err);
        });
  }, []);


  const updateinfo= React.useCallback(()=>{
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.User[0].UpdateProfile}`, undefined,
        {method: 'PUT', body: JSON.stringify(UserStructure)})
        .then((response) => responseJson(response))
        .catch((err) => {
          CustomToast.errorDefaultToast(err);
        });
  }, []);

  return (
    <div className="d-flex justify-content-center row mb-4 pt-4 p-4">
      <div className="m-3">
        <h1>Edit my information</h1>
        <p>Set up account information, passwords, email, and more.</p>
        <p>edit the parameters you need</p>
      </div>
      <div>
        <Customizedinput1 name="First Name" text={userInfo.FirstName} values={ React.useCallback((e)=>{
          UserStructure.FirstName=e;
        }, [])}/>
        <Customizedinput1 name="Last Name" text={userInfo.LastName} values={ React.useCallback((e)=>{
          UserStructure.LastName=e;
        }, [])}/>
        <Customizedinput1 name="Username" text={userInfo.Username} values={ React.useCallback((e)=>{
          UserStructure.Username=e;
        }, [])}/>
        <Customizedinput1 name="Image" text={userInfo.Image}values={ React.useCallback((e)=>{
          UserStructure.Image=e;
        }, [])}/>
        <Customizedinput1 name="Password" text="" type='password' values={ React.useCallback((e)=>{
          UserStructure.Password=e;
        }, [])}/>
        <div className="w-100">
          <button type="button" className="w-100 p-3  btn btn-dark" onClick={updateinfo}>Save Changes</button>
        </div>
        <div className="card text-white bg-danger mb-3 mt-4">
          <div className="card-header">Danger zone</div>
          <div className="card-body">
            <h5 className="card-title">Delate Account</h5>
            <p>Are you sure that you want to delete your account? This will immediately log you out of your account and you will not be able to log in again.</p>
            <button type="button" className="btn btn-outline-warning">Danger zone</button>

          </div>
          <div className="card-body">
            <h5 className="card-title">Disable  Account</h5>
            <p>Are you sure that you want to disable your account? This will immediately log you out and make your account inaccessible to anyone.</p>
            <button type="button" className="btn btn-outline-warning">Disable Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPorfile;
