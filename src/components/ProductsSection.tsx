import React, { ReactElement } from 'react'
import { useShopify } from '~/context/Shopify'
import { motion } from 'framer-motion'

import ProductPreview from './ProductPreview'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'

const easing = [0.6, -0.05, 0.01, 0.99]

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  exit: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const MotionBox = motion.custom(Box)

export default function ProductsSection({ products }): ReactElement {
  const { checkout, openCart } = useShopify()
  return (
    <MotionBox initial="initial" animate="animate" exit={'exit'}>
      <Flex
        h="100vh"
        w="100vw"
        justify="center"
        align="center"
        flexDirection="column"
      >
        <Text>Items in cart: {checkout?.lineItems?.length}. </Text>
        <Button colorScheme="blue" variant="solid" mb={20} onClick={openCart}>
          Open
        </Button>
        <MotionBox variants={stagger}>
          <Flex align="center">
            <Heading mr={10}>Select a product</Heading>
            {products.map((product) => (
              <MotionBox
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={product.node.handle}
              >
                <ProductPreview product={product} />
              </MotionBox>
            ))}
          </Flex>
        </MotionBox>
      </Flex>
    </MotionBox>
  )
}
