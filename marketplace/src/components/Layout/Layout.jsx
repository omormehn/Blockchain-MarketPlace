import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import CartTab from '../Cart/CartTab'

const Layout = () => {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
      <CartTab />
      <Footer/>
    </>
  );
}

export default Layout