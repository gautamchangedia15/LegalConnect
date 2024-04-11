import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import NavigationBar from './components/NavigationBar/NavigationBar'
import { Footer } from './components/Footer/Footer'
import ServicePage from './components/ServicePage/ServicePage'
import LawyerProfile from './components/LawyerProfile/LawyerProfile'

export default function App() {
  return (
    <> 
    <NavigationBar/>
    {/* <Home/> */}
    <ServicePage/>
    <LawyerProfile/>
    <Footer/>
    </>
  )
}