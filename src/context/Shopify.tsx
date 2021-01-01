import React, { useState, createContext, useEffect, useContext } from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
  domain: 'test-store-yegor.myshopify.com',
})

export interface Props {
  checkout?: any
  isCartOpen?: boolean
  addProduct?: (id: string, quantity: number) => Promise<void>
  closeCart?: () => void
  openCart?: () => void
}

export const ShopifyContext = createContext<Props>({})

export const useShopify = () => {
  const { checkout, isCartOpen, addProduct, closeCart, openCart } = useContext(
    ShopifyContext
  )
  return { checkout, isCartOpen, addProduct, closeCart, openCart }
}

export const ShopifyProvider = ({ children }) => {
  const [checkout, setCheckout] = useState<any>({})
  const [isCartOpen, setIsCartOpen] = useState(false)
  useEffect(() => {
    console.log(process.env.GATSBY_SHOPIFY_ACCESS_TOKEN)
    if (localStorage.checkoutId) {
      fetchShopifyCheckout(localStorage.checkoutId)
    } else {
      createShopifyCheckout()
    }
  }, [])

  const createShopifyCheckout = async (): Promise<void> => {
    try {
      // Wrong types in @types/shopify-buy. For example there's no webUrl property in provided types. So we have to cast to "any" to avoid problems. I leave it like that to create an issue/make a PR later.
      const shopifyCheckout: any = await client.checkout.create()
      setCheckout(shopifyCheckout)

      // Set checkout ID to localStorage so that we can keep the info after the user comes back/refreshes the page
      localStorage.setItem('checkoutId', shopifyCheckout.id)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchShopifyCheckout = async (checkoutId: string): Promise<void> => {
    try {
      const shopifyCheckout: any = await client.checkout.fetch(checkoutId)
      setCheckout(shopifyCheckout)
    } catch (error) {
      console.log(error)
    }
  }

  const addProduct = async (id: string, quantity: number): Promise<void> => {
    try {
      const updatedCheckout = await client.checkout.addLineItems(checkout.id, [
        { variantId: id, quantity },
      ])
      setCheckout(updatedCheckout)
    } catch (error) {
      console.log(error)
    }
  }

  const openCart = (): void => {
    setIsCartOpen(true)
  }

  const closeCart = (): void => {
    setIsCartOpen(false)
  }
  return (
    <ShopifyContext.Provider
      value={{ addProduct, openCart, closeCart, isCartOpen }}
    >
      {children}
    </ShopifyContext.Provider>
  )
}
