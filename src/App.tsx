import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/Menu.css';
import KRouter from './router';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <KRouter />
    </React.Fragment>
  );
}

export default App;
