import React from 'react';
import IconsToolKit from './IconsToolKit';
import {Api} from '../types';
import {useNavigate} from 'react-router-dom';
import config from '../Config.json';
import Qfetch from '../Logic/Http_Ferch';
import CustomToast from './defaulttoast';

function Item(info:{
  Text: string;
  Icon: string;
  callBack:() => void;
}) {
  return (
    <div onClick={info.callBack}>
      <div className=" joinBtn d-flex justify-content-start  align-items-center" role={'button'}>
        <div className=' pl-4' style={{fontSize: '5px'}}>
          <IconsToolKit Name={info.Icon} Description="person" Id={null} />
        </div>
        <div className='ml-4' style={{ }}>
          <p className='m-2 '>{info.Text}</p>
        </div>
      </div>
    </div>);
}

function MenuList({User, callback, currentContex}:{User:Api.ApiMyUserJsonkey, callback: React.Dispatch<React.SetStateAction<boolean>>,
  currentContex:boolean}) {
  const history = useNavigate();
  return (
    <div>
      <div
        style={{...{position: 'fixed', height: '100vh', width: '100%', opacity: '0.9', background: 'rgba(0, 0, 0, 0)', overflowY: 'hidden', top: 0}}}
        onClick={()=>{
          document.body.style.overflow = 'visible';
          callback(!currentContex);
        }} className="pe-auto"></div>
      <div style={{zIndex: '999', position: 'relative'}}>
        <div className='position-fixed bg-dark rounded' style={{right: '1%'}}>
          <div className='p-2' >
            <div className="d-flex flex-row align-items-center">
              <div className="p-2">
                <img className='rounded-circle' src={User.Info.Image} style={{width: '40px'}}></img></div>
              <div className="p-2"><p>{User.Info.Username}</p></div>
            </div>
          </div>
          <div className="p-3">
            <div className="d-flex flex-column">
              <div className="pt-1 fs-6">
                <Item Text={'Profile'} Icon={'person'} callBack={()=>{
                  history('/my');
                }}/>
              </div>
              <div className="pt-1">
                <Item Text={'Stories'} Icon={'auto_stories'} callBack={()=>{
                  history('/my');
                }}/>

              </div>
              <div className="pt-1">
                <Item Text={'Stats'} Icon={'trending_up'} callBack={()=>{}}/>
              </div>
              <div className="pt-1">
                <Item Text={'Settings'} Icon={'settings'} callBack={()=>{}}/>
              </div>
              <div className="pt-1">
                <Item Text={'Sing out'} Icon={'logout'} callBack={()=>{
                  Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.User[0].SignOut}`).then((e)=>{
                    if (e.status===200) {
                      CustomToast.okDefaultToast('Session successfully closed');
                      localStorage.removeItem('Token');
                      history('/');
                    } else {
                      CustomToast.warnDefaultToast('An error occurred while trying to close the session try again');
                    }
                  }).catch((e)=>
                    CustomToast.errorDefaultToast(e),
                  );
                }}/>
              </div>
              <div className="pt-1">
                <Item Text={'Manage publications'} Icon={''} callBack={()=>{}}/>
              </div>
              <div className="pt-1">
                <Item Text={'Refine recommendations'} Icon={''} callBack={()=>{}}/>
              </div>
            </div>
            <hr/>
            <div>
              <p className='text-info'>{User.Info.Email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuList;
