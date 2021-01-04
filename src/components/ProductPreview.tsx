import React, { ReactElement } from 'react'
import Image from 'gatsby-image'
import { Link } from 'gatsby'
import { Flex, Heading, Text } from '@chakra-ui/react'

export default function ProductPreview({ product }): ReactElement {
  return (
    <Link to={`/product/${product.node.handle}`}>
      <Flex
        flexDirection="column"
        justify="center"
        bg="white"
        p={45}
        h="400px"
        mx={30}
        borderRadius={10}
        _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s ease' }}
      >
        <Image
          fixed={product.node.images[0].localFile.childImageSharp.fixed}
          backgroundColor="transparent"
        />
        <Flex justify="space-between" mt={5}>
          <Heading size="md">{product.node.title}</Heading>
          <Text>
            {product.node.priceRange.minVariantPrice.amount}{' '}
            {product.node.priceRange.minVariantPrice.currencyCode}
          </Text>
        </Flex>
      </Flex>
    </Link>
  )
}
