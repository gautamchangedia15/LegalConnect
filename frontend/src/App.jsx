import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home/Home";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Footer } from "./components/Footer/Footer";
import ServicePage from "./components/ServicePage/ServicePage";
import LawyerProfile from "./components/LawyerProfile/LawyerProfile";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


import ClientLogin from './components/Authentication/Client/Login/ClientLogin'
import ClientRegistration from './components/Authentication/Client/Register/ClientRegistration'
import LawyerRegister from "./components/Authentication/Lawyer/Register/LawyerRegister";
import AdditionalDetailsPage from "./components/Authentication/Lawyer/Register/AdditionalDetailsPage";
import LawyerLogin from "./components/Authentication/Lawyer/Login/LawyerLogin";
import AppointmentBooking from "./components/AppointmentBooking/AppointmentBooking";


export default function App() {
  return (
    <>
     
    <Router>
    <NavigationBar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/service' element={<ServicePage/>} />
        <Route exact path='/service/providerprofile/:id' element={<LawyerProfile/>} />
        {/* Authentication */}
        {/* Client */}
        <Route exact path='/clientLogin' element={<ClientLogin/>} />
        <Route exact path='/clientRegistration' element={<ClientRegistration/>} />
        {/* Lawyer */}
        <Route exact path='/additional-details' element={<AdditionalDetailsPage/>} />
        <Route exact path="/lawyerLogin" element={<LawyerLogin/>}/>
        <Route exact path ='/lawyer' element={<LawyerRegister/>}/>
        {/* Booking */}
        <Route exact path="/service/providerprofile/appointment/:id" element= {<AppointmentBooking/>}/>
        
      </Routes>
      {/* <LawyerRegister/> */}
    </Router>
    {/* <AppointmentBooking/> */}

      <Footer />
    </>
  );
}
