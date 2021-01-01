import React from 'react'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

const ProductPage = ({ data: { shopifyProduct: product } }) => {
  return (
    <div>
      <div>
        <Img
          fluid={product.images[0].localFile.childImageSharp.fluid}
          style={{ maxWidth: '400px' }}
        />
        <h1>{product.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        <p>
          {product.priceRange.maxVariantPrice.amount},
          {product.priceRange.maxVariantPrice.currencyCode}
        </p>
        <button>Add to Cart</button>
      </div>
    </div>
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
    }
  }
`

export default ProductPage
