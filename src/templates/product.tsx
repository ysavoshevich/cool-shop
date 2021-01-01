import React from 'react'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { useShopify } from '~/context/Shopify'

const ProductPage = ({ data: { shopifyProduct: product } }) => {
  const { addProduct } = useShopify()
  const addProductHandler = () => {
    addProduct(product.variants[0].id, 1)
  }
  return (
    <Layout>
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
        <button onClick={addProductHandler}>Add to Cart</button>
      </div>
    </Layout>
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
