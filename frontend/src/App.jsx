import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import NavigationBar from './components/NavigationBar/NavigationBar'
import { Footer } from './components/Footer/Footer'

export default function App() {
  return (
    <> 
    <NavigationBar/>
    <Home/>
    <Footer/>
    </>
  )
}