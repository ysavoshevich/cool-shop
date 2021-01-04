import React, { useState, createContext, useEffect, useContext } from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
  domain: process.env.GATSBY_SHOPIFY_DOMAIN,
})

export interface Props {
  checkout?: any
  isCartOpen?: boolean
  addProduct?: (id: string, quantity: number) => Promise<void>
  closeCart?: () => void
  openCart?: () => void
  isLoading?: boolean
}

export const ShopifyContext = createContext<Props>({})

export const useShopify = () => {
  const {
    checkout,
    isCartOpen,
    addProduct,
    closeCart,
    openCart,
    isLoading,
  } = useContext(ShopifyContext)
  return { checkout, isCartOpen, addProduct, closeCart, openCart, isLoading }
}

export const ShopifyProvider = ({ children }) => {
  const [checkout, setCheckout] = useState<any>({})
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (localStorage.checkoutId) {
      fetchShopifyCheckout(localStorage.checkoutId)
    } else {
      createShopifyCheckout()
    }
  }, [])

  const createShopifyCheckout = async (): Promise<void> => {
    try {
      setIsLoading(true)
      // Wrong types in @types/shopify-buy. For example there's no webUrl property in provided types. So we have to cast to "any" to avoid problems.
      // TODO. Create an issue / make a PR
      const shopifyCheckout: any = await client.checkout.create()
      setCheckout(shopifyCheckout)

      // Set checkout ID to localStorage so that we can keep the info after the user comes back/refreshes the page
      localStorage.setItem('checkoutId', shopifyCheckout.id)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const fetchShopifyCheckout = async (checkoutId: string): Promise<void> => {
    try {
      setIsLoading(true)
      const shopifyCheckout: any = await client.checkout.fetch(checkoutId)
      setCheckout(shopifyCheckout)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const addProduct = async (id: string, quantity: number): Promise<void> => {
    try {
      setIsLoading(true)
      // For some reason the ids you get with sourcing plugin for shopify look something like this "Shopify__ProductVariant__Z2lkOi8vc2dfghGlmeS9QcmdfgdWN0VmFyaWFdfgfdgC8zNzg5MDg0NTQ3NDk5NQ==
      // But only the last part is valid, that's why we use split
      const updatedCheckout = await client.checkout.addLineItems(checkout.id, [
        { variantId: id.split('__')[2], quantity },
      ])
      setCheckout(updatedCheckout)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
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
      value={{
        addProduct,
        openCart,
        closeCart,
        isCartOpen,
        checkout,
        isLoading,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  )
}
