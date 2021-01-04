import React from 'react'
import Cart from './Cart'
import { AnimatePresence } from 'framer-motion'
import '~/styles/index.scss'

const Layout = ({ children, ...props }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <div key={props?.location?.pathname}>{children}</div>
      <Cart />
    </AnimatePresence>
  )
}

export default Layout
