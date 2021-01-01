import React, { ReactElement } from 'react'
import Image from 'gatsby-image'
import { Link } from 'gatsby'
import { Text } from '@chakra-ui/react'

export default function ProductPreview({ product }): ReactElement {
  return (
    <Link to={`/product/${product.node.handle}`}>
      <Image fixed={product.node.images[0].localFile.childImageSharp.fixed} />
      <Text fontSize="xl">{product.node.handle}</Text>
    </Link>
  )
}
