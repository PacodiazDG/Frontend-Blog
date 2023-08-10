import React, {useCallback, useContext, useState} from 'react';
import './../Css/Login.css';
import ReCAPTCHA from 'react-google-recaptcha';
import configData from '../Config.json';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import CustomToast from '../Componets/defaulttoast';
import {LoginInC} from '../Logic/Ahut';
import {responseJson} from '../Logic/ToolkitFerch';

function Login() {
  const [User, setUser] = useState('');
  const [Passowrd, setPassowrd] = useState('');
  const [Passwordview, setPasswordview] = useState('password');
  const history = useNavigate();
  const {setLogin} = useContext(LoginInC);
  const handleSubmit= React.useCallback(()=> {
    fetch(`${configData.ApiBackend}${configData.ApiRoutes.User[0].Login}`, {
      body: JSON.stringify({Password: Passowrd, Email: User}),
      method: 'POST',
    })
        .then((response) => responseJson(response))
        .then((data: any) => {
          localStorage.setItem('Token', data?.Token);
          setLogin(true);
          CustomToast.okDefaultToast('Welcome');
          history('/');
        })
        .catch((exception) => {
          CustomToast.errorDefaultToast(exception);
        });
  }, [User, Passowrd]);
  return (
    <div style={{height: 'auto'}} className="Login border rounded">
      <p className="text-center fs-1">root#</p>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="inputls">
            <span className='text-secondary'>
              Email
            </span>
            <input
              type="text"
              name="email"
              className="form-control bg-dark text-white"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="inputls">
            <span className='text-secondary'>
              Password
            </span>
            <div className='d-flex flex-row'>
              <input
                type={Passwordview}
                onChange={(e) => setPassowrd(e.target.value)}
                className="form-control bg-dark text-white"
              />
              <div className='p-2'>
                <span
                  role='button'
                  tabIndex={0}
                  onClick={useCallback(()=>{
                Passwordview==='text'? setPasswordview('password') : setPasswordview('text');
                  }, [Passwordview])}
                >
                  <span className=" material-icons">
                visibility
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <ReCAPTCHA
              sitekey="6LeWyGQUAAAAAPS57QwiTeP_eO-sSTK7ic1tIQBN"
              theme="dark"
              size="compact"
            />
            <div className="d-grid gap-2 buttonlogin">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
}
export default Login;
