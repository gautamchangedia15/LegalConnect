import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import NavigationBar from './components/NavigationBar/NavigationBar'
import { Footer } from './components/Footer/Footer'
import ServicePage from './components/ServicePage/ServicePage'
import LawyerProfile from './components/LawyerProfile/LawyerProfile'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function App() {
  return (
    <> 
    <Router>
    <NavigationBar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/service' element={<ServicePage/>} />
        <Route exact path='/lawyerProfile' element={<LawyerProfile/>} />
      </Routes>
    </Router>
    {/* <Home/> */}
    {/* <ServicePage/>
    <LawyerProfile/> */}
    <Footer/>
    </>
  )
}