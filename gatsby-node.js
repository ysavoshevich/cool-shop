const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allShopifyProduct {
        nodes {
          id
          handle
        }
      }
    }
  `)
  result.data.allShopifyProduct.nodes.forEach((node) => {
    createPage({
      path: `/product/${node.handle}`,
      component: path.resolve(`./src/templates/product.tsx`),
      context: {
        productId: node.id,
      },
    })
  })
}
