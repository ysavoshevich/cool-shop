import React from 'react'

import { ShopifyProvider } from './src/context/Shopify'
import Layout from '~/components/Layout'

export const wrapPageElement = ({ element, props }) => {
  return (
    <ShopifyProvider>
      <Layout {...props}>{element}</Layout>
    </ShopifyProvider>
  )
}
