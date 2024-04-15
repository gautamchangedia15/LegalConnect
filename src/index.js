import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginLSP from './components/LoginLSP';
import reportWebVitals from './reportWebVitals';
import BookAppointment from './components/BookAppointment';
import LawyerProfile from './components/LawyerProfile';
import LawyerDashboard from './components/LawyerDashboard'
import LawyerRegistrationForm from './components/LawyerRegistration';
import HomePage from './components/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* <LoginLSP/> */}
     {/* <LawyerProfile/> */}
     {/* <LawyerDashboard/> */}
     {/* <BookAppointment/> */}
     {/* <LawyerRegistrationForm/> */}
     <HomePage/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
