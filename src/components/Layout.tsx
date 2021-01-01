import React from 'react'
// import Navbar from '~/components/ui/general/navbar/navbar.component'
import '~/styles/index.scss'
import Cart from './Cart'

const Layout = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      <footer className={'text-center'}>© Unikorns Gatsby Starter</footer>
      <Cart />
    </>
  )
}

export default Layout
