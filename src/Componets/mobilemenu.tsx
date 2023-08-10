import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Css/Menu.css';
import {LoginInC} from '../Logic/Ahut';
import {ButtonMenuM} from './custombuttons';
import FullMenu from './fullmenu';


function MobileMenu() {
  const [Visible, setVisible] = useState<React.CSSProperties['visibility']>('visible');
  const [ShwoMenu, setShwoMenu] = useState(false);
  const user = useContext(LoginInC);
  let last: number;
  const navigate = useNavigate();

  const scroll=(ev: Event)=>{
    if (last<window.scrollY) {
      setVisible('hidden');
    } else {
      setVisible('visible');
    }
    last = window.scrollY;
  };
  useEffect(() => {
    window.addEventListener('scroll', scroll, false);
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, [user]);
  return (
    <div>
      {
        ShwoMenu?<FullMenu setShwoMenu={setShwoMenu} ShwoMenu={false} />:null
      }
      <div className='bg-dark' style={ {height: 'auto', width: '100%', visibility: Visible, position: 'fixed', bottom: 0}} >
        <div className="d-flex flex-row  ">
          <div className="p-2 w-100 text-center">
            <ButtonMenuM Icon={'home'} onClick={function(event: React.MouseEvent<HTMLDivElement, MouseEvent>):void {
              navigate('/');
            }}/>
          </div>
          <div className="p-2 w-100 text-center">
            <ButtonMenuM Icon={'share'} onClick={function(event: React.MouseEvent<HTMLDivElement, MouseEvent>):void {
              navigator.share({
                title: document.title,
                url: window.location.href,
              });
            }}/>
          </div>
          <div className="p-2 w-100 text-center">
            <ButtonMenuM Icon={'menu'} onClick={function(event: React.MouseEvent<HTMLDivElement, MouseEvent>):void {
              setShwoMenu(!ShwoMenu);
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
