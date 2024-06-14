import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../Css/Menu.css';
import NvarLink from './nvarlink';
import configData from '../Config.json';
import {localStorageCheckAhut, LoginInC} from '../Logic/Ahut';
import {Api} from '../types';
import CustomToast from './defaulttoast';
import {useNavigate} from 'react-router-dom';
import Qfetch from '../Logic/Http_Ferch';
import isMobile from 'is-mobile';
import MenuList from './menulist';
import {githubProfile, linkedinProfile, youtubeProfile} from '../constant';

function MenuTop() {
  return (
    <div className="bg-dark mr-4">
      <div
        className="d-flex justify-content-end ml-4 p-1"
        style={{right: '-50px'}}
      >
        <div>
          <a href={linkedinProfile} rel="noindex, nofollow" className="pe-4 link-light" >
            {' '}
            LinkedIn
          </a>
        </div>
        <div>
          <a href={youtubeProfile} rel="noindex, nofollow" className="pe-4 link-light">
          Youtube
          </a>
        </div>
        <div>
          <a href={githubProfile} className="pe-4 link-light">
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

function Menu() {
  const history = useNavigate();
  const [Info, setInfo] = useState<Api.ApiMyUserJsonkey>();
  const user = useContext(LoginInC);

  useEffect(() => {
    if (localStorageCheckAhut()) {
      getUser();
    }
  }, [user]);

  const getUser = () => {
    Qfetch.ahutRqst(
        `${configData.ApiBackend}${configData.ApiRoutes.User[0].My}`,
    )
        .then((data) =>
        data.status === 200 ? data.json() : new Error('Invalid Token'),
        )
        .then((data) => {
          setInfo(data);
        })
        .catch((e) => {
          CustomToast.errorDefaultToast(e);
          localStorage.removeItem('Token');
          return;
        });
  };
  const [ItemMenu, setItemMenu] = useState(false);
  const handlebuttonSearch = React.useCallback(() => history('/Search?q='), []);
  const handlebuttonMy = React.useCallback(() => {
    document.body.style.overflow = 'hidden';
    setItemMenu(!ItemMenu);
  }, [ItemMenu]);

  return (
    <div>
      <MenuTop />
      <nav className=" navbar navbar-expand-lg navbar-light Menu  ">
        <div className="container-fluid MenuPadding">
          <div className="mt-2 ">
            <Link to="/">
              <p
                className="  TitleMenu text-white text-nowrap"
                style={{fontFamily: 'Press Start 2P, cursive;'}}
              >
                {configData.NameSite}
              </p>
              <p className="text-nowrap text-decoration-none text-white" style={{fontSize: '14px'}}>Dev // Notes // Code</p>
            </Link>
          </div>
          <div className="w-100 me-4" id="navbarNav">
            <div className="d-flex mt-2 justify-content-end  align-items-center">
              {isMobile() ? (
                <div className=" h-100 align-items-center">
                  <span
                    className="material-symbols-outlined"
                    onClick={handlebuttonSearch}
                  >
                    search
                  </span>
                </div>
              ) : (
                <>
                  <NvarLink Title="Home" Url="/"></NvarLink>
                  <NvarLink Title="Blog Engine" Url="/BlogEngine"></NvarLink>
                  {localStorageCheckAhut() && Info?.Info !== undefined ? (
                    <NvarLink Title="Drafts" Url="/Drafts"></NvarLink>
                  ) : null}
                  <NvarLink Title="Project Repository" Url="https://github.com/PacodiazDG/Backend-blog"></NvarLink>
                  <span
                    className=" material-symbols-outlined"
                    onClick={handlebuttonSearch}
                  >
                    search
                  </span>
                </>
              )}
              <div>
                {localStorageCheckAhut() && Info?.Info !== undefined ? (
                  <button
                    className="btn btn-link "
                    style={{width: '60px'}}
                    onClick={handlebuttonMy}
                  >
                    <img
                      className="rounded-circle"
                      src={Info?.Info.Image}
                      style={{height: '80%', width: '100%'}}
                      alt={Info?.Info.Username}
                      loading="lazy"
                    ></img>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {localStorageCheckAhut() && Info?.Info !== undefined && ItemMenu ? (
        <MenuList User={Info} callback={setItemMenu} currentContex={ItemMenu} ></MenuList>
      ) : null}
    </div>
  );
}

export default Menu;
