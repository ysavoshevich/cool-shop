import React from 'react'

import { ShopifyProvider } from './src/context/Shopify'

export const wrapRootElement = ({ element }) => (
  <ShopifyProvider>{element}</ShopifyProvider>
)
