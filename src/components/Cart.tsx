import React, { ReactElement } from 'react'
import { useShopify } from '~/context/Shopify'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react'

export default function Cart(): ReactElement {
  const { isCartOpen, closeCart, checkout } = useShopify()
  return (
    <>
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        onClose={closeCart}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader mb={10}>
              <Heading>Your Bag</Heading>
            </DrawerHeader>
            <DrawerBody>
              {checkout?.lineItems?.map((lineItem) => (
                <Flex key={lineItem.id} mb={10}>
                  <img
                    src={lineItem.variant.image.src}
                    style={{ maxWidth: '150px' }}
                  />
                  <Box ml={5}>
                    <Heading size="md">{lineItem.title}</Heading>
                    <Text>{lineItem.quantity}</Text>
                    <Text>{lineItem.price}</Text>
                  </Box>
                </Flex>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <Button w="full" h="80px">
                <Link
                  href={checkout?.webUrl}
                  h="full"
                  w="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  Checkout!
                </Link>
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
