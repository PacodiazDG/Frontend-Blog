import {CardRender} from '../cards';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import config from '../../Config.json';
import {Api} from '../../types';
import {Navigate} from 'react-router-dom';
import CustomToast from '../defaulttoast';
import Qfetch from '../../Logic/Http_Ferch';
import {responseJson} from '../../Logic/ToolkitFerch';

function MyProfile() {
  const intvales: Api.ApiMyUser = {
    Username: '',
    FirstName: '',
    LastName: '',
    Permissions: '',
    Email: '',
    ID: '',
    Password: '',
    Banned: false,
    Image:
        'http://31.media.tumblr.com/2e8986a1b1c062623cea1b9edaddcc52/tumblr_mup3qzOPsX1rk0k2jo1_500.gif',
  };

  let NextNumber=0;
  const [Vales, setVales] = useState<Api.ApiMyUserJsonkey>({
    Info: intvales,
  });
  const history=useNavigate();
  const [LastPost, setLastPost] = useState<Api.FeedArray>({'Post': []});
  const myPost = () => {
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.Blog[0].GetMyPost}?next=${NextNumber}`)
        .then((r) =>responseJson(r))
        .then((res: Api.FeedArray) => {
          if (res.Post!=null) {
            setLastPost((prevState) => ({...prevState, Post: res.Post}));
            NextNumber=(NextNumber + 1);
          }
        });
  };
  const singout =()=>{
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
  };
  useEffect(() => {
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.User[0].My}`)
        .then((res) =>responseJson(res))
        .then((res: Api.ApiMyUserJsonkey) => {
          setVales(res);
        }).catch(()=>{
          CustomToast.errorDefaultToast('Failed Request');
          <Navigate to="/login" />;
          return;
        });
    myPost();
  }, []);
  return (
    <div className=''>
      <div className='container  text-center w-50'>
        <div className='row justify-content-md-center'>
          <div className="m-3 rounded-circle">
            <img
              className="align-items-center "
              src={Vales.Info.Image}
              style={{borderRadius: '50%'}}
              alt="Profile"
            ></img>
          </div>
        </div>
        <div className='row '>
          <p className="col font-weight-bold h3">
              Hi, {Vales.Info.FirstName}
          </p>
        </div>

        <div className="row ">
          <div className="col flex-nowrap">
            <p className=' badge bg-light text-dark'>Username</p></div>
          <div className="col">{Vales.Info.Username}</div>
        </div>
        <div className='row'>
          <div className="col">
            <p className='badge bg-light text-dark'>Email address</p>
          </div>
          <div className="col ">
            <p style={{whiteSpace: 'nowrap'}}>{Vales.Info.Email}</p></div>
        </div>


        <button type="button" className="btn btn-link" onClick={React.useCallback(() => singout(), [])}>
            Sing out
        </button>
      </div>
      <hr />
      <h5>Your last posts:</h5>
      <div className="ml-4">
        {LastPost?.Post !== undefined ?
          LastPost.Post.map((number, key) => (
            <CardRender.Card1
              key={key}
              Title={number.Title}
              id={number.ID}
              Date={''}
              Imagen={number.Imagen}
              Content={number.Description} />
          )) :
          null}
        <div className="d-flex justify-content-center row pb-4 mt-4">
          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={React.useCallback(() => {
              myPost();
            }, [])}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


export default MyProfile;
