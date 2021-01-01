import { graphql } from 'gatsby'
import React from 'react'

import Layout from '~/components/Layout'
import ProductsSection from '~/components/ProductsSection'
import SEO from '~/components/SEO'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Unikorns Starter Kit" />
    <ProductsSection products={data.allShopifyProduct.edges} />
  </Layout>
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
          images {
            localFile {
              childImageSharp {
                fixed(width: 400) {
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
