import React from 'react'

import { AnimatePresence } from 'framer-motion'
import { ShopifyProvider } from './src/context/Shopify'

export const wrapPageElement = ({ element }) => (
  <ShopifyProvider>
    <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
  </ShopifyProvider>
)
