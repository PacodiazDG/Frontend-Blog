import React, {lazy, Suspense, useState} from 'react';
import './../Css/my.css';
import {MenuSlidePanelButton} from '../Componets/custombuttons';
import MyProfile from '../Componets/My/myprofile';
const EditPorfile = lazy(() => (import('../Componets/My/editprofile')));
const SecurityandLogin =lazy(() =>import('../Componets/My/securityandlogin'));
const SiteConfig=lazy(() => (import('../Componets/My/siteconfig')));
const DumpUsers= lazy(() => (import('../Componets/My/adminusers')));


function My() {
  const [Comonent, setComonent] = useState(<MyProfile></MyProfile>);
  const MenuTextVisible = (true);
  const setMenu=()=>{
    setMenud({visibility: 'hidden'});
  };
  const [Menu, setMenud] = useState<React.CSSProperties>({visibility: 'hidden'});
  let control =true;

  const handleShowOrHide = React.useCallback(()=> {
    if (control) {
      setMenud({visibility: 'visible'});
    } else {
      setMenud({visibility: 'hidden'});
    }
    control=!control;
  }, [Comonent]);
  const handleSetComonentStart = React.useCallback(()=> {
    setComonent(<MyProfile></MyProfile>);
    setMenu();
  }, [Comonent]);
  const handleSetComonentAdminUsers = React.useCallback(()=> {
    setComonent(<DumpUsers></DumpUsers>);
    setMenu();
  }, [Comonent]);
  const handleSetComonentSite = React.useCallback(()=> {
    setComonent(<SiteConfig></SiteConfig>);
    setMenu();
  }, [Comonent]);
  const handleSetComonentSetAccount = React.useCallback(()=> {
    setComonent(<EditPorfile></EditPorfile>);
    setMenu();
  }, [Comonent]);
  const handleSetComonentSecurity = React.useCallback(()=> {
    setComonent(<SecurityandLogin></SecurityandLogin>);
    setMenu();
  }, [Comonent]);

  return (
    <div className="">
      <div>
        <div className='pt-4' >
          <span
            className=" material-symbols-outlined  p-2 m-2 md-48  text-white  material-symbols-outlined "
            style={{fontSize: '1.5rem', width: '5em'}}
            onClick={handleShowOrHide}
            role='button'
          >
                reorder
          </span>
        </div>
        <div className="width90 mb-5 p-2 MarginleftPanel  ">
          <div className="d-flex justify-content-center  mb-4 pt-4">
            <Suspense fallback={<p>Loading...</p>}>
              {Comonent}
            </Suspense>
          </div>
        </div>
      </div>
      <div
        style={{...{position: 'fixed', height: '100vh', width: '100%', opacity: '0.9', background: '#000000', overflowY: 'hidden', top: 0}, ...Menu}}
        onClick={handleShowOrHide} className="pe-auto"></div>
      <div className="Menuslide" style={Menu}>
        <div className='pt-4'>

          <span
            className="p-2 m-2 md-48   material-symbols-outlined text-white"
            style={{fontSize: '1.5rem', width: '4em'}}
            onClick={handleShowOrHide}
          >
reorder
          </span>

        </div>
        <div className="MenuslideTopPadding">
          <div className=" row">
            <div className="col-sm" >
              <div>
                <div>
                </div>
                <MenuSlidePanelButton
                  Icon="home"
                  Text="Start"
                  onClick={handleSetComonentStart}
                  TextVisible={MenuTextVisible}
                />
                <MenuSlidePanelButton
                  Icon="perm_identity"
                  Text="Admin users"
                  onClick={handleSetComonentAdminUsers}
                  TextVisible={MenuTextVisible}
                />
                <MenuSlidePanelButton
                  Icon="miscellaneous_services"
                  Text="Site Admin"
                  onClick={handleSetComonentSite}
                  TextVisible={MenuTextVisible}
                />
                <MenuSlidePanelButton
                  Icon="perm_identity"
                  Text="Set up my account  "
                  onClick={handleSetComonentSetAccount}
                  TextVisible={MenuTextVisible}
                />
                <MenuSlidePanelButton
                  Icon="lock"
                  Text="Security and login"
                  onClick={handleSetComonentSecurity}
                  TextVisible={MenuTextVisible}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default My;
