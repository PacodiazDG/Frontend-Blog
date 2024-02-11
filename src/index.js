import React from 'react';
import {createRoot} from 'react-dom/client';
import './Default.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap';


const root = createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
