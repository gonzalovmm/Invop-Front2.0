import { useState } from 'react'
import {BrowserRouter as Router}  from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import  NavBar  from './components/NavBar/Navbar'
import  AppRoutes  from './routes/AppRoutes'


function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
      <NavBar/>
      <AppRoutes/>
    </Router>
    </>
  )
}

export default App
