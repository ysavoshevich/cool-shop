import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useShopify } from '~/context/Shopify'
import { graphql } from 'gatsby'

import GatsbyLink from 'gatsby-link'
import Layout from '../components/Layout'
import Img from 'gatsby-image'
import { Badge, Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const easing = [0.6, -0.05, 0.01, 0.99]

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

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
}

const MotionBox = motion.custom(Box)

const ProductPage = ({ data: { shopifyProduct: product } }) => {
  const [quantity, setQuantity] = useState(1)
  const { addProduct, isLoading } = useShopify()
  const toast = useToast()
  const addProductHandler = async () => {
    await addProduct(product.variants[0].id, quantity)
    toast({
      title: 'Product added.',
      description: 'Product has been added to your cart.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }
  const addHandler = () => {
    setQuantity((prevState) => prevState + 1)
  }
  const substractHandler = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1)
    }
  }
  return (
    // <motion.div initial="initial" animate="enter" exit="exit">
    <Flex>
      <Flex w="50vw" bg="#dfdfdf" h="100vh" justify="center" align="center">
        <MotionBox
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: 200, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Img
            fluid={product.images[0].localFile.childImageSharp.fluid}
            style={{ maxWidth: '400px', minWidth: '400px' }}
          />
        </MotionBox>
      </Flex>
      <Flex w="50vw" justify="center" align="center" flexDirection="column">
        <MotionBox variants={fadeInUp} w="500px">
          <MotionBox variants={fadeInUp}>
            <Button colorScheme="orange" mb={20}>
              <Link as={GatsbyLink} to="/">
                Go back
              </Link>
            </Button>
          </MotionBox>
          <Heading mb={8}>{product.title}</Heading>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          <Flex justify="space-between" align="center" mt={5} mb={10}>
            <Flex align="center">
              <Button
                colorScheme="red"
                borderRadius="30px"
                mr={4}
                onClick={substractHandler}
              >
                -
              </Button>
              <Text mr={4}>{quantity}</Text>
              <Button
                colorScheme="green"
                borderRadius="20px"
                onClick={addHandler}
              >
                +
              </Button>
            </Flex>
            <Box>
              <Badge colorScheme="purple" p={2}>
                {product.priceRange.maxVariantPrice.amount},
                {product.priceRange.maxVariantPrice.currencyCode}
              </Badge>
            </Box>
          </Flex>
          <Button
            onClick={addProductHandler}
            colorScheme="blue"
            isLoading={isLoading}
          >
            Add to Cart
          </Button>
        </MotionBox>
      </Flex>
    </Flex>
    // </motion.div>
  )
}

export const query = graphql`
  query productPage($productId: String!) {
    shopifyProduct(id: { eq: $productId }) {
      id
      title
      descriptionHtml
      images {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      options {
        name
        values
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants {
        id
      }
    }
  }
`

export default ProductPage
