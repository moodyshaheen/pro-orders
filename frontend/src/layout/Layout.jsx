import React from 'react'
import Navbar from '../common/navbar/Navbar'
import Footer from '../common/footer/Footer'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
    <>
    
    <Navbar/>
    <Outlet />
    <Footer/>
    
    </>
  )
}

export default Layout