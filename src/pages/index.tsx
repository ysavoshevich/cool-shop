import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import React from 'react'

import Layout from '~/components/Layout'
import ProductsSection from '~/components/ProductsSection'
import SEO from '~/components/SEO'

const IndexPage = ({ data }) => (
  <>
    <SEO title="Unikorns Starter Kit" />
    <ProductsSection products={data.allShopifyProduct.edges} />
  </>
)

export const query = graphql`
  query index {
    allShopifyProduct {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            localFile {
              childImageSharp {
                fixed(width: 300) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`

export default IndexPage
