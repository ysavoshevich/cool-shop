import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useShopify } from '~/context/Shopify'

export default function Cart(): ReactElement {
  const { isCartOpen, closeCart } = useShopify()
  return (
    <>
      <Drawer isOpen={isCartOpen} placement="right" onClose={closeCart}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>.</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
